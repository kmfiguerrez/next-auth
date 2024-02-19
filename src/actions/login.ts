"use server"

import { TLoginSchema } from "@/schemas/login-schema"
import RegisterSchema from "@/schemas/register-schema"


export const login = async (values: TLoginSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve("success"), 5000)
  })
  
  console.log(values)
  
  return { success: "aight"}
}

