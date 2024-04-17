import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"

import prismaDb from "./lib/prisma-db"

import LoginSchema from "./schemas/login-schema"

import { getUserByEmail, getUserById } from "./lib/db-data"

import bcrypt from "bcryptjs"

import type { UserRole } from "@prisma/client"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

 

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
    
  }
}



export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    async linkAccount({ user }) {
      /*
        Verify user's email when OAuth is used to create user.
      */
      await prismaDb.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      /*
        The shape of the user is defined in the prisma schema.
        But not every field is available so we have to query the db.
      */
      if (user) { // User is available during sign-in
        console.log("user: ", user)
        token.id = user.id

        // Query the user role from the database.
        const existingUser = await getUserById(user.id as string)
        token.role = existingUser?.role as UserRole
      }
      return token
    },
    async session({ session, token, user }) {
      // Expose the user id from the session which is disabled by default
      if (token.id && session.user) {
        session.user.id = token.id as string
      }

      if (token.role && session.user) {
        /*
          In order for the role property to be typed-checked
          See: https://authjs.dev/getting-started/typescript#module-augmentation
        */
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
  adapter: PrismaAdapter(prismaDb),
  session: {strategy: "jwt"},
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        /*
          By default this authorize method will only return the
          following fields: name, email, and image for the User object
          in the Session object.
          See: https://authjs.dev/guides/extending-the-session
        */
        console.log("From auth.ts: ", credentials)
        
        /*
          Verify credentials that are coming from any applications that
          can send API request.
          See: https://authjs.dev/getting-started/authentication/credentials#verifying-data-with-zod
        */
        const validatedCredentials = LoginSchema.safeParse(credentials)

        if (validatedCredentials.success) {
          const {email, password} = validatedCredentials.data

          const user = await getUserByEmail(email)
          /*
            The right hand side expression: !user.password, happens when
            the OAuth is used.
          */
          if (!user || !user.password) return null

          const passwordMatch = await bcrypt.compare(password, user.password)

          if (passwordMatch) return user
        }

        // Otherwise not success.
        // Return `null` to indicate that the credentials are invalid
        return null

      }
    })
  ],
})