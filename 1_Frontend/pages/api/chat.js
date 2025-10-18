export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message } = req.body || {};
  const backend = process.env.NEXT_PUBLIC_API_URL || 'https://goldedge-backend.onrender.com';
  try{
    const backendRes = await fetch(`${backend.replace(/\/$/,'')}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const json = await backendRes.json().catch(()=>null);
    if(backendRes.ok && json) return res.status(200).json({ reply: json.reply || json.message || json });
    // fallback echo if backend not reachable or returns non-json
    return res.status(200).json({ reply: `(echo) ${message || ''}` });
  }catch(e){
    return res.status(200).json({ reply: `(echo) ${message || ''}` });
  }
}
