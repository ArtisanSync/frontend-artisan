import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

function isTokenValid(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export default function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isValidToken = token && isTokenValid(token);

  const protectedRoutes = ["/admin"];
  const authRoutes = ["/sync"];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isValidToken) {
    return NextResponse.redirect(new URL("/sync", request.url));
  }

  if (isAuthRoute && isValidToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/sync"],
};
