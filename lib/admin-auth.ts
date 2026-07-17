import type { NextRequest } from "next/server"

export const ADMIN_SESSION_COOKIE = "admin_session"
const ADMIN_SESSION_TOKEN = "admin-session-token"

export const getAdminCredentials = () => {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "Ghost006*",
  }
}

export const createSessionToken = async () => {
  return ADMIN_SESSION_TOKEN
}

export const isValidSession = async (token?: string | null) => {
  if (!token) return false
  return token === ADMIN_SESSION_TOKEN
}

export const getSessionFromRequest = (request: NextRequest) => {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value ?? null
}
