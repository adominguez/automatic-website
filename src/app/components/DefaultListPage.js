'use client'
import { useState } from 'react'
import { useFetchApi } from '@/app/hooks/fetch'
import { SkeletonCardList } from './SkeletonCardList'
import { SkeletonTableList } from './SkeletonTableList'
import { EmptyData } from '@/app/components/Icons'
import { Typography } from '@/app/components/MaterialComponents'

const TYPES = ['list', 'table']

const getType = (type) => TYPES?.includes(type) ? type : TYPES[0]

const getSkeleton = (type) => getType(type) === TYPES[0] ? <SkeletonCardList number={12} /> : <SkeletonTableList />

const DefaultListPage = ({ type: defaultType = TYPES[1], endpoint }) => {
  const [type, setType] = useState(defaultType);
  const { response, error, loading, isEmpty, loadData } = useFetchApi({ endpoint });

  return (
    <section className='relative flex flex-col px-6 py-2 text-center text-gray-700 bg-white bg-clip-border rounded-xl'>
      <div className='flex items-center justify-end px-6 py-2 border-b-blue-gray-100'>
        <button>Botón</button>
        <button>Otro botón</button>
      </div>
      {loading ? getSkeleton(type) : null}
      {
        response?.data?.length ? <div className="h-40 bg-white border rounded-lg shadow" /> : null
      }
      {
        isEmpty ? <div className='flex flex-col items-center justify-center p-20'>
          <Typography variant="h3">
            No se han encontrado datos
          </Typography>
          <EmptyData />
        </div> : null
      }
      {
        error ? <div>Hay error</div> : null
      }
    </section>
  );
}

export default DefaultListPage;
