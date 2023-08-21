import { useState, useEffect } from 'react'
import { INITIAL_BLOCKS } from '@/app/constants/gutemberg'
import { isH1, isList, getListValues } from '../libs/clipboard'

export const useBlocks = () => {
  const [blocks, setBlocks] = useState([])

  const getBlockFromId = (id) => blocks.find(item => item?.id === id)

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

  const getDisabledOrder = (index) => (
    {
      downDisabled: index === 0 || index === blocks?.length - 1,
      upDisabled: index === 0 || index === 1
    })

  const createBlock = (id, newId, isTagNameList) => {
    const newBlock = { tag: 'p', id: newId }
    setBlocks(oldData => oldData.reduce((acc, item, index) => {
      const isNode = item.id === id
      const order = acc.some(block => block.id === newId) ? index + 1 : index
      acc.push({
        ...item,
        order,
        ...getDisabledOrder(index)
      })
      if (isNode && !isTagNameList) {
        acc.push({
          ...newBlock,
          order: index + 1,
          ...getDisabledOrder(index + 1)
        })
      }
      return acc
    }, []))
  }

  const removeBlockById = (id) => {
    setBlocks((oldData) => oldData.filter(item => item.id !== id).map((item, order) => ({
      ...item,
      order,
      ...getDisabledOrder(order)
    })))
  }

  const removeListItem = (id, ref) => {
    const value = ref.innerHTML
    const splittedValue = value.split('</li>')
    const newValue = splittedValue.slice(0, splittedValue?.length - 2)
      .map(item => `${item}</li>`).join('')
    if (newValue) {
      updateValue(id, newValue)
    } else {
      removeBlockById(id)
    }
  }

  const createNewListBlock = (id, ref, newId, isTagNameList) => {
    const value = ref.innerHTML
    const matches = getListValues(value)
    if (matches.slice(-1)?.[0] === '') {
      createBlock(id, newId)
      removeListItem(id, ref)
    } else {
      updateValue(id, `${value}<li></li>`)
    }
  }

  const createNewBlock = (id, ref, newId) => {
    const isTagNameList = isList(ref?.tagName)
    if (isTagNameList) {
      createNewListBlock(id, ref, newId, isTagNameList)
    } else {
      createBlock(id, newId, isTagNameList)
    }
  }

  const createSeveralBlocks = (id, newBlocks) => {
    setBlocks((oldData) => oldData.reduce((acc, item) => {
      const isNode = item.id === id
      if (isNode) {
        newBlocks.forEach((block) => {
          acc.push({
            ...block,
            order: acc?.length,
            ...getDisabledOrder(acc?.length)
          })
        })
      } else {
        acc.push({
          ...item,
          order: acc?.length,
          ...getDisabledOrder(acc?.length)
        })
      }
      return acc
    }, []))
  }

  const removeBlock = (id, ref) => {
    const block = getBlockFromId(id)
    if (isList(block.tag)) {
      removeListItem(id, ref)
    } else {
      removeBlockById(id)
    }
  }

  const editingField = (id, value, tag) => {
    setBlocks((oldData) => oldData.map(item => ({
      ...item,
      editing: isH1(tag) ? false : item.id === id && !!value
    })))
  }

  const changeTypeBlock = (id, initialSelected) => {
    const { tag, value } = initialSelected
    setBlocks((oldData) => oldData.map((item) => ({
      ...item,
      tag: item.id === id ? tag : item.tag,
      value: item.id === id ? value : item.value
    })))
  }

  const sortBlockInBlocks = (type, id) => {
    /*
    * TODO -> Hay que realizar el sort de los datos, no se está haciendo nada
    */
  }

  useEffect(() => {
    setBlocks(INITIAL_BLOCKS)
  }, [])

  return { blocks, removeAllPopover, getBlockFromId, updateValue, createNewBlock, removeBlock, createSeveralBlocks, editingField, changeTypeBlock, sortBlockInBlocks }
}

export const useFocus = (inputRef) => {
  const getRefFromId = (id) => inputRef.current.find(item => item?.el?.current?.id === id) ||
  inputRef.current.find(item => item?.id === id)

  const focusElement = (id) => {
    setTimeout(() => {
      const newElement = getRefFromId(id)
      if (isList(newElement?.tagName)) {
        newElement.lastElementChild.focus()
      } else {
        newElement?.el.current?.focus()
      }
    }, 0)
  }
  return { getRefFromId, focusElement }
}
