import { NextResponse } from 'next/server'

export async function POST (request) {
  const value = await request.json()
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
  const response = NextResponse.json(
    data
  )

  response.cookies.set({
    name: 'jwt',
    value: jwt
  })

  response.cookies.set({
    name: 'user',
    value: user.id
  })

  return response
}
