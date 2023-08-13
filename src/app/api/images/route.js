// 'use client'
// import { useState } from 'react'
import { NextResponse } from 'next/server'

export async function GET(request) {
  // const [nextCursor, setNextCursor] = useState('')
  console.log(process.env.API_URL)
  // const res = await fetch(`${process.env.API_URL}/getimages?max_results=10${nextCursor ? `next_cursor=${nextCursor}` : ''}`);
  const res = await fetch(`${process.env.API_URL}/getimages?max_results=12`);
  const data = await res.json();
  return NextResponse.json(data);
}