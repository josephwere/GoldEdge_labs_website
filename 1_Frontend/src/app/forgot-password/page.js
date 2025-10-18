export default function Forgot(){ return (
  <div className='max-w-md mx-auto p-6 card rounded-md'>
    <h2 className='text-2xl font-bold mb-2'>Reset password</h2>
    <p className='text-sm text-gray-400'>Enter your email to receive reset instructions.</p>
    <input className='mt-3 p-2 rounded bg-transparent border border-gray-700' placeholder='Email' />
    <button className='mt-3 px-4 py-2 rounded bg-yellow-500 text-black'>Send</button>
  </div>
); }
