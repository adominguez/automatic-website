import { useState, useEffect } from 'react'
import { INITIAL_BLOCKS } from '@/app/constants/gutemberg'

export const useBlocks = () => {
  const [blocks, setBlocks] = useState([]);

  const removeAllPopover = () => {
    setBlocks((oldData) => oldData.map((item) => ({
      ...item,
      editing: false
    })))
  }

  const updateValue = (id, newValue) => {
    setBlocks((oldData) => oldData.map(item => ({
      ...item,
      value: item.id === id ? newValue : item.value
    })))
  }

  const createNewListBlock = (id, ref) => {
    updateValue(id, `${ref.innerHTML}<li></li>`)
  }

  const createNewBlock = (id, ref, newId) => {
    const isList = ref.tagName === 'UL'
    if (isList) {
      createNewListBlock(id, ref)
    } else {
      const newBlock = { tag: 'p', id: newId };
      setBlocks(oldData => oldData.reduce((acc, item, index) => {
        const isNode = item.id === id;
        const order = acc.some(block => block.id === newId) ? index + 1 : index
        acc.push({
          ...item,
          order
        })
        if (isNode && !isList) {
          acc.push({
            ...newBlock,
            order: index + 1
          })
        }
        return acc
      }, []))
    }
  }

  const createSeveralBlocks = (id, newBlocks) => {
    setBlocks((oldData) => oldData.reduce((acc, item) => {
      const isNode = item.id === id
      if (isNode) {
        newBlocks.forEach((block) => {
          acc.push({
            ...block,
            order: acc?.length
          })
        })
      } else {
        acc.push({
          ...item,
          order: acc?.length
        })
      }
      return acc
    }, []));
  }

  const removeBlock = (id) => {
    setBlocks((oldData) => oldData.filter(item => item.id !== id).map((item, order) => ({
      ...item,
      order
    })));
  }

  const getBlockFromId = (id) => blocks.find(item => item?.id === id)

  const editingField = (id, value, tag) => {
    setBlocks((oldData) => oldData.map(item => ({
      ...item,
      editing: tag === 'h1' ? false : item.id === id && !!value
    })))
  }

  const changeTypeBlock = (id, initialSelected) => {
    const { tag, value } = initialSelected
    setBlocks((oldData) => oldData.map((item) => ({
      ...item,
      tag: item.id === id ? tag : item.tag,
      value: item.id === id ? value : item.value,
    })))
  }

  useEffect(() => {
    setBlocks(INITIAL_BLOCKS)
  }, [])

  return { blocks, removeAllPopover, getBlockFromId, updateValue, createNewBlock, removeBlock, createSeveralBlocks, editingField, changeTypeBlock }
}