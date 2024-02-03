"use server"

import RegisterSchema, { type TRegisterForm } from "@/schemas/register-form"

const register = async (values: TRegisterForm) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }
  
  return { success: "Email sent" }
}


export { register }