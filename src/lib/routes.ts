/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * Both logged in or not can access this.
 * 
 * @type {string[]}
 */
export const publicRoutes: Array<string> = [
  "/",
  "/auth/verification",
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /
 * Only logged out users can access these.
 * 
 * @type {string[]}
 */
export const authRoutes: Array<string> = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password"
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
export const DEFAULT_LOGIN_REDIRECT: string ="/settings"