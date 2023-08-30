'use client'
import { Card, Typography, Button, CardHeader, CardBody, SpeedDial, SpeedDialHandler, SpeedDialContent, IconButton } from '@/app/components/MaterialComponents'
import { EllipsisHorizontalIcon } from '@/app/components/Icons'
import {
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

const PostItem = () => (
  <Card className="flex-col w-full max-w-[48rem] lg:flex-row relative">
    <CardHeader className="w-full m-0 rounded-b-none lg:rounded-r-none lg:rounded-l-xl lg:w-2/5 shrink-0">
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
        alt="image"
        className="object-cover w-full h-full"
      />
    </CardHeader>
    <CardBody>
      <div className="absolute top-2 right-2">
        <SpeedDial placement="bottom">
          <SpeedDialHandler>
            <IconButton size="sm" color="blue-gray" className="rounded-full">
              <EllipsisHorizontalIcon className="w-3 h-3 transition-transform group-hover:rotate-90" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <IconButton size="sm" color="white" className="rounded-full">
              <PencilIcon className="w-4 h-4" />
            </IconButton>
            <IconButton size="sm" color="red" className="rounded-full">
              <TrashIcon className="w-4 h-4" />
            </IconButton>
          </SpeedDialContent>
        </SpeedDial>
      </div>
      <Typography variant="h6" color="blue" className="mb-4 uppercase">startups</Typography>
      <Typography variant="h3" color="blue-gray" className="mb-2 text-lg">
        Lyft launching cross-platform service this week
      </Typography>
      <Typography color="gray" className="mb-8 font-normal">
        Like so many organizations these days, Autodesk is a company in transition.
      </Typography>
      <a href="#" className="inline-block">
        <Button variant="text" className="flex items-center gap-2">
          Learn More
        </Button>
      </a>
    </CardBody>
  </Card>
)

export default PostItem
