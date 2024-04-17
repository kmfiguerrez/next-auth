"use server"

import LoginSchema, { TLoginSchema } from "@/schemas/login-schema"
import { signIn } from "@/auth"

import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes"

import { AuthError } from "next-auth"
import { getUserByEmail } from "@/lib/db-data"
import { generateVericationToken } from "@/lib/token"


export const login = async (values: TLoginSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = LoginSchema.safeParse(values)

  try {
    if (!validatedFields.success) throw new Error("Invalid fields!")
    
    const {email, password} = validatedFields.data

    // Check first if users have verified their email.
    // const existingUser = await getUserByEmail(email)
    // if (!existingUser || !existingUser.email || !existingUser.password) {
    //   throw new Error("Invalid credentials")
    // }
    // if (!existingUser.emailVerified) {
    //   const verificationToken = await generateVericationToken(existingUser.email)
    //   return { success: "Confirmation email sent"}
    // }


    // The signIn throws a CredentialsSignIn error.
    await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})

    return {success: "cool"}
  } 
  catch (error: unknown) {
    console.log("What's the error")
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {        
        case "CredentialsSignin": {
          throw new Error("Invalid credentials or Email has to be verified")
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

