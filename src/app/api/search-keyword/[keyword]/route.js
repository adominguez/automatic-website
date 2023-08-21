import { NextResponse } from 'next/server'

export async function GET (request, { params }) {
  const keyword = params.keyword
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API_URL}/search-category-keywords?category=${keyword}`)
  const data = await res.json()
  return NextResponse.json(data)
}
