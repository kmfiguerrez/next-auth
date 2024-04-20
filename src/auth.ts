import NextAuth,  { AuthError, CredentialsSignin, type DefaultSession } from "next-auth"

import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"

import prismaDb from "./lib/prisma-db"

import LoginSchema from "./schemas/login-schema"

import { getUserByEmail, getUserById } from "./lib/db-data"

import bcrypt from "bcryptjs"

import type { UserRole } from "@prisma/client"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { getTwoFactorConfirmationByUserId } from "./lib/two-factor-confirmation"
import { boolean } from "zod"


export type TExtendedUser = DefaultSession["user"] & {
  role: UserRole
  isTwoFactorEnabled: boolean
}

declare module "next-auth" {
  interface Session {
    user: TExtendedUser
  }
}

// From auth.js doc
// declare module "next-auth" {
//   interface Session {
//     user: {
//       role: UserRole
//     } & DefaultSession["user"]
//   }
// }



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
      // if (!token.sub) throw new Error("JWT Error: No Token!")
      if (!token.sub) return token


      // Query the user role from the database.
      const existingUser = await getUserById(token.sub)
      console.log("From JWT: ", existingUser)

      // if (!existingUser) throw new Error("JWT Error: User does not exists!")
      if (!existingUser) return token

      token.id = existingUser.id
      token.role = existingUser.role 
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled    

      /*
        When session is being updated, callbacks will be ran again.
      */
      token.name = existingUser.name
      token.email = existingUser.email

      return token
    },
    async session({ session, token }) {
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

      if (session.user) {
        /*
          In order for the isTwoFactorEnabled property to be typed-checked
          See: https://authjs.dev/getting-started/typescript#module-augmentation
        */
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      /*
        This if block is used when sesesion is being updated.
      */      
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
      }           

      return session
    },
    async signIn({ user, account }) {
      /*
        If users managed to logged in using api request, then we can catch
        them here.
      */

      // Allow OAuth without email verification.
      if (account?.provider !== "credentials") return true

      // Make sure that the email has verified when using credentials.
      const existingUser = await getUserById(user.id as string)
      if (!existingUser?.emailVerified) throw new AuthError("Email confirmation is required")
      
      // Execute this block only if users chose to enalbe 2FA.
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if (!twoFactorConfirmation) throw new AuthError("Did not confirm 2FA code")
        
        // Otherwise 2FA code confirmed, delete two factor confirmation for next sign in.
        await prismaDb.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id}
        })
      }
      
      return true
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
          // if (!user || !user.password) return null
          if (!user || !user.password) throw new CredentialsSignin("error nigga")


          const passwordMatch = await bcrypt.compare(password, user.password)

          if (passwordMatch) return user
        }

        // Otherwise not success.
        // Return `null` to indicate that the credentials are invalid
        // return null
        throw new CredentialsSignin("error bitch")
      }
    })
  ],
})