'use client'
import { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { TYPES_OF_CONTENT, TYPE_BY_TAG } from '../constants/gutemberg'
import { UpButton, DownButton } from '@/app/components/Icons'
import { v4 as uuidv4 } from 'uuid'
import { Button, Popover, PopoverContent, PopoverHandler } from '@/app/components/MaterialComponents'
import GutembergLinkForm from './GutembergLinkForm'

const GutembergPopoverEditing = ({ tag, id, downDisabled, upDisabled, handlerEdition, orderBlock }) => {
  const [openedLink, setOpenedLink] = useState(false)
  const [range, setRange] = useState(undefined)
  const handlerButton = (type, tagName) => {
    handlerEdition({ type, id, tagName })
  }

  const handlderChangeLink = (link) => {
    handlerEdition({ type: 'link', id, tagName: 'a', link, range })
    setOpenedLink(false)
  }

  const handlerOpenLinkPopover = (opened) => {
    if (opened) {
      const selection = window.getSelection()
      const newRange = selection.getRangeAt(0)
      setRange(newRange)
    } else {
      setRange(undefined)
    }
    setOpenedLink(opened)
  }

  const loadImages = async (e) => {
    e.preventDefault()
    const res = await fetch('../../api/images')
    const { resources, next_cursor } = await res.json()
  }

  const buttons = TYPES_OF_CONTENT[TYPE_BY_TAG[tag]]?.editingButtons
  return (
    <div className="absolute left-0 flex gap-3 p-2 rounded shadow-md pointer-events-auto -top-50-px bg-blue-gray-50">
      <div className="flex flex-col">
        <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" disabled={upDisabled} className="flex items-center justify-center w-8 h-5 px-1 py-1" onClick={() => orderBlock('up', id, tag)}>
          <UpButton />
        </Button>
        <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" disabled={downDisabled} className="flex items-center justify-center w-8 h-5 px-1 py-1" onClick={() => orderBlock('down', id, tag)}>
          <DownButton />
        </Button>
      </div>
      {buttons?.filter(({ type }) => type !== 'link' && type !== 'picture').map(({ icon, type, tagName }) => (
        <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" className="flex items-center justify-center px-1 py-1 rounded-full w-9 h-9" onClick={() => handlerButton(type, tagName)}>
          {icon}
        </Button>
      ))}
      {
        buttons?.some(item => item.type === 'link')
          ? <Popover open={openedLink} handler={handlerOpenLinkPopover} placement="bottom" offset={20}>
          <PopoverHandler>
            <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" className="flex items-center justify-center px-1 py-1 rounded-full w-9 h-9">
              {buttons?.find(item => item.type === 'link')?.icon}
            </Button>
          </PopoverHandler>
          <PopoverContent className="popover-content w-96 bg-blue-gray-50">
            <GutembergLinkForm range={range} handlderChangeLink={handlderChangeLink} />
          </PopoverContent>
        </Popover>
          : null
      }
      <CldUploadWidget>
        {({ open }) => {
          function handleOnClick (e) {
            e.preventDefault()
            open()
          }
          return (
            <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" className="flex items-center justify-center px-1 py-1 rounded-full w-9 h-9" onClick={handleOnClick}>
              {buttons?.find(item => item.type === 'picture')?.icon}
            </Button>
          )
        }}
      </CldUploadWidget>
      <Button onClick={loadImages}>
        load images
      </Button>
    </div>
  )
}

export default GutembergPopoverEditing
