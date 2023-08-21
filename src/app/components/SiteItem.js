'use client'
import {
  Card, CardBody, CardHeader, Typography, Avatar
} from '@/app/components/MaterialComponents'
const SiteItem = ({ attributes }) => {
  const { domain, name } = attributes || {}
  return (<Card
    shadow={false}
    className="relative grid h-60 w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
  >
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
    >
      <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
    </CardHeader>
    <CardBody className='relative px-6 py-6 md:px-12'>
      <Typography
        variant="h2"
        color="white"
        className="mb-6 font-medium leading-[1.5]"
      >
        {name}
      </Typography>
      <Typography variant="h5" className="mb-4 text-gray-400">
        {domain}
      </Typography>
      <Avatar
        size="xl"
        variant="circular"
        alt="tania andrew"
        className="border-2 border-white"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
    </CardBody>
    {/* <CardBody className="relative px-6 py-14 md:px-12">
      <Typography
        variant="h2"
        color="white"
        className="mb-6 font-medium leading-[1.5]"
      >
        {domain}
      </Typography>
      <Typography variant="h5" className="mb-4 text-gray-400">
        {name}
      </Typography>
      <Avatar
        size="xl"
        variant="circular"
        alt="tania andrew"
        className="border-2 border-white"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
    </CardBody> */}
  </Card>)
}

export default SiteItem