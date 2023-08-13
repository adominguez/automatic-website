import { Typography, Button } from '@/app/components/MaterialComponents'
import { Delete, Pencil } from '@/app/components/Icons'
import CopyInput from './CopyInput';
import { formatDate } from '../libs/dates'
import { formatBytes } from '../libs/sizes'

const ManageImageDetail = ({ selectedImage }) => {
  return (
    selectedImage ?
      <div className="flex flex-col gap-2">
        <Typography variant="h2" color="blue-gray" className="text-base font-normal text-center uppercase" >
          Detalles del adjunto
        </Typography>
        <div className='flex justify-between'>
          <Button variant="text" color="blue" size="sm" className='flex items-center justify-center gap-1'>{Pencil} Editar</Button>
          <Button variant="text" color="red" size="sm" className='flex items-center justify-center gap-1'>{Delete} Borrar</Button>
        </div>
        <img src={selectedImage?.secure_url} className='object-cover aspect-square' />
        <div className='text-sm font-normal'>
          <span className='block leading-tight line-clamp-1'>{formatDate(selectedImage?.created_at)}</span>
          <span className='block leading-tight line-clamp-1'>{formatBytes(selectedImage?.bytes)}</span>
          <span className='block leading-tight line-clamp-1'>{`${selectedImage?.width} x ${selectedImage?.height}`}</span>
        </div>
        <hr className='h-0 border-t border-b border-t-blue-gray-600/10 border-b-gray-600/30' />
        <CopyInput label="url" value={selectedImage?.secure_url} className="mt-2" disabled/>
      </div >
      :
      <div className='flex flex-col items-center justify-center flex-1 h-full'>
        <Typography variant="h2" className="text-base font-normal text-center uppercase text-blue-gray-400">
          Selecciona una imagen de la izquierda para editar
        </Typography>
      </div>
  )
}

export default ManageImageDetail