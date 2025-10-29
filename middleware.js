// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard/:path*",
  "/journal/:path*",
  "/collection/:path*",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  // **VERY NARROW** matcher — only run middleware for protected routes and auth API
  matcher: [
    "/journal/:path*",
    "/dashboard/:path*",
    "/collection/:path*",
    "/api/auth/:path*", // if you have auth API routes that need Clerk
  ],
};
