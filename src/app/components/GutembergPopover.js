import { useState } from 'react'
import { PlusSmall } from '@/app/components/Icons'
import { TYPES_OF_CONTENT } from '@/app/constants/gutemberg'
import { Popover, PopoverHandler, PopoverContent, Button } from '@/app/components/MaterialComponents'
import ManageImageDialog from './ManageImageDialog'

const GutembergPopover = ({ selection, handlerChangeType }) => {
  const [openPopover, setOpenPopover] = useState(false)

  const handlerButtonSelection = (initialSelected) => {
    handlerChangeType && handlerChangeType(initialSelected, selection)
    setOpenPopover(false)
  }

  return (<Popover open={openPopover} handler={setOpenPopover}
    className="z-10"
    placement="left-start"
    animate={{
      mount: { scale: 1, y: 0 },
      unmount: { scale: 0, y: 25 }
    }}
  >
    <PopoverHandler>
      <Button color="blue-gray" className="flex items-center justify-center w-8 h-8 p-0" onClick={() => setOpenPopover(true)}>
        <PlusSmall />
      </Button>
    </PopoverHandler>
    <PopoverContent className='bg-blue-gray-50'>
      <div className="grid grid-cols-3 gap-4">
        {
          Object.values(TYPES_OF_CONTENT)?.map(({ initialSelected, icon, label, value }) => (
            value === 'image'
              ? <ManageImageDialog key={value}>
                {({ handleOpen }) => {
                  function handleOnClick (e) {
                    e.preventDefault()
                    handleOpen()
                  }
                  return (
                    <Button color="blue-gray" type="text" variant="text" size="sm" onClick={handleOnClick}>
                      <div className="flex flex-col items-center justify-center gap-2" color="blue-gray">
                        {TYPES_OF_CONTENT.image.icon}
                        <span>{TYPES_OF_CONTENT.image.label}</span>
                      </div>
                    </Button>
                  )
                }}
              </ManageImageDialog>
              : <Button color="blue-gray" type="text" key={value} variant="text" size="sm" onClick={() => handlerButtonSelection(initialSelected)}>
                <div className="flex flex-col items-center justify-center gap-2" color="blue-gray">
                  {icon}
                  <span>{label}</span>
                </div>
              </Button>
          ))
        }
      </div>
    </PopoverContent>
  </Popover>)
}

export default GutembergPopover
