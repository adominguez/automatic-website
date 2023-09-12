'use client'
import AdminNavigator from '@/app/components/AdminNavigator'
import AdminPage from '@/app/components/AdminPage'

const AdminLayout = ({ children }) => {
  return (
  <>
    <div className='flex justify-between w-screen h-screen overflow-hidden bg-gradient-to-b from-blue-gray-100 to-blue-gray-200'>
      <AdminNavigator />
      <AdminPage>
        {children}
      </AdminPage>
    </div>
  </>
  )
}

export default AdminLayout
