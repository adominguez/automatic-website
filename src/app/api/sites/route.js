// 'use client'
import { NextResponse } from 'next/server'
import { NEXT_PUBLIC_BACK_API_URL } from '@/app/config'

export async function GET (request) {
  const res = await fetch(`${NEXT_PUBLIC_BACK_API_URL}/sites`)
  const data = await res.json()
  return NextResponse.json(data)
}
