'use client'
import { Logo } from '@/app/components/Icons'
import { WEB_ROUTES } from '@/app/constants/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const WebHeader = () => {
  const pathname = usePathname()
  const routeSelected = WEB_ROUTES.find(item => item.route === pathname)
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
          <Link href="/login">Acceder</Link>
        </nav>
      </div>
    </header>
    : null
  )
}

export default WebHeader
