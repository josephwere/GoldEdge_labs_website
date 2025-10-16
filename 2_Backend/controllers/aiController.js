const fetch = require('node-fetch');
const Redis = require('ioredis');
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;
const SHORT_KEY_PREFIX = 'convo:';

function getSessionId(req) {
  return req.headers['x-session-id'] || req.body.sessionId || ('anon-' + (req.ip || 'unknown'));
}

async function getHistory(sessionId) {
  if (redis) {
    const raw = await redis.lrange(SHORT_KEY_PREFIX + sessionId, 0, -1);
    return raw.map(r => JSON.parse(r));
  } else {
    // fallback: in-memory store attached to module
    module.convoStore = module.convoStore || {};
    return module.convoStore[sessionId] || [];
  }
}

async function pushMessage(sessionId, msgObj) {
  if (redis) {
    await redis.rpush(SHORT_KEY_PREFIX + sessionId, JSON.stringify(msgObj));
    // keep last 12
    await redis.ltrim(SHORT_KEY_PREFIX + sessionId, -12, -1);
  } else {
    module.convoStore = module.convoStore || {};
    module.convoStore[sessionId] = module.convoStore[sessionId] || [];
    module.convoStore[sessionId].push(msgObj);
    if (module.convoStore[sessionId].length > 12) module.convoStore[sessionId].splice(0, module.convoStore[sessionId].length - 12);
  }
}

function packPrompt(history, message, mode) {
  const modeHint = mode === 'creative' ? 'Respond in a creative, warm tone.' :
                   mode === 'techie' ? 'Respond in a technical, developer-friendly tone (you can include code).' :
                   mode === 'visionary' ? 'Respond in a visionary and philosophical tone.' :
                   'Respond concisely and professionally.';
  const last = history.slice(-6).map(h => `${h.role === 'user' ? 'User' : 'AI'}: ${h.text}`).join('\n');
  return `${modeHint}\n\n${last}\nUser: ${message}\nAI:`;
}

exports.handleAIChat = async (req, res) => {
  const { message, mode } = req.body || {};
  if (!message) return res.status(400).json({ error: 'No message provided' });
  const sessionId = getSessionId(req);
  try {
    const history = await getHistory(sessionId);
    await pushMessage(sessionId, { role: 'user', text: message, ts: Date.now() });
    const prompt = packPrompt(history, message, mode || 'professional');
    const payload = { prompt, max_tokens: 800 };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000); // 20s timeout

    const resp = await fetch('https://api.neuroedge.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEUROEDGE_API_KEY}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);
    const data = await resp.json();
    const reply = data.reply || (data.choices && data.choices[0] && data.choices[0].text) || data.data || 'No response from NeuroEdge';
    await pushMessage(sessionId, { role: 'ai', text: reply, ts: Date.now() });
    res.json({ reply, sessionId });
  } catch (err) {
    console.error('AI error', err && err.message ? err.message : err);
    res.status(502).json({ error: 'AI service unavailable', message: 'NeuroEdge is calibrating. Try again shortly.' });
  }
};
