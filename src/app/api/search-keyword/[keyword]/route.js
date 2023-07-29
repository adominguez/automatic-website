import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const keyword = params.keyword;
  const res = await fetch(`http://localhost:3050/search-category-keywords?category=${keyword}`);
  const data = await res.json();
  return NextResponse.json(data);
}