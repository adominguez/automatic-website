'use client'
import { usePathname } from 'next/navigation';
import { ADMIN_ROUTES } from '../constants/routes'
import {BreadcrumbNext} from '@/app/components/Icons'
import Link from 'next/link';

const AdminBreadcrumb = () => {
  const pathname = usePathname();
  const totalRoutes = Object.values(ADMIN_ROUTES).map(item => item.routes).flat()
  const routes = pathname.split('/').slice(1).reduce((acc, item) => {
    const lastAcc = acc?.slice('-1')?.[0] || {};
    const route = `${lastAcc?.route || ''}/${item}`;
    const newItem = lastAcc?.children ? lastAcc.children.find(item => item.route === route) : totalRoutes.find(item => item.route === route);
    acc.push({
      ...newItem,
      route
    })
    return acc;
  }, [])
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center gap-1">
        {
          routes?.map((item, index) => (
            <li className="inline-flex items-center truncate" key={item?.route}>
              {
                routes?.length === index + 1 ? <span href={item.route} className="inline-flex items-center gap-1 text-sm font-medium text-blue-gray-800">
                  {
                    index === 0 ? item.icon : BreadcrumbNext
                  }
                  {item.label}
                </span> : <Link href={item.route} className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-gray-600 dark:text-gray-400 dark:hover:text-white">
                  {
                    index === 0 ? item.icon : BreadcrumbNext
                  }
                  {item.label}
                </Link>
              }
            </li>
          ))
        }
        {/* <li>
          <div className="flex items-center">
            <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
            <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Flowbite</span>
          </div>
        </li> */}
      </ol>
    </nav>
  )
}

export default AdminBreadcrumb