"use server"

import { getServerErrorMessage } from "@/lib/error-message"
import prismaDb from "@/lib/prisma-db"


import RegisterSchema, { type TRegisterSchema } from "@/schemas/register-schema"


export const register = async (values: TRegisterSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = RegisterSchema.safeParse(values)

  try {
    if (!validatedFields.success) {
      throw new Error("Invalid fields")
    }

    const {name, email, password} = validatedFields.data

    // Create user
    // Create method throws an error: PrismaClientInitializationError
    // if can't connect to db.
    await prismaDb.user.create({
      data: {
        name,
        email,
        password
      }
    })

  } 
  catch (error: unknown) {
    console.log(error)
    throw new Error(getServerErrorMessage(error))
  }  

  // This promise is for loading testing only
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => resolve("success"), 5000)
  // })

  
  return { success: "User created"}
}

