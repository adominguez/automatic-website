'use client'
import { useState } from 'react'
import PostSkeleton from '@/app/components/PostSkeleton'
import { Input, Typography, Button, Card } from '@/app/components/MaterialComponents'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false, loading: () => <p>Loading ...</p>, });

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

const NewPost = () => {
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')
  const markup = { __html: data }

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setData('')
    setLoading(true)
    const res = await fetch(`../../../api/new-post/${keyword}`)
    const response = await res.json();
    console.log(response)
    setData(response.data)
    setLoading(false)
  }

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setData(content);
  };

  return (
    <Card color="white" shadow={false} className='p-6 text-center'>
      <Typography variant="h2" color="blue-gray">Crea una nueva publicación</Typography>
      <Typography color="gray" variant="paragraph">Escribe la palabra clave sobre la que va a ir enfocado tu nuevo artículo.</Typography>
      <form className="mt-8 mb-2" onSubmit={onSubmitHandler}>
        <div className="flex items-center justify-center gap-6 mb-4">
          <Input size="lg" className='flex-1' color="blue-gray" label="Keyword del texto" onChange={changeKeyword} value={keyword} />
          <div className='w-60'>
            <Button ripple onClick={onSubmitHandler} fullWidth>
              Nueva publicación
            </Button>
          </div>
        </div>
      </form>
      {loading ? <PostSkeleton /> : null }
      {
        data ? <ReactQuill
          modules={modules}
          formats={formats}
          theme="snow"
          value={data}
          onChange={handleProcedureContentChange}
        /> : null
      }
    </Card>
  )
}

export default NewPost