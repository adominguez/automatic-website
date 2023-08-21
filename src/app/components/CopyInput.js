import React, { useState, useRef, useEffect } from 'react'
import { Input, IconButton } from '@/app/components/MaterialComponents'
import { Copy } from '@/app/components/Icons'

const CopyInput = ({ value: initialValue, label, placeholder, disabled, className }) => {
  const [inputValue, setInputValue] = useState(initialValue || '')
  const [isCopied, setIsCopied] = useState(false)
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    setInputValue(initialValue)
  }, [initialValue])

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(inputValue)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy: ', error)
    }
  }

  return (
    <>
      <div className={`flex gap-1 ${className} justify-center items-center`}>

        <Input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          label={label}
          disabled={disabled}
          placeholder={placeholder}
          className='min-w-[48px]'
          containerProps={{
            className: 'min-w-0'
          }}
        />
        <IconButton
          onClick={handleCopyClick}
          size='sm'
          color='blue-gray'
          className='p-4 rounded-full'
          title='copiar'
        >
          <Copy />
        </IconButton>
      </div >
      {
        isCopied ? <span className='text-xs'>Copiado</span> : null
      }
    </>
  )
}

export default CopyInput
