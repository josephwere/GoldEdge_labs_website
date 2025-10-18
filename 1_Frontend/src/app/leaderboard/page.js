import lb from '../../data/leaderboard.json';
import { motion } from 'framer-motion';
export default function Leaderboard(){ return (
  <div className='max-w-md mx-auto'>
    <h2 className='text-2xl font-bold mb-4' style={{color:'#D4AF37'}}>Leaderboard</h2>
    <div className='space-y-3'>
      {lb.map(u=> (
        <motion.div key={u.rank} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className='p-3 card rounded-md flex justify-between items-center'>
          <div><div className='font-semibold'>{u.rank}. {u.name}</div><div className='text-sm text-gray-400'>{u.role}</div></div>
          <div className='text-yellow-400 font-bold'>{u.points}</div>
        </motion.div>
      ))}
    </div>
  </div>
); }
