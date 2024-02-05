import { auth } from "./auth"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from "@/routes"

const { auth: middleware } = NextAuth(authConfig)


export default auth(req => {
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)

  if (isApiAuthRoute) return null

  if (isAuthRoute) {    
    if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
        
    return null
  }

  if (!isLoggedIn && !isPublicRoute)  return Response.redirect(new URL("/auth/login", req.nextUrl))

  return null
})



// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], from auth
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"], // from clerk
  }