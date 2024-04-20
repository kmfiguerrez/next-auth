import { auth } from "@/auth"

/**
 * This function can be run on in server components, server actions
 * and api routes.
 * 
 * @returns A user object or undefined.
 */
export const currentUser = async () => {
  const session = await auth()

  return session?.user
}


/**
 * This function can be run on in server components, server actions
 * and api routes.
 * 
 * @returns Enum of ADMIN and USER.
 */
export const currentRole = async () => {
  const session = await auth()

  return session?.user.role
}