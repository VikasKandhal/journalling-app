// middleware.ts  (place at project root OR src/middleware.ts)
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

  // everything else continues (including sign-up / sign-in)
  return NextResponse.next();
});

// IMPORTANT: Include routes that call auth() during SSR (/, /sign-up, /sign-in, etc.)
export const config = {
  matcher: [
    "/",                     // include root if root calls auth()
    "/sign-in",
    "/sign-up",
    "/journal/:path*",
    "/dashboard/:path*",
    "/collection/:path*",
    "/api/auth/:path*",      // if you have auth API routes
  ],
};
