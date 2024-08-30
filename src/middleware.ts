// middleware.ts
import { NextRequest, NextResponse } from 'next/server';


// List of protected routes
const protectedRoutes = ['/','/users', '/users/:id'];

export async function middleware(req: NextRequest) {
  console.log("in middleware ");
  // Check for the token in cookies

  const cookietoken = req.cookies.get('token'); 
  
  const token = cookietoken?.value;
  console.log("in middleware cookietoken",cookietoken,token);

  // Check if the request URL matches any protected routes
  const isProtected = protectedRoutes.some((route) => {
    // Handle dynamic routes like /users/[id]
    if (route.includes(':')) {
      const dynamicRoutePattern = new RegExp(
        `^${route.replace(':id', '[^/]+')}$`
      );
      return dynamicRoutePattern.test(req.nextUrl.pathname);
    }
    return route === req.nextUrl.pathname;
  });

  let verifiedToken = token;
  console.log('isProtected',isProtected,token,req.nextUrl.pathname)
  if(isProtected) {
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
      // return NextResponse.json({ message: 'Missing or invalid token' });
    } 
    
  
    //verify the token using jwt token
    // verifiedToken = await jwtVerify(token, SECRET_KEY);
  
    if (!verifiedToken) {
      return NextResponse.redirect(new URL('/login', req.url));
      // return NextResponse.json({ message: 'Invalid or expired token' });
    }
  
  

  }

  // If the token is present and user is trying to access a protected route, allow access
  if (verifiedToken && isProtected) {
    return NextResponse.next();
  }

  // If no token and trying to access a protected route, redirect to login
  if (!verifiedToken && isProtected) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If token is present and user is on login page, redirect to dashboard
  if (verifiedToken && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Default behavior: continue request
  return NextResponse.next();
}

// Middleware applies to all routes
export const config = {
  matcher: ['/','/users','/users/:path*','/login'], // Add other protected routes if needed
};
