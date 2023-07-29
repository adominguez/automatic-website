'use client'
import React, { useState } from 'react'
import Header from './AdminHeader'
import { ADMIN_ROUTES } from '../constants/routes'
import { usePathname } from 'next/navigation';
import useScrollTop from '../hooks/scroll';


const totalRoutes = Object.values(ADMIN_ROUTES).map(item => item.routes).flat();

const Page = ({ children, title }) => {
  const [scrollTop, scrollProps] = useScrollTop();
  const pathname = usePathname();
  const routeSelected = totalRoutes.find(item => item.route === pathname || item?.children?.find(r => r.route === pathname))

  return (
    <div {...scrollProps} className='flex-1 h-full p-4 overflow-auto'>
      <Header title={routeSelected?.label} scrollTop={scrollTop} onMenuClicked={() => alert()} />
      {children}
    </div>
  )
}

export default Page