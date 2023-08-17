// 'use client'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_API_URL}/sites`);
  const data = await res.json();
  return NextResponse.json(data);
}