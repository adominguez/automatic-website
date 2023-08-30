import Header from '@/app/components/WebHeader'

const Page = ({ children }) => {
  return (
    <main>
      <Header/>
      {children}
    </main>
  )
}

export default Page
