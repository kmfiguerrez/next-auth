"use server"

import { type TRegisterSchema } from "@/schemas/register-schema"

export const register = async (values: TRegisterSchema) => {

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve("success"), 5000)
  })
  
  console.log(values)
  
  return { success: "aight"}
}

