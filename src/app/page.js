import { Typography } from '@/app/components/MaterialComponents'
import { LandingImage1 } from '@/app/components/Icons'
import Link from 'next/link'
export default function Home () {
  return (
    <>
      <section className="flex flex-col items-center justify-center w-full min-h-screen bg-amber-50">
        <div className="flex flex-col items-start justify-between flex-1 w-full gap-4 px-4 py-8 md:flex-row lg:max-w-5xl">
          <div className="flex flex-col flex-1 gap-10 py-14">
            <div>
              <h1 className="font-bold text-amber-600">Creación de páginas web automáticas</h1>
              <Typography color="amber" variant="h2" className="text-6xl font-bold balance text-blue-gray-800"><span className="inline-block">Crea una</span> <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-amber-700">web automática</span> que trabaje por tí.</Typography>
            </div>
            <Typography variant="lead" className="balance text-blue-gray-400">Crea páginas web <span className="line-through">automáticamente</span> <span className="automagico">🪄</span> con Inteligencia artificial y comienza a ganar dinero en internet de una forma fácil y sencila, aunque nunca hayas creado una página web y no tengas conocimiento de programación ni de SEO.</Typography>
            <div className='flex gap-4'>
              <Link href="/login" className='px-6 py-4 text-white border rounded border-amber-600 bg-amber-600'>Comenzar ahora</Link>
              <Link href="/login" className='px-6 py-4 border rounded border-amber-600 text-amber-600'>Demo</Link>
            </div>
          </div>
          <div className="flex-1">
            <div className='p-20'>
              <LandingImage1 />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-between w-full gap-4 px-4 py-8 resize-img lg:max-w-5xl">
          <p>Magna consequat dolor cupidatat culpa. Irure pariatur et est mollit nulla consequat dolor ad esse. Incididunt excepteur dolore laborum culpa qui quis non sit. Reprehenderit voluptate laboris occaecat tempor veniam exercitation veniam.</p>
          <p>Elit duis sit reprehenderit in ex consectetur eiusmod enim amet ut est. Proident eu duis tempor ea id dolore occaecat culpa qui ad esse irure mollit. Eu sunt exercitation pariatur esse sit mollit laborum dolore fugiat voluptate enim id sint. Adipisicing mollit sint amet officia commodo id pariatur cupidatat esse. Ullamco labore esse culpa excepteur do ullamco proident non do. Officia nisi labore reprehenderit dolor non mollit duis ullamco commodo et.</p>
          <p>Sit incididunt anim aliqua commodo culpa aute deserunt. Et veniam pariatur aliqua eiusmod. Excepteur laborum exercitation nisi et duis labore. Qui pariatur adipisicing laborum anim excepteur eu proident Lorem dolor fugiat Lorem aliquip do.</p>
          <p>Eiusmod occaecat occaecat aliqua reprehenderit officia et. Officia exercitation nulla in nostrud elit aliquip enim adipisicing. Elit voluptate eu laborum aute in sint nostrud elit Lorem id excepteur. Minim sunt fugiat exercitation velit occaecat velit cupidatat. Amet non id cillum commodo et ipsum cillum ullamco consequat proident in officia duis eu. Nostrud occaecat enim ullamco enim anim consectetur ullamco do deserunt. Officia est esse labore aliqua quis.</p>
          <p>Non in laborum sit proident qui anim labore in elit. Ut proident reprehenderit dolor sint nostrud reprehenderit quis nostrud laboris consequat culpa mollit fugiat Lorem. Sit aute do aliquip incididunt veniam aliquip reprehenderit. Voluptate in non id Lorem fugiat aliquip ea laboris ullamco aliqua cillum exercitation aliqua. Voluptate dolore ad voluptate laborum id laborum adipisicing aliqua.</p>
          <p>Nulla dolor nostrud in cillum ut duis ut. Aliqua qui adipisicing eiusmod est aliqua magna minim sint commodo labore cillum duis velit Lorem. In mollit non Lorem minim nulla sit proident dolore veniam sit incididunt dolore.</p>
          <p>Magna consequat dolor cupidatat culpa. Irure pariatur et est mollit nulla consequat dolor ad esse. Incididunt excepteur dolore laborum culpa qui quis non sit. Reprehenderit voluptate laboris occaecat tempor veniam exercitation veniam.</p>
          <p>Elit duis sit reprehenderit in ex consectetur eiusmod enim amet ut est. Proident eu duis tempor ea id dolore occaecat culpa qui ad esse irure mollit. Eu sunt exercitation pariatur esse sit mollit laborum dolore fugiat voluptate enim id sint. Adipisicing mollit sint amet officia commodo id pariatur cupidatat esse. Ullamco labore esse culpa excepteur do ullamco proident non do. Officia nisi labore reprehenderit dolor non mollit duis ullamco commodo et.</p>
          <p>Sit incididunt anim aliqua commodo culpa aute deserunt. Et veniam pariatur aliqua eiusmod. Excepteur laborum exercitation nisi et duis labore. Qui pariatur adipisicing laborum anim excepteur eu proident Lorem dolor fugiat Lorem aliquip do.</p>
          <p>Eiusmod occaecat occaecat aliqua reprehenderit officia et. Officia exercitation nulla in nostrud elit aliquip enim adipisicing. Elit voluptate eu laborum aute in sint nostrud elit Lorem id excepteur. Minim sunt fugiat exercitation velit occaecat velit cupidatat. Amet non id cillum commodo et ipsum cillum ullamco consequat proident in officia duis eu. Nostrud occaecat enim ullamco enim anim consectetur ullamco do deserunt. Officia est esse labore aliqua quis.</p>
          <p>Non in laborum sit proident qui anim labore in elit. Ut proident reprehenderit dolor sint nostrud reprehenderit quis nostrud laboris consequat culpa mollit fugiat Lorem. Sit aute do aliquip incididunt veniam aliquip reprehenderit. Voluptate in non id Lorem fugiat aliquip ea laboris ullamco aliqua cillum exercitation aliqua. Voluptate dolore ad voluptate laborum id laborum adipisicing aliqua.</p>
          <p>Nulla dolor nostrud in cillum ut duis ut. Aliqua qui adipisicing eiusmod est aliqua magna minim sint commodo labore cillum duis velit Lorem. In mollit non Lorem minim nulla sit proident dolore veniam sit incididunt dolore.</p>
          <p>Magna consequat dolor cupidatat culpa. Irure pariatur et est mollit nulla consequat dolor ad esse. Incididunt excepteur dolore laborum culpa qui quis non sit. Reprehenderit voluptate laboris occaecat tempor veniam exercitation veniam.</p>
          <p>Elit duis sit reprehenderit in ex consectetur eiusmod enim amet ut est. Proident eu duis tempor ea id dolore occaecat culpa qui ad esse irure mollit. Eu sunt exercitation pariatur esse sit mollit laborum dolore fugiat voluptate enim id sint. Adipisicing mollit sint amet officia commodo id pariatur cupidatat esse. Ullamco labore esse culpa excepteur do ullamco proident non do. Officia nisi labore reprehenderit dolor non mollit duis ullamco commodo et.</p>
          <p>Sit incididunt anim aliqua commodo culpa aute deserunt. Et veniam pariatur aliqua eiusmod. Excepteur laborum exercitation nisi et duis labore. Qui pariatur adipisicing laborum anim excepteur eu proident Lorem dolor fugiat Lorem aliquip do.</p>
          <p>Eiusmod occaecat occaecat aliqua reprehenderit officia et. Officia exercitation nulla in nostrud elit aliquip enim adipisicing. Elit voluptate eu laborum aute in sint nostrud elit Lorem id excepteur. Minim sunt fugiat exercitation velit occaecat velit cupidatat. Amet non id cillum commodo et ipsum cillum ullamco consequat proident in officia duis eu. Nostrud occaecat enim ullamco enim anim consectetur ullamco do deserunt. Officia est esse labore aliqua quis.</p>
          <p>Non in laborum sit proident qui anim labore in elit. Ut proident reprehenderit dolor sint nostrud reprehenderit quis nostrud laboris consequat culpa mollit fugiat Lorem. Sit aute do aliquip incididunt veniam aliquip reprehenderit. Voluptate in non id Lorem fugiat aliquip ea laboris ullamco aliqua cillum exercitation aliqua. Voluptate dolore ad voluptate laborum id laborum adipisicing aliqua.</p>
          <p>Nulla dolor nostrud in cillum ut duis ut. Aliqua qui adipisicing eiusmod est aliqua magna minim sint commodo labore cillum duis velit Lorem. In mollit non Lorem minim nulla sit proident dolore veniam sit incididunt dolore.</p>
          <p>Magna consequat dolor cupidatat culpa. Irure pariatur et est mollit nulla consequat dolor ad esse. Incididunt excepteur dolore laborum culpa qui quis non sit. Reprehenderit voluptate laboris occaecat tempor veniam exercitation veniam.</p>
          <p>Elit duis sit reprehenderit in ex consectetur eiusmod enim amet ut est. Proident eu duis tempor ea id dolore occaecat culpa qui ad esse irure mollit. Eu sunt exercitation pariatur esse sit mollit laborum dolore fugiat voluptate enim id sint. Adipisicing mollit sint amet officia commodo id pariatur cupidatat esse. Ullamco labore esse culpa excepteur do ullamco proident non do. Officia nisi labore reprehenderit dolor non mollit duis ullamco commodo et.</p>
          <p>Sit incididunt anim aliqua commodo culpa aute deserunt. Et veniam pariatur aliqua eiusmod. Excepteur laborum exercitation nisi et duis labore. Qui pariatur adipisicing laborum anim excepteur eu proident Lorem dolor fugiat Lorem aliquip do.</p>
          <p>Eiusmod occaecat occaecat aliqua reprehenderit officia et. Officia exercitation nulla in nostrud elit aliquip enim adipisicing. Elit voluptate eu laborum aute in sint nostrud elit Lorem id excepteur. Minim sunt fugiat exercitation velit occaecat velit cupidatat. Amet non id cillum commodo et ipsum cillum ullamco consequat proident in officia duis eu. Nostrud occaecat enim ullamco enim anim consectetur ullamco do deserunt. Officia est esse labore aliqua quis.</p>
          <p>Non in laborum sit proident qui anim labore in elit. Ut proident reprehenderit dolor sint nostrud reprehenderit quis nostrud laboris consequat culpa mollit fugiat Lorem. Sit aute do aliquip incididunt veniam aliquip reprehenderit. Voluptate in non id Lorem fugiat aliquip ea laboris ullamco aliqua cillum exercitation aliqua. Voluptate dolore ad voluptate laborum id laborum adipisicing aliqua.</p>
          <p>Nulla dolor nostrud in cillum ut duis ut. Aliqua qui adipisicing eiusmod est aliqua magna minim sint commodo labore cillum duis velit Lorem. In mollit non Lorem minim nulla sit proident dolore veniam sit incididunt dolore.</p>
        </div>
      </section>
    </>
  )
}
