import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token }) {
      // console.log('jwt', token)
      return token
    },
    async session({ session, token }) {      
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      console.log({sessionToken: session})
      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig
})