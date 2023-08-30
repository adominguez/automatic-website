'use client'
import DefaultListPage from '@/app/components/DefaultListPage'
import SiteItem from '@/app/components/SiteItem'
import { IconButton, SpeedDial } from '@/app/components/MaterialComponents'
import { Plus } from '@/app/components/Icons'
import Link from 'next/link'
const endpoint = 'sites-by-user'

const Sites = async () => {
  return (
    <>
      <DefaultListPage endpoint={endpoint}>
        <SiteItem className="item" />
      </DefaultListPage>
      <div className="absolute bottom-3 right-3">
        <SpeedDial>
          <Link href="/admin/sites/new">
            <IconButton size="lg" color="blue-gray" className="rounded-full">
              {Plus}
            </IconButton>
          </Link>
        </SpeedDial>
      </div>
    </>
  )
}

export default Sites
