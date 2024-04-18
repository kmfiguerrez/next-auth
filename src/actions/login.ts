"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/auth"

import LoginSchema, { TLoginSchema } from "@/schemas/login-schema"

import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes"

import { getUserByEmail } from "@/lib/db-data"
import { generateVericationToken } from "@/lib/token"
import { sendVerificationEmail } from "@/lib/mail"
import { getVerificationTokenByEmail } from "@/lib/verification-token"


export const login = async (values: TLoginSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = LoginSchema.safeParse(values)

  try {
    if (!validatedFields.success) throw new Error("Invalid fields!")
    
    const {email, password} = validatedFields.data

    // Check first if users have verified their email.
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
      throw new Error("Invalid credentials")
    }
    if (!existingUser.emailVerified) {
      /*
        Before generating verification token, check first if there's one
        existing and still not expired.
        Because the register action also generates token and sends
        verification email.
      */
      const existingToken = await getVerificationTokenByEmail(existingUser.email)

      if (existingToken) {
        const hasExpired: boolean = new Date(existingToken.expires) < new Date()
        if(!hasExpired) throw new Error("Please verify your email")
      }
      // Otherwise no token or expired, generate token and send it.
      const verificationToken = await generateVericationToken(existingUser.email)
      await sendVerificationEmail(verificationToken.email, verificationToken.token)

      throw new Error("Please verify your email")
    }

    // Otherwise the user exists and email's verified.
    // The signIn throws a CredentialsSignIn error.
    await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})

    return {success: "Loggin successful"}
  } 
  catch (error: unknown) {
    console.log("What's the error")
    if (error instanceof AuthError) {
      switch (error.type) {        
        case "CredentialsSignin": {
          throw new Error("Invalid credentials")
        }
        default:
          throw new Error("Something went wrong")
      }
    }
    // Otherwise error is Error.
    // This is required for the redirectTo to work.
    throw error
  }
  
}

