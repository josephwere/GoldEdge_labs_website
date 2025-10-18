export default function Register(){ return (
  <div className='max-w-md mx-auto p-6 card rounded-md'>
    <h2 className='text-2xl font-bold mb-2' style={{color:'#D4AF37'}}>Create account</h2>
    <p className='text-sm text-gray-400 mb-3'>Quick demo registration (no backend).</p>
    <form className='flex flex-col gap-3'>
      <input placeholder='Full name' className='p-2 rounded bg-transparent border border-gray-700'/>
      <input placeholder='Email' className='p-2 rounded bg-transparent border border-gray-700'/>
      <input placeholder='Password' className='p-2 rounded bg-transparent border border-gray-700'/>
      <button className='mt-2 px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold'>Sign up</button>
    </form>
  </div>
); }
