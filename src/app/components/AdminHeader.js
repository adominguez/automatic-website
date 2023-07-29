import { Input, Button } from "./MaterialComponents";
import { Menu } from "./Icons"
import Breadcrumb from '@/app/components/AdminBreadcrumb'

const Header = ({ title, scrollTop, onMenuClicked }) => {
  return (
    <header
      className={`sticky z-10 items-center w-full p-4 flex flex-col-reverse rounded-lg top-0 justify-between mb-4 gap-4 md:p-2 md:flex-row ${scrollTop > 0 ? 'backdrop-blur-sm bg-white/70 shadow-sm' : ''}`}>
      <div className="flex flex-col w-full gap-2">
        <h1 className="font-bold tracking-wide text-blue-gray-800">{title}</h1>
        <Breadcrumb />
      </div>
      <div className="flex w-full gap-3">
        <Button variant="text" color="blue-gray" className="flex items-center gap-2 menu-button md:hidden">
          {Menu}
        </Button>
        <Input size="lg" label="Buscar" color="blue-gray" />
      </div>
    </header>
  )
}

export default Header