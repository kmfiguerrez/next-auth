import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"

import LoginSchema from "./schemas/login-form"
import { getUserByEmail } from "./data/user"
import bcrypt from "bcryptjs"



export default {
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log("credentials: ", credentials)
        const validatedFields = LoginSchema.safeParse(credentials)
        
        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          // console.log("user: ", user)
          // !user.password is when google or other providers is used.
          if (!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)          
          if (passwordsMatch) return user
        }

        return null
      }
    })
  ],
} satisfies NextAuthConfig