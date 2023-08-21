'use client'
import { useState, cloneElement } from 'react'
import { useFetchApi } from '@/app/hooks/fetch'
import { SkeletonCardList } from './SkeletonCardList'
import { SkeletonTableList } from './SkeletonTableList'
import { EmptyData, ListIcon, GridIcon } from '@/app/components/Icons'
import { Typography } from '@/app/components/MaterialComponents'

const TYPES_VALUES = ['list', 'table']

const TYPES = [{
  label: 'Listado',
  value: TYPES_VALUES[0],
  icon: <GridIcon />
},
{
  label: 'Tabla',
  value: TYPES_VALUES[1],
  icon: <ListIcon />
}]

const CHILDREN_TYPES_BY_CLASSNAME = ['item', 'error', 'loading', 'empty']

const getType = (type) => TYPES_VALUES?.includes(type) ? type : TYPES_VALUES[0]

const getSkeleton = (type) => getType(type) === TYPES_VALUES[0] ? <SkeletonCardList number={12} /> : <SkeletonTableList />

const DefaultListPage = ({ type: defaultType = TYPES_VALUES[1], endpoint, children }) => {
  const [type, setType] = useState(defaultType)
  const { response, error, loading, isEmpty, loadData } = useFetchApi({ endpoint })

  const hasChildren = (childType) => {
    if (!children) return null
    if (typeof children === 'object') {
      if (children?.length) {
        return children.find(item => item?.props?.className?.includes(childType))
      }
      if (children?.props?.className?.includes(childType)) {
        return children
      }
    }
    return null
  }

  const getDefaultChildren = () => {
    if (!children) return null
    if (typeof children === 'object') {
      if (children?.length) {
        return children.filter(item => !item?.props?.className?.split(' ')?.some(cls => CHILDREN_TYPES_BY_CLASSNAME?.includes(cls)))
      }
      if (!children?.props?.className?.split(' ')?.some(cls => CHILDREN_TYPES_BY_CLASSNAME?.includes(cls))) {
        return children
      }
    } else {
      return children
    }
  }

  const composeItemChildren = (item, key) => {
    const child = hasChildren('item')
    return cloneElement(child, { ...child.props, ...item, viewType: type, key })
  }

  const handlerChangeType = (value) => {
    setType(value)
  }

  const isSelected = (selected) => type === selected

  return (
    <section className='relative flex flex-col px-6 py-2 text-center text-gray-700 bg-white bg-clip-border rounded-xl'>
      <div className='flex items-center justify-end px-6 py-2 border-b border-b-blue-gray-100 border-blue-gray-300'>
        {TYPES?.map(({ value, label }, index) => (
          <button key={value} onClick={() => handlerChangeType(value)} className={`${isSelected(value) ? 'bg-blue-gray-300 text-blue-gray-50' : 'bg-blue-gray-100 text-blue-gray-300'} py-2 px-3 ${index === 0 ? 'rounded-s' : ''} ${index === TYPES?.length - 1 ? 'rounded-e' : ''}`}>{label}</button>
        ))}
      </div>
      <div className='py-4'>
        {loading ? hasChildren('loading') ?? getSkeleton(type) : null}
        {
          response?.data?.length
            ? <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {
              response.data?.map((item, key) => (
                hasChildren('item')
                  ? composeItemChildren(item, key)
                  : <div key={item.id} className="h-40 bg-white border rounded-lg shadow" />
              ))
            }
          </div>
            : null
        }
        {
          isEmpty
            ? hasChildren('empty') ?? <div className='flex flex-col items-center justify-center p-20'>
            <div className='w-32'>
              <EmptyData />
            </div>
            <Typography variant="h3" className="balance">
              Hemos buscado y todavía no tienes datos
            </Typography>
          </div>
            : null
        }
        {
          error ? hasChildren('error') ?? <div>Hay error</div> : null
        }
        {
          getDefaultChildren()
        }
      </div>
    </section>
  )
}

export default DefaultListPage
