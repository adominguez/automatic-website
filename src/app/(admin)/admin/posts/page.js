'use client'
import { useState } from 'react'
import { IconButton, SpeedDial } from "@/app/components/MaterialComponents"
import { Plus } from "@/app/components/Icons"
import PostItem from "@/app/components/PostItem"
import CardsListSkeleton from "@/app/components/CardsListSkeleton"
import Link from 'next/link'

const Posts = () => {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className="absolute bottom-3 right-3">
        <SpeedDial>
          <Link href="/admin/posts/new">
            <IconButton size="lg" color="blue-gray" className="rounded-full">
              {Plus}
            </IconButton>
          </Link>
        </SpeedDial>
      </div>
      {
        loading ? <CardsListSkeleton /> :
          <section className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            <PostItem />
          </section>
      }
    </>
  )
}

export default Posts