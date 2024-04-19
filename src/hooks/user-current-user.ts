import { useSession } from "next-auth/react"

/**
 * This custom hook is used in client components only.
 * 
 * @returns A user object.
 */
export const useCurrentUser = () => {
  const session = useSession()

  return session.data?.user
}