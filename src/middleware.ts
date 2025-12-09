import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/verify", "/"];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  // Protected routes that require authentication (any role)
  const protectedRoutes = [
    "/agentDashboard",
    "/clientDashboard",
    "/tickets",
  ];

  // Routes that only agents can access
  const agentOnlyRoutes = [
    "/agentDashboard",
    "/tickets/manage",
    "/tickets/admin",
  ];

  // If user is already logged in and tries to access login page, redirect to appropriate dashboard
  if (pathname === "/login" && token) {
    if (token.role === "agent") {
      return NextResponse.redirect(new URL("/agentDashboard", req.url));
    }
    return NextResponse.redirect(new URL("/clientDashboard", req.url));
  }

  // If trying to access a protected route without token, redirect to login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If trying to access an agent-only route without agent role, redirect to client dashboard
  if (agentOnlyRoutes.some((route) => pathname.startsWith(route))) {
    if (!token || token.role !== "agent") {
      return NextResponse.redirect(new URL("/clientDashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/agentDashboard/:path*",
    "/clientDashboard/:path*",
    "/tickets/:path*",
  ],
};
