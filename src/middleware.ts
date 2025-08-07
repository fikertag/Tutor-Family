import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);
  if (sessionCookie && pathname === "/") {
    return NextResponse.redirect(new URL("/tutors", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
