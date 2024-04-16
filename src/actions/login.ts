"use server"

import LoginSchema, { TLoginSchema } from "@/schemas/login-schema"
import { signIn } from "@/auth"

import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes"

import { AuthError } from "next-auth"


export const login = async (values: TLoginSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = LoginSchema.safeParse(values)

  try {
    if (!validatedFields.success) throw new Error("Invalid fields!")
    
    const {email, password} = validatedFields.data
    // The signIn is configured to throw an error.
    await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})
  } 
  catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials")
        default:
          throw new Error("Something went wrong")
      }
    }
    // Otherwise error is Error.
    // This is required for the redirectTo to work.
    throw error
  }






  
  return { success: "aight"}
}

