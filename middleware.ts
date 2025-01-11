import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get the pathname of the request
  const requestPath = new URL(request.url).pathname;

  // Define protected routes
  const isAuthRoute = requestPath.startsWith("/auth");
  const isAdminRoute = requestPath.startsWith("/admin");
  const isProtectedRoute =
    requestPath.startsWith("/dashboard") ||
    requestPath.startsWith("/payments") ||
    isAdminRoute;
  // Handle authentication routes (login/signup)
  if (isAuthRoute) {
    if (session) {
      // If user is already logged in, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return response;
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (!session) {
      // If no session, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // For admin routes, check if user has admin role
    if (isAdminRoute) {
      const { data: userRole } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (userRole?.role !== "admin") {
        // If not admin, redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return response;
}

// Specify which routes should be handled by the middleware
export const config = {
  matcher: [
    // Auth routes
    "/auth/:path*",
    // Protected routes
    "/dashboard/:path*",
    "/payments/:path*",
    "/admin/:path*",
    // Public routes that don't need middleware
    "/((?!_next/static|_next/image|favicon.ico|public/.*|api/.|$).*)",
  ],
};


// import { type NextRequest } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   return await updateSession(request)
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }