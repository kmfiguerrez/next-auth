import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prismaDb from "./lib/prisma-db"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
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
          see: https://authjs.dev/guides/extending-the-session
        */
        console.log("From auth.ts: ", credentials)
        let user = null


        if (!user) {
          throw new CredentialsSignin("User not found")
        }

        user = {name: "Tin", password: "Fat", extraInfo: "include?"}
        return user
      }
    })
  ],
})