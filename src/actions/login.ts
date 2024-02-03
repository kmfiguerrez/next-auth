"use server"

import LoginSchema, { type TLoginForm } from "@/schemas/login-form"

const login = async (values: TLoginForm) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }
  
  return { success: "Email sent" }
}


export { login }