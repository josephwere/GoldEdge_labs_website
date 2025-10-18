export default function Contact(){ return (
  <div className='max-w-md mx-auto card p-4 rounded-md'>
    <h2 className='text-2xl font-bold mb-2'>Contact</h2>
    <p className='text-sm text-gray-400'>hello@goldedge.example</p>
    <form className='mt-3 flex flex-col gap-2'><input className='p-2 rounded bg-transparent border border-gray-700' placeholder='Subject'/><textarea className='p-2 rounded bg-transparent border border-gray-700' rows='3' placeholder='Message'></textarea><button className='mt-2 px-3 py-2 rounded bg-yellow-500 text-black'>Send</button></form>
  </div>
); }
