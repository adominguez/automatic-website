'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from "next/link"
import { ADMIN_ROUTES } from '../constants/routes'
import { Logo } from './Icons'
import { usePathname } from 'next/navigation';
import useIsMobile from '../hooks/mobile';
import useClickMenu from '../hooks/menu';

const Navigator = ({ }) => {
  const pathname = usePathname();
  const isActive = (route) => pathname === route.route || route?.children?.find(r => r.route === pathname);
  const isMobile = useIsMobile();
  const [opened, setOpened] = useState(false);

  const callback = useCallback((e) => {
    const isMenuSelected = e.target.parentElement.classList.contains('menu-button') || e.target.classList.contains('menu-button');
    const isBackdrop = e.target.classList.contains('backdrop')
    const isLink = e.target instanceof HTMLAnchorElement
    if (isBackdrop || isMenuSelected) setOpened(!opened);
    isLink && setOpened(false);
  }, [opened]);

  useClickMenu('click', callback);

  useEffect(() => {
    if (!isMobile) {
      setOpened(false);
    }
  }, [isMobile])

  return (
    <>
      {opened ? <div className='absolute top-0 left-0 z-30 w-screen h-screen shadow-sm backdrop backdrop-blur-sm bg-white/70' /> : null}
      <div className={`w-60 h-full transition-all p-4 fixed md:left-0 ${opened ? 'z-30 left-0' : 'md:relative -left-60'}`}>
        <aside className={`h-full w-full rounded-lg text-blue-gray-100 bg-gradient-to-b from-blue-gray-600 to-blue-gray-800`}>
          <div className="flex items-center justify-center h-16">
            {Logo}
          </div>
          <hr className="h-[0.0625rem] my-4 bg-transparent border-b-0 opacity-25 bg-gradient-to-r from-transparent via-white to-transparent" />
          <nav>
            <ul>
              {
                Object.values(ADMIN_ROUTES).map((item, index) => <li key={item.label}>
                  <span className="flex mx-4 my-2 font-bold uppercase">{item.label}</span>
                  {
                    item.routes?.length ? <ul className="flex flex-col gap-1 mx-2">
                      {item.routes.map(route => <li key={route.route}>
                        <Link href={route.route} className={`flex items-center gap-2 p-2 text-sm font-light transition-all rounded-lg hover:bg-blue-gray-500 hover:pl-5 ${isActive(route) ? 'bg-blue-gray-500 pl-5' : ''}`}>
                          {route.icon}
                          {route.label}
                        </Link>
                      </li>)}
                    </ul> : null
                  }
                  {
                    index < Object.keys(ADMIN_ROUTES).length - 1 ?
                      <hr className="h-[0.0625rem] my-4 bg-transparent border-b-0 opacity-25 bg-gradient-to-r from-transparent via-white to-transparent" /> : null
                  }
                </li>)
              }
            </ul>
          </nav>
        </aside>
      </div>
    </>
  )
}

export default Navigator