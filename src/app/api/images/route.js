// 'use client'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const maxResults = searchParams.get('max_results')
  const nextCursor = searchParams.get('next_cursor')
  const res = await fetch(`${process.env.API_URL}/getimages?max_results=${maxResults || '24'}${nextCursor ? `&next_cursor=${nextCursor}` : ''}`);
  const data = await res.json();
  return NextResponse.json(data);
}