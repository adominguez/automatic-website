import { NextResponse } from 'next/server'
import { NEXT_PUBLIC_BACK_API_URL } from '@/app/config'

export async function GET (request, { params }) {
  const keyword = params.keyword
  const res = await fetch(`${NEXT_PUBLIC_BACK_API_URL}/search-category-keywords?category=${keyword}`)
  const data = await res.json()
  return NextResponse.json(data)
}
