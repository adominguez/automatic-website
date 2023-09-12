import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { BEARER, AUTH_TOKEN, AUTH_USER } from '@/app/constants/auth'

export async function GET (request) {
  const cookieStore = cookies()
  const token = cookieStore.get(AUTH_TOKEN)
  const { id } = JSON.parse(cookieStore.get(AUTH_USER).value)
  if (token?.value && id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API_URL}/sites-by-user?userId=${id}`, {
      headers: { Authorization: `${BEARER} ${token.value}` }
    })
    const data = await res.json()
    return NextResponse.json(data)
  }
}
