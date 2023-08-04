import { Bookmark, Content, List, Bold, Italic, Underline } from '@/app/components/Icons'
import { v4 as uuidv4 } from 'uuid';

export const INITIAL_BLOCKS = [
  { tag: 'h1', id: uuidv4(), value: '', order: 0 },
  { tag: 'p', id: uuidv4(), value: '', order: 1 },
];

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
    label: 'Encabezado',
    types: [
      { label: 'h1', tag: 'h1' },
      { label: 'h2', tag: 'h2' },
      { label: 'h3', tag: 'h3' },
      { label: 'h4', tag: 'h4' },
      { label: 'h5', tag: 'h5' },
      { label: 'h6', tag: 'h6' },
    ],
    editingButtons: [{
      icon: <Bookmark />,
      type: 'convert'
    }, {
      icon: <Bold />,
      type: 'bold'
    }],
    initialSelected: { label: 'h2', tag: 'h2', value: '' },
    icon: <Bookmark />,
  },
  content: {
    label: 'Contenido',
    initialSelected: { label: 'párrafo', tag: 'p', value: '' },
    editingButtons: [{
      icon: <Content />,
      type: 'convert'
    }, {
      icon: <Bold />,
      type: 'transform',
      tagName: 'b'
    },
    {
      icon: <Italic />,
      type: 'transform',
      tagName: 'i'
    },
    {
      icon: <Underline />,
      type: 'transform',
      tagName: 'u'
    }],
    types: [
      { label: 'párrafo', tag: 'p' },
      { label: 'span', tag: 'span' },
    ],
    icon: <Content />
  },
  list: {
    label: 'Listado',
    initialSelected: { label: 'desordenada', tag: 'ul', value: '<li contenteditable="true"></li>' },
    types: [
      { label: 'desordenada', tag: 'ul' },
      { label: 'ordenada', type: 'ol' }
    ],
    icon: <List />
  }
}

export const classByTag = {
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-semibold',
  h3: 'text-xl font-semibold',
  p: 'my-2 text-base',
  ul: 'my-4 text-base',
  li: 'my-4 text-base',
}

export const ariaByTag = {
  h1: 'Escribe un título',
  h2: 'Encabezado',
  p: 'teclea/para elegir un bloque',
  ul: 'Listado'
}