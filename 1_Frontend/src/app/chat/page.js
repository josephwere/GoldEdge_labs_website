'use client';
import { useState } from 'react';
export default function Chat(){
  const [msgs, setMsgs] = useState([{from:'bot',text:'Welcome to GoldEdge AI chat demo.'}]);
  const [v, setV] = useState('');
  async function send(e){ e?.preventDefault(); if(!v.trim()) return; const userText = v; setMsgs(m=>[...m,{from:'user',text:userText}]); setV(''); try{ const res = await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({message:userText})}); const json = await res.json().catch(()=>({reply:'(no backend)'})); setMsgs(m=>[...m,{from:'bot',text:json.reply||json.message||'(no backend)'}]); }catch(err){ setMsgs(m=>[...m,{from:'bot',text:'(error) backend unreachable'}]) } }
  return (
    <div className='max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-3' style={{color:'#D4AF37'}}>AI Chat</h2>
      <div className='p-3 h-64 overflow-auto card rounded-md flex flex-col gap-2'>
        {msgs.map((m,i)=>(<div key={i} className={m.from==='bot'?'text-sm text-gray-300':'text-sm text-black bg-yellow-400 p-2 rounded self-end'}>{m.text}</div>))}
      </div>
      <form onSubmit={send} className='mt-3 flex gap-2'>
        <input value={v} onChange={e=>setV(e.target.value)} placeholder='Say something...' className='flex-1 p-2 rounded bg-transparent border border-gray-700'/>
        <button className='px-3 py-2 rounded bg-yellow-500 text-black'>Send</button>
      </form>
    </div>
  );
}
