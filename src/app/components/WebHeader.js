'use client'
import { Logo } from '@/app/components/Icons'
import { WEB_ROUTES } from '@/app/constants/routes'
import Link from 'next/link'
import { useAuthContext } from '@/app/hooks/auth'
import { usePathname } from 'next/navigation'

const WebHeader = () => {
  const { user, onLogout, authorized } = useAuthContext()
  const pathname = usePathname()
  return (!pathname.includes('/admin')
    ? <header className={'header bg-amber-50 sticky z-10 w-full top-0 flex flex-col justify-center items-center'}>
      <div className='flex items-center justify-between w-full gap-4 px-4 py-8 md:flex-row lg:max-w-5xl'>
        <Link href="/">
          <Logo />
        </Link>
        <nav className='flex gap-3'>
          {
            WEB_ROUTES?.map(({ label, route }) => (
              <Link key={route} href={route}>{label}</Link>
            ))
          }
        </nav>
        <nav className='flex gap-3'>
          {
            authorized && user.id
              ? <div className="flex gap-2">
                <button onClick={() => onLogout()}>Logout</button>
                <Link href="/admin">Admin</Link>
              </div>
              : <Link href="../login">Acceder</Link>
          }
        </nav>
      </div>
    </header>
    : null
  )
}

export default WebHeader
