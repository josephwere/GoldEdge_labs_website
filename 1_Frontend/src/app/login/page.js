'use client';
export default function Login(){ return (
  <div className='max-w-md mx-auto p-6 card rounded-md'>
    <h2 className='text-2xl font-bold mb-2' style={{color:'#D4AF37'}}>Sign in</h2>
    <form className='flex flex-col gap-3'>
      <input placeholder='Email' className='p-2 rounded bg-transparent border border-gray-700'/>
      <input placeholder='Password' type='password' className='p-2 rounded bg-transparent border border-gray-700'/>
      <div className='flex justify-between items-center'><button className='px-4 py-2 rounded bg-yellow-500 text-black font-semibold'>Sign in</button><a href='/forgot-password' className='text-sm text-gray-400'>Forgot?</a></div>
    </form>
  </div>
); }
