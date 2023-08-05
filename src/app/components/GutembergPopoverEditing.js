import { TYPES_OF_CONTENT, TYPE_BY_TAG } from "../constants/gutemberg"
import { UpButton, DownButton } from '@/app/components/Icons'
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/app/components/MaterialComponents'

const GutembergPopoverEditing = ({ tag, id, downDisabled, upDisabled, handlerEdition, orderBlock }) => (
  <div className="absolute left-0 flex gap-3 p-2 rounded shadow-md pointer-events-auto -top-50-px bg-blue-gray-50">
    <div className="flex flex-col">
      <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" disabled={upDisabled} className="flex items-center justify-center w-8 h-5 px-1 py-1" onClick={() => orderBlock('up', id, tag)}>
        <UpButton />
      </Button>
      <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" disabled={downDisabled} className="flex items-center justify-center w-8 h-5 px-1 py-1" onClick={() => orderBlock('down', id, tag)}>
        <DownButton />
      </Button>
    </div>
    {TYPES_OF_CONTENT[TYPE_BY_TAG[tag]]?.editingButtons.map(({icon, type, tagName}) => (
      <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" className="flex items-center justify-center px-1 py-1 rounded-full w-9 h-9" onClick={() => handlerEdition(type, id, tagName)}>
        {icon}
      </Button>
    ))}
  </div>
)

export default GutembergPopoverEditing