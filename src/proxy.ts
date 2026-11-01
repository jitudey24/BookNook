import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Client-side session checks are only optimistic — proxy gives us a real
// redirect for unauthenticated users before the page even renders.
const PRIVATE_ROUTES = [
  "/add-book",
  "/my-books",
  "/my-borrows",
  "/profile",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivate = PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const hasSession = !!getSessionCookie(request);

  // Not logged in -> force signin
  if (isPrivate && !hasSession) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Already logged in -> keep users away from auth pages
  if ((pathname === "/signin" || pathname === "/signup") && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
    "/signin",
    "/signup",
  ],
};
