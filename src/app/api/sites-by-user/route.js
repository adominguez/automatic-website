import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { BEARER } from '@/app/constants/auth'

export async function GET (request) {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')
  const userId = cookieStore.get('user')
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API_URL}/sites-by-user?userId=${userId.value}`, {
    headers: { Authorization: `${BEARER} ${token.value}` }
  })
  const data = await res.json()
  return NextResponse.json(data)
}
