'use client'
import { useState } from 'react'
import { Input, Typography, Button, Card, List, ListItem, ListItemSuffix, IconButton } from '@/app/components/MaterialComponents'
import { Delete } from '@/app/components/Icons'
import ListSkeleton from '@/app/components/ListSkeleton'

const KeywordsPage = () => {
  const [keyword, setKeyword] = useState('')
  const [keywordList, setKeywordList] = useState(null)
  const [loading, setLoading] = useState(false)

  const changeKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    setKeywordList(null)
    const res = await fetch(`../api/search-keyword/${keyword}`)
    const { newKeywords } = await res.json()
    setKeywordList(newKeywords)
    setLoading(false)
  }

  return (
    <Card color="white" shadow={false} className='p-6 text-center'>
      <Typography variant="h2" color="blue-gray">Crea una lista palabras clave</Typography>
      <Typography color="gray" variant="paragraph">¿Te faltan ideas para palabras clave? crea una lista de palabras clave relacionadas con lo que metas en la caja de texto</Typography>
      <form className="mt-8 mb-2" onSubmit={onSubmitHandler}>
        <div className="flex items-center justify-center gap-6 mb-4">
          <Input size="lg" className='flex-1' color="blue-gray" label="Palabra clave" onChange={changeKeyword} value={keyword} />
          <Button onClick={onSubmitHandler}>
            Buscar
          </Button>
        </div>
      </form>
      {
        loading ? <ListSkeleton /> : null
      }
      {keywordList?.length && keyword
        ? <>
          {keywordList.length}
          <List>
            {
              keywordList.map(item => (
                <ListItem ripple={false} className="py-1 pl-4 pr-1" key={item}>
                  {item}
                  <ListItemSuffix>
                    <IconButton variant="text" color="blue-gray">
                      {Delete}
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))
            }
          </List>
        </>
        : <>No hay datos para esta consulta</>}
    </Card>)
}

export default KeywordsPage
