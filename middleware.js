// middleware.ts  (place at project root OR src/middleware.ts if you use src/)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard/:path*",
  "/journal/:path*",
  "/collection/:path*",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // protect only our sensitive routes
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // allow everything else to continue (including root /)
  return NextResponse.next();
});

export const config = {
  // include `/` (root) because SSR on "/" was calling auth()
  matcher: [
    "/",                    // ensure root is covered so auth() can be detected
    "/journal/:path*",
    "/dashboard/:path*",
    "/collection/:path*",
    "/api/auth/:path*",     // optional: if you have auth-related API routes
  ],
};

