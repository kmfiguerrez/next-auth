import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"

// enum UserRole {"ADMIN", "USER"}

// declare module "next-auth" {
//   interface User {
//     /** The user role. */
//     role: UserRole
//   }
// }

// The signIn and signOut can only be used on server components and
// actions. If want to use on client components, use signIn and
// signOut from next-auth/react.
export const {
  handlers: { GET, POST },
  auth,
  signIn,  
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token }) {
      console.log('jwt', token)
      // If logged out.
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      token.role = existingUser.role

      return token
    },
    async session({ session, token }) {      
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }
      console.log({sessionToken: session})
      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig
})