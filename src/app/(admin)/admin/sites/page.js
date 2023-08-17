import DefaultListPage from "@/app/components/defaultListPage"
const endpoint = 'sites'

const Sites = async () => {
  return (<DefaultListPage endpoint={endpoint} />)
}

export default Sites