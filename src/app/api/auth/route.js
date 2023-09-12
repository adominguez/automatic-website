import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_TOKEN, AUTH_USER, AUTH_AUTHENTICATED } from '@/app/constants/auth'

export async function GET (request) {
  const cookieStore = cookies()
  const token = cookieStore.get(AUTH_TOKEN)
  const user = cookieStore.get(AUTH_USER)
  const authenticated = cookieStore.get(AUTH_AUTHENTICATED)
  return NextResponse.json({ token, user, authenticated })
}
