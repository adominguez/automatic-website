'useClient'
import useIsMobile from '../hooks/mobile'

const CardsListSkeleton = () => {
  const isMobile = useIsMobile()
  const length = isMobile ? 4 : 6

  const loadImagesArray = new Array(parseInt(length) || 24).fill().map(() => crypto.randomUUID())

  return (
  <section className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
    {
      loadImagesArray.map((key) => (
        <div role="status" key={key} className="flex flex-col p-4 border border-gray-200 rounded-lg shadow animate-pulse md:p-6 dark:border-gray-700 lg:flex-row md:gap-4">
          <div className="flex items-center justify-center w-full h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700 lg:w-2/5">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div className="flex flex-col flex-1">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-2.5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-6"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))
    }
  </section>
  )
}

export default CardsListSkeleton
