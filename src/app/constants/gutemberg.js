import { Bookmark, Content, List, Bold, Italic, Underline, Separator, Url, Picture } from '@/app/components/Icons'
import { v4 as uuidv4 } from 'uuid'

export const INITIAL_BLOCKS = [
  { tag: 'h1', id: uuidv4(), value: '', order: 0, downDisabled: true, upDisabled: true },
  { tag: 'p', id: uuidv4(), value: '', order: 1, downDisabled: false, upDisabled: true }
]

export const TYPE_BY_TAG = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  h5: 'heading',
  h6: 'heading',
  p: 'content',
  span: 'content'
}

export const TYPES_OF_CONTENT = {
  heading: {
    value: 'heading',
    label: 'Encabezado',
    types: [
      { label: 'h1', tag: 'h1' },
      { label: 'h2', tag: 'h2' },
      { label: 'h3', tag: 'h3' },
      { label: 'h4', tag: 'h4' },
      { label: 'h5', tag: 'h5' },
      { label: 'h6', tag: 'h6' }
    ],
    editingButtons: [{
      icon: <Bookmark />,
      type: 'convert',
      tagName: 'h1'
    }, {
      icon: <Bold />,
      type: 'bold',
      tagName: 'b'
    }],
    initialSelected: { label: 'h2', tag: 'h2', value: '' },
    icon: <Bookmark />
  },
  content: {
    value: 'content',
    label: 'Contenido',
    initialSelected: { label: 'párrafo', tag: 'p', value: '' },
    editingButtons: [{
      icon: <Content />,
      type: 'convert'
    }, {
      icon: <Bold />,
      type: 'transform',
      tagName: 'b'
    }, {
      icon: <Italic />,
      type: 'transform',
      tagName: 'i'
    }, {
      icon: <Underline />,
      type: 'transform',
      tagName: 'u'
    }, {
      icon: <Url />,
      type: 'link',
      tagName: 'a'
    }, {
      icon: <Picture />,
      type: 'picture',
      tagName: 'img'
    }],
    types: [
      { label: 'párrafo', tag: 'p' },
      { label: 'span', tag: 'span' }
    ],
    icon: <Content />
  },
  list: {
    value: 'list',
    label: 'Listado',
    initialSelected: { label: 'desordenada', tag: 'ul', value: '<li></li>' },
    types: [
      { label: 'desordenada', tag: 'ul' },
      { label: 'ordenada', type: 'ol' }
    ],
    icon: <List />
  },
  Separator: {
    value: 'separator',
    label: 'Separador',
    initialSelected: { tag: 'hr' },
    icon: <Separator />
  },
  image: {
    value: 'image',
    label: 'Imagen',
    initialSelected: { tag: 'img' },
    icon: <Picture />
  }
}

export const classByTag = {
  h1: 'placeholder text-3xl font-bold',
  h2: 'placeholder text-2xl font-semibold',
  h3: 'placeholder text-xl font-semibold',
  p: 'placeholder my-2 text-base',
  ul: 'placeholder my-4 text-base',
  li: 'placeholder my-2 ml-4 text-base',
  hr: 'py-4 cursor-auto'
}

export const ariaByTag = {
  h1: 'Escribe un título',
  h2: 'Encabezado',
  p: 'teclea/para elegir un bloque',
  li: 'Listado de cosas'
}
