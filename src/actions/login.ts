"use server"

import { TLoginSchema } from "@/schemas/login-schema"


export const login = async (values: TLoginSchema) => {

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve("success"), 5000)
  })
  
  console.log(values)
  
  return { success: "aight"}
}

