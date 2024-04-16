"use server"

import prismaDb from "@/lib/prisma-db"
import RegisterSchema, { type TRegisterSchema } from "@/schemas/register-schema"


export const register = async (values: TRegisterSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    throw new Error("Invalid fields")
  }

  const {name, email, password} = validatedFields.data

  // Create user
  await prismaDb.user.create({
    data: {
      name,
      email,
      password
    }
  })

  // This promise is for loading testing only
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => resolve("success"), 5000)
  // })

  
  return { success: "User created"}
}

