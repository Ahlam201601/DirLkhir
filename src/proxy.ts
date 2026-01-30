import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import {
  apiAuthPrefix,
  authRoutes,
  defaultLoginRedirect,
  protectedRoutes,
  publicRoutes,
} from "./routes";

export async function proxy(request: NextRequest) {
  const session = getSessionCookie(request);

  const isApiAuth = request.nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  const isAuthRoute = () => {
    return authRoutes.some((path) => request.nextUrl.pathname.startsWith(path));
  };

  if (isApiAuth) {
    return NextResponse.next();
  }

  if (isAuthRoute()) {
    if (session) {
      return NextResponse.redirect(
        new URL(defaultLoginRedirect, request.url),
      );
    }
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
