import { Bookmark, Content, List } from '@/app/components/Icons'
import { v4 as uuidv4 } from 'uuid';

export const INITIAL_BLOCKS = [
  { tag: 'h1', id: uuidv4(), value: '' },
  { tag: 'p', id: uuidv4(), value: '' },
];

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
    initialSelected: { label: 'h2', tag: 'h2', value: '' },
    icon: <Bookmark />,
  },
  content: {
    label: 'Contenido',
    initialSelected: { label: 'párrafo', tag: 'p', value: '' },
    types: [
      { label: 'párrafo', tag: 'p' },
      { label: 'span', tag: 'span' },
    ],
    icon: <Content />
  },
  list: {
    label: 'Listado',
    initialSelected: { label: 'desordenada', tag: 'ul', value: '<ul><li></li></ul>' },
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
  li: 'Listado'
}