import AdminNavigator from '../../components/AdminNavigator.js'
import AdminPage from '../../components/AdminPage.js'

const AdminLayout = ({ children }) => (
  <>
    <div className='flex justify-between w-screen h-screen overflow-hidden bg-gradient-to-b from-blue-gray-100 to-blue-gray-200'>
      <AdminNavigator />
      <AdminPage>
        {children}
      </AdminPage>
    </div>
  </>
)

export default AdminLayout
