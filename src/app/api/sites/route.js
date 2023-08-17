// 'use client'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const res = await fetch(`${process.env.BACK_API_URL}/sites`);
  const data = await res.json();
  return NextResponse.json(data);
}