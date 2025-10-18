'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
export default function Home(){
  return (
    <main className='flex flex-col items-center justify-center h-[70vh] gap-6 text-center'>
      <motion.h1 initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className='text-4xl font-extrabold' style={{background:'linear-gradient(90deg,#D4AF37,#5B728F)',WebkitBackgroundClip:'text',color:'transparent'}}>
        GoldEdge Labs
      </motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} className='max-w-xl text-gray-400'>Hybrid gold + neutral UI demo — lightweight frontend with pages and mockups.</motion.p>
      <div className='flex gap-3'>
        <Link href='/projects' className='px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold'>Explore Projects</Link>
        <Link href='/chat' className='px-4 py-2 rounded border border-gray-700'>Open Chat</Link>
      </div>
    </main>
  );
}
