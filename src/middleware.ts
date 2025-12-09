import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Rutas públicas
  const publicRoutes = ["/login", "/register", "/verify", "/"];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  // Rutas protegidas generales
  const protectedRoutes = [
    "/agent-dashboard",
    "/client-dashboard",
    "/tickets",
  ];

  // Rutas solo para agentes
  const agentOnlyRoutes = [
    "/agent-dashboard",
    "/tickets/manage",
    "/tickets/admin",
  ];

  // Si ya está logueado y viene a login:
  if (pathname === "/login" && token) {
    if (token.role === "agent") {
      return NextResponse.redirect(new URL("/agent-dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/client-dashboard", req.url));
  }

  // Si intenta entrar a una ruta protegida SIN token:
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Si intenta entrar a una ruta SOLO PARA AGENTES:
  if (agentOnlyRoutes.some((route) => pathname.startsWith(route))) {
    if (!token || token.role !== "agent") {
      return NextResponse.redirect(new URL("/client-dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/agent-dashboard/:path*",
    "/client-dashboard/:path*",
    "/tickets/:path*",
  ],
};
