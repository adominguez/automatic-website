/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use client'
import { useState } from 'react'
import PostSkeleton from '@/app/components/PostSkeleton'
import { Input, Typography, Button, Card } from '@/app/components/MaterialComponents'
import dynamic from 'next/dynamic'

const NewSite = () => {
  const markup = { __html: data }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setData('')
    setLoading(true)
    const res = await fetch(`../../../api/new-post/${keyword}`)
    const response = await res.json()
    console.log(response)
    setData(response.data)
    setLoading(false)
  }

  return (
        <Card color="white" shadow={false} className='p-6 text-center'>
            <Typography variant="h2" color="blue-gray">Crea una nueva publicación</Typography>
            <Typography color="gray" variant="paragraph">Escribe la palabra clave sobre la que va a ir enfocado tu nuevo artículo.</Typography>
            <form className="mt-8 mb-2" onSubmit={onSubmitHandler}>
                <div className="flex items-center justify-center gap-6 mb-4">
                    <Input size="lg" className='flex-1' color="blue-gray" label="Nombre del sitio" onChange={changeKeyword} value={keyword} />
                    <div className='w-60'>
                        <Button ripple onClick={onSubmitHandler} fullWidth>
                            Nuevo Sitio
                        </Button>
                    </div>
                </div>
            </form>
        </Card>
  )
}

export default NewSite
