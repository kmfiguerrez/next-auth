"use server"

import { TLoginSchema } from "@/schemas/login-schema"
import RegisterSchema from "@/schemas/register-schema"


export const login = async (values: TLoginSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = RegisterSchema.safeParse(values)
  const status = true

  // if (!validatedFields.success) {
  //   return { error: "Invalid fields!" }
  // }

  // This promise is for loading testing only
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve("success"), 5000)
  })

  if (!status) {
    // return { error: "Invalid fields!" }
    throw new Error("Invalid fields!")
  }
  
  console.log(values)
  
  return { success: "aight"}
}

