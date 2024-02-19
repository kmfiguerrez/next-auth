"use server"

import LoginSchema from "@/schemas/login-schema"
import { type TRegisterSchema } from "@/schemas/register-schema"

export const register = async (values: TRegisterSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!"}
  }

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve("success"), 5000)
  })
  
  console.log(values)
  
  return { success: "aight"}
}

