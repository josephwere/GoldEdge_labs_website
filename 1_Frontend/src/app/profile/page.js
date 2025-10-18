export default function Profile(){ return (
  <div className='max-w-md mx-auto card p-4 rounded-md'>
    <h2 className='text-2xl font-bold mb-2' style={{color:'#D4AF37'}}>Profile</h2>
    <div className='flex gap-4 items-center'>
      <div className='w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center'>AJ</div>
      <div><div className='font-semibold'>Ava Johnson</div><div className='text-sm text-gray-400'>Lead Developer</div></div>
    </div>
    <div className='mt-3 p-3 rounded bg-gray-900 text-sm'>Bio: Enthusiastic about edge AI and tiny deployments.</div>
    <button className='mt-3 px-3 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'>Edit</button>
  </div>
); }
