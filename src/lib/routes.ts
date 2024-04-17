/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: Array<string> = [
  "/",
  "/auth/new-verification"
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /
 * @type {string[]}
 */
export const authRoutes: Array<string> = [
  "/auth/login",
  "/auth/register"
]

/**
 * The prefix for API authentication routes
 * that start with this prefix are used for API
 * authentication purposes.
 * 
 * Prefix: /api/auth
 * 
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth"

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string ="/dashboard"