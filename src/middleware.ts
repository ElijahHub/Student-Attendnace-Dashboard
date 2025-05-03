import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  const userRole = token?.role.toLowerCase();

  if (isAuth && userRole !== "admin")
    return NextResponse.redirect(new URL("/unauthorized", req.url));

  if (isAuthPage && isAuth && userRole === "admin")
    return NextResponse.redirect(new URL("/", req.url));

  if (!isAuth && !isAuthPage)
    return NextResponse.redirect(new URL("/auth/signin", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
