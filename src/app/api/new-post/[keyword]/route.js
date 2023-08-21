import { NextResponse } from 'next/server'
import { NEXT_PUBLIC_BACK_API_URL } from '@/app/config'

export async function GET (request, { params }) {
  const keyword = params.keyword
  console.log({ keyword })
  const res = await fetch(`${NEXT_PUBLIC_BACK_API_URL}/new-post?keyword=${keyword}`)
  const data = await res.json()
  console.log(data)
  return NextResponse.json(data)
}
