import { NextResponse } from 'next/server'
import { AUTH_TOKEN, AUTH_AUTHENTICATED, AUTH_USER } from '@/app/constants/auth'

export async function POST (request) {
  const value = await request.json()
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
    const data = await res.json()
    // Set json response first
    const { jwt, user } = data
    const response = NextResponse.json(data, {
      status: 200,
      headers: { 'Set-Cookie': [`${AUTH_TOKEN}=${jwt}`, `${AUTH_AUTHENTICATED}=true`, `${AUTH_USER}=${JSON.stringify(user)}`] }
    })
    return response
  } catch (error) {
    return error
  }
}
