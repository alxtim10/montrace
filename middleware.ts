// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Example auth check
export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  // Optional: add token or user data to request headers or cookies
  return NextResponse.next()
}

export const config = {
    matcher: [
      '/api/protected/:path*'
    ],
  }
