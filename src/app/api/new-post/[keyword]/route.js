import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const keyword = params.keyword;
  console.log({keyword})
  const res = await fetch(`${process.env.API_URL}/new-post?keyword=${keyword}`);
  const data = await res.json();
  console.log(data)
  return NextResponse.json(data);
}