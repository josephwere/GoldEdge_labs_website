import data from '../../data/projects.json';
import { motion } from 'framer-motion';
export default function Projects(){ const projects = data; return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4' style={{color:'#D4AF37'}}>Projects</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {projects.map(p=> (
          <motion.div key={p.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='p-4 card rounded-md'>
            <div className='flex justify-between items-start'><div><div className='font-semibold'>{p.name}</div><div className='text-sm text-gray-400'>{p.desc}</div></div><div className='text-sm text-gray-300'>{p.launchDate}</div></div>
          </motion.div>
        ))}
      </div>
    </div>
); }
