import React, { useState, useEffect, useRef } from 'react';

const defaultMode = localStorage.getItem('neuroedge_mode') || 'professional';

export default function AIChatWidget() {
  const [mode, setMode] = useState(defaultMode);
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem('neuroedge_history') || '[]'); } catch(e){ return []; }
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [sessionId, setSessionId] = useState(() => localStorage.getItem('neuroedge_session') || '');
  const containerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('neuroedge_history', JSON.stringify(messages.slice(-20)));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('neuroedge_mode', mode);
  }, [mode]);

  useEffect(() => {
    if (!sessionId) {
      const sid = 'sess-' + Math.random().toString(36).substr(2,9);
      setSessionId(sid);
      localStorage.setItem('neuroedge_session', sid);
    }
  }, [sessionId]);

  useEffect(() => {
    // scroll to bottom when messages change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, mode, sessionId })
      });
      if (!resp.ok) {
        const err = await resp.json().catch(()=>({message:'error'}));
        setMessages(prev => [...prev, { role: 'ai', text: err.message || 'NeuroEdge is calibrating. Try again shortly.' }]);
      } else {
        const data = await resp.json();
        setMessages(prev => [...prev, { role: 'ai', text: data.reply || data.message || 'No reply' }]);
        // unlock "Explorer" badge locally by calling rewards unlock
        try {
          const userId = localStorage.getItem('goldedge_user_id');
          if (userId) {
            fetch(`${process.env.REACT_APP_API_URL || ''}/api/rewards/unlock`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, key: 'explorer_ai', title: 'Explorer', type: 'badge', meta: { reason: 'First AI interaction' } })
            }).catch(()=>{});
          }
        } catch(e){}
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Network error. Check your connection.' }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">NeuroEdge Chat</h3>
        <select value={mode} onChange={(e)=>setMode(e.target.value)} className="bg-transparent text-sm">
          <option value="professional">Professional</option>
          <option value="creative">Creative</option>
          <option value="techie">Techie</option>
        </select>
      </div>
      <div ref={containerRef} className="h-64 overflow-y-auto p-2 space-y-2 rounded-md bg-black/30">
        {messages.map((m, idx) => (
          <div key={idx} className={`p-2 rounded-md ${m.role==='user'?'self-end bg-white/10':'bg-white/5'}`}>
            <div className="text-sm whitespace-pre-wrap">{m.text}</div>
          </div>
        ))}
        {typing && <div className="p-2"><TypingIndicator /></div>}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ sendMessage(); } }} className="flex-1 p-2 rounded-md bg-black/20" placeholder="Ask NeuroEdge something..." />
        <button onClick={sendMessage} className="px-4 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold">Send</button>
      </div>
    </div>
  );
}

function TypingIndicator(){ 
  return (<div className="flex items-center space-x-1"><Dot/><Dot delay={150}/><Dot delay={300}/></div>);
}
function Dot({delay=0}){
  return (<span className="inline-block w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay: `${delay}ms`}}></span>);
}
