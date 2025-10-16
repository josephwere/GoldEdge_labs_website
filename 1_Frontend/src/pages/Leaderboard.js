import React from 'react';

const Leaderboard = () => {
  const users = [{ name: 'Alice', points: 120 }, { name: 'Bob', points: 110 }, { name: 'Charlie', points: 95 }];

  return (
    <div className="min-h-screen bg-transparent text-white py-10">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
        <table className="w-full text-left border-collapse">
          <thead><tr className="border-b border-gray-700"><th className="p-3">Rank</th><th className="p-3">User</th><th className="p-3">Points</th></tr></thead>
          <tbody>
            {users.map((u,i) => (<tr key={i} className="border-b border-gray-800"><td className="p-3">{i+1}</td><td className="p-3">{u.name}</td><td className="p-3">{u.points}</td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
