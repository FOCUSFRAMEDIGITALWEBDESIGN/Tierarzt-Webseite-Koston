import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const adminSessionCookie = request.cookies.get('admin_session');
  let validSession = false;

  if (adminSessionCookie?.value) {
    try {
      const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "default_fallback_secret");
      await jwtVerify(adminSessionCookie.value, secret);
      validSession = true;
    } catch (e) {
      console.log('Invalid admin session cookie', e);
    }
  }

  // Protect /api routes manually except login
  if (request.nextUrl.pathname.startsWith('/api/') && !request.nextUrl.pathname.startsWith('/api/admin/login')) {
    // Determine which API routes to protect (e.g. POST/PATCH/DELETE)
    // Only allow GET requests if not logged in, or block entirely based on requirement.
    // For now, let's protect modifying data.
    if (['POST', 'PATCH', 'DELETE', 'PUT'].includes(request.method)) {
      // Except endpoints used by public users: 
      // /api/appointments (POST for booking wizard)
      if (request.nextUrl.pathname === '/api/appointments' && request.method === 'POST') {
        return NextResponse.next();
      }
      
      if (!validSession) {
        console.warn(`Unauthorized ${request.method} request to ${request.nextUrl.pathname}`);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

// Config to run middleware only on specific paths
export const config = {
  matcher: [
    '/api/:path*'
  ],
};
