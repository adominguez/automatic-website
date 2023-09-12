import { NextResponse } from 'next/server'

export async function GET (request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API_URL}/new-post?keyword=${keyword}`)
  const data = await res.json()
  console.log(data)
  return NextResponse.json(data)
}
