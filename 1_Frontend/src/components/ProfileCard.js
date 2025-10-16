import React, { useEffect, useState } from 'react';

export default function ProfileCard({ userId, name, description }) {
  const [badges, setBadges] = useState([]);

  useEffect(()=>{
    if (!userId) return;
    fetch(`${process.env.REACT_APP_API_URL || ''}/api/rewards/${userId}`).then(r=>r.json()).then(data=>{
      if (data && data.rewards) setBadges(data.rewards);
    }).catch(()=>{});
  }, [userId]);

  return (
    <div className="p-4 bg-white/5 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
      <div className="mt-3">
        <h5 className="text-sm uppercase">Achievements</h5>
        <div className="flex gap-2 mt-2">
          {badges.length===0 && <div className="text-sm text-gray-400">No achievements yet.</div>}
          {badges.map((b,i)=>(
            <div key={i} className="p-2 bg-gradient-to-br from-indigo-600/30 to-pink-600/30 rounded-md flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-pink-400 flex items-center justify-center text-black font-bold">☆</div>
              <div className="text-sm">
                <div className="font-semibold">{b.title}</div>
                <div className="text-xs text-gray-300">{new Date(b.unlockedAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
