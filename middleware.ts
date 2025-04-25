import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Create a response object that we'll modify
  const res = NextResponse.next();

  try {
    // Create the Supabase client
    const supabase = createMiddlewareClient({ req: request, res });

    // Refresh session if expired
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Define public paths that don't require authentication
    const isPublicPath = request.nextUrl.pathname === "/admin/login";

    if (!session && !isPublicPath) {
      // If there's no session and trying to access protected route, redirect to login
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      return NextResponse.redirect(redirectUrl);
    }

    if (session && isPublicPath) {
      // If there's a session and trying to access login page, redirect to dashboard
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/dashboard";
      return NextResponse.redirect(redirectUrl);
    }

    return res;
  } catch (e) {
    // If there's an error, allow the request to continue
    // This prevents infinite loops if something goes wrong
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
