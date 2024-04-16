import { auth as middleware } from "./auth"

import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  apiAuthPrefix,
  publicRoutes
} from "@/lib/routes"



export default middleware((req) => {
  const isLoggedIn = !!req.auth
  const requestedRoutes = req.nextUrl.pathname
  console.log("From middleware.ts: ", req.auth)
  console.log('Requested Route: ', requestedRoutes)

  const isApiAuthRoute: boolean = req.nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute: boolean = publicRoutes.includes(requestedRoutes)
  const isAuthRoute = authRoutes.includes(requestedRoutes)

  // Always allows routes for authenticaiton purposes.
  if (isApiAuthRoute) return 

  // Allow to access register and login routes if not yet logged in.
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
    }
    // Otherwise not logged in.
    return
  }

  /*
    If not logged in and requested routes are not public then redirect
    the user.
  */
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", req.nextUrl))
  }
})




export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ]
};