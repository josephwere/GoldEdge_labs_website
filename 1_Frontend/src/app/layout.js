import './globals.css';
import Link from 'next/link';
export const metadata = { title: 'GoldEdge Labs', description: 'AI innovation at the edge.' };
export default function RootLayout({ children }) {
  return (<html lang="en"><body className='min-h-screen'>
    <header className='p-4 flex items-center gap-4'>
      <img src='/icons/logo.svg' width='36' height='36' alt='logo'/>
      <div className='font-bold text-lg' style={{color:'#D4AF37'}}>GoldEdge</div>
      <nav className='flex gap-3 text-sm text-gray-300'>
        <Link href='/'>Home</Link><Link href='/projects'>Projects</Link><Link href='/leaderboard'>Leaderboard</Link><Link href='/chat'>Chat</Link>
      </nav>
      <div style={{marginLeft:'auto'}} className='text-xs text-gray-400'>API: {process.env.NEXT_PUBLIC_API_URL || 'unset'}</div>
    </header>
    <main className='p-4'>{children}</main>
  </body></html>);
}
