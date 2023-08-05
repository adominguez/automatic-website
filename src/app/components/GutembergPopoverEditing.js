import { TYPES_OF_CONTENT, TYPE_BY_TAG } from "../constants/gutemberg"
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/app/components/MaterialComponents'

const GutembergPopoverEditing = ({ tag, id, handlerEdition }) => (
  <div className="absolute left-0 flex gap-3 p-2 rounded shadow-md pointer-events-auto -top-50-px bg-blue-gray-50">
    {TYPES_OF_CONTENT[TYPE_BY_TAG[tag]]?.editingButtons.map(({icon, type, tagName}) => (
      <Button color="blue-gray" type="text" key={uuidv4()} variant="text" size="sm" className="px-1 py-1 rounded-full" onClick={() => handlerEdition(type, id, tagName)}>
        {icon}
      </Button>
    ))}
  </div>
)

export default GutembergPopoverEditing