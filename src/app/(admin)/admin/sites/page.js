import DefaultListPage from "@/app/components/DefaultListPage"
const endpoint = 'sites'

const Sites = async () => {
  return (<DefaultListPage endpoint={endpoint} />)
}

export default Sites