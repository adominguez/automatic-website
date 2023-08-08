'use client'
import { useState } from 'react'
import { Button, Checkbox, Input } from '@/app/components/MaterialComponents'

const regexLink = /^(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*$/

const GutembergLinkForm = ({ handlderChangeLink, range }) => {
  const [link, setLink] = useState({
    textLink: range?.toString() || '',
    url: regexLink.test(range?.toString()) ? range?.toString() : '',
    newTab: false,
    noFollow: false,
    sponsored: false,
    isSelectedText: range?.toString() || false,
  })

  const isDisabled = !link.textLink || !link.url || !regexLink.test(link.url)

  const handlerChange = (e) => {
    const { id, value, checked } = e.currentTarget
    setLink({
      ...link,
      [id]: checked || value
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault()
    handlderChangeLink(link)
  }

  return (
    <form className="flex flex-col gap-2 popover-content" onSubmit={onSubmitHandler}>
      <Input id="textLink" value={link.textLink} name="textLink" className='popover-content' color='blue-gray' label="Texto del enlace" type="text" onChange={handlerChange} />
      <Input id="url" value={link.url} name="url" className='popover-content' color='blue-gray' label="Url" type="url" onChange={handlerChange} />
      <label
        htmlFor="newTab"
        className="flex items-center w-full cursor-pointer popover-content"
      >
        <Checkbox id="newTab" defaultChecked={link.newTab} label="Abrir en una nueva pestaña" className='popover-content' onChange={handlerChange} />
      </label>
      <label
        htmlFor="noFollow"
        className="flex items-center w-full cursor-pointer popover-content"
      >
        <Checkbox id="noFollow" defaultChecked={link.noFollow} label="Enlace nofollow" className='popover-content' onChange={handlerChange} />
      </label>
      <label
        htmlFor="sponsored"
        className="flex items-center w-full cursor-pointer popover-content"
      >
        <Checkbox id="sponsored" defaultChecked={link.sponsored} label="Enlace sponsored" className='popover-content' onChange={handlerChange} />
      </label>
      <Button disabled={isDisabled} type="submit" className='popover-content' color='blue-gray'>Crear Enlace</Button>
    </form>)
}

export default GutembergLinkForm