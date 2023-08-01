import { useState } from 'react'
import { PlusSmall } from '@/app/components/Icons'
import { TYPES_OF_CONTENT } from '@/app/constants/gutemberg'
import { Popover, PopoverHandler, PopoverContent, Button } from '@/app/components/MaterialComponents'

const GutembergPopover = ({selection, handlerChangeType}) => {
  const [openPopover, setOpenPopover] = useState(false);

  const handlerButtonSelection = (initialSelected) => {
    handlerChangeType && handlerChangeType(initialSelected, selection)
    setOpenPopover(false)
  }

  return (<Popover open={openPopover} handler={setOpenPopover}
  className="z-10"
  placement="left-start"
  animate={{
    mount: { scale: 1, y: 0 },
    unmount: { scale: 0, y: 25 },
  }}
>
  <PopoverHandler>
    <Button color="blue-gray" className="flex items-center justify-center w-8 h-8 p-0" onClick={() => setOpenPopover(true)}>
      <PlusSmall />
    </Button>
  </PopoverHandler>
  <PopoverContent>
    <div className="grid grid-cols-3 gap-4">
      {
        Object.values(TYPES_OF_CONTENT)?.map(({ initialSelected, icon, label }) => (
          <Button color="blue-gray" type="text" key={label} variant="text" size="sm" onClick={() => handlerButtonSelection(initialSelected)}>
            <div className="flex flex-col items-center justify-center gap-2" color="blue-gray">
              {icon}
              <span>{label}</span>
            </div>
          </Button>
        ))
      }
    </div>
  </PopoverContent>
</Popover>)}

export default GutembergPopover