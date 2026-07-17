import { NextResponse, type NextRequest } from "next/server"
import { ADMIN_SESSION_COOKIE, isValidSession } from "@/lib/admin-auth"

const isAdminPath = (pathname: string) => pathname.startsWith("/admin") || pathname.startsWith("/api/admin")

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isAdminPath(pathname)) {
    return NextResponse.next()
  }

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/session") ||
    pathname.startsWith("/api/admin/logout")
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value ?? null
  const isValid = await isValidSession(token)

  if (!isValid) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const loginUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
