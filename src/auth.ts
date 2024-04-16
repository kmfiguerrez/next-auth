import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"

import prismaDb from "./lib/prisma-db"

import LoginSchema from "./schemas/login-schema"

import { getUserByEmail } from "./lib/db-data"

import bcrypt from "bcryptjs"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaDb),
  session: {strategy: "jwt"},
  providers: [
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
        let user = null
        
        /*
          Verify credentials that are coming from any applications that
          can send API request.
          See: https://authjs.dev/getting-started/authentication/credentials#verifying-data-with-zod
        */
        const validatedCredentials = LoginSchema.safeParse(credentials)
        console.log(validatedCredentials.success)

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