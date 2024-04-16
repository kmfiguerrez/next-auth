"use server"

import LoginSchema, { TLoginSchema } from "@/schemas/login-schema"
import { signIn } from "@/auth"

import { CredentialsSignin } from "next-auth"


export const login = async (values: TLoginSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = LoginSchema.safeParse(values)

  try {
    if (!validatedFields.success) throw new Error("Invalid fields!")
    
    // This promise is for loading testing only
    await new Promise((resolve, reject) => {
      setTimeout(() => resolve("success"), 5000)
    })      

    const {email, password} = validatedFields.data
    // The signIn is configured to throw an error.
    await signIn("credentials", {email, password, redirectTo: "/"})
  } 
  catch (error: unknown) {
    if (error instanceof CredentialsSignin) {
      console.log("Inside login action: ", error.name)
      throw new Error("Invalid credentials")
    }
  }






  
  return { success: "aight"}
}

