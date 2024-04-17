"use server"

import { getUserByEmail } from "@/lib/db-data"
import { getServerErrorMessage } from "@/lib/error-message"
import prismaDb from "@/lib/prisma-db"
import { generateVericationToken } from "@/lib/token"

import RegisterSchema, { type TRegisterSchema } from "@/schemas/register-schema"

import bcrypt from "bcryptjs"


export const register = async (values: TRegisterSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = RegisterSchema.safeParse(values)

  try {
    if (!validatedFields.success) {
      throw new Error("Invalid fields")
    }

    const {name, email, password} = validatedFields.data
    // Hashed the password.
    const hashedPassword = await bcrypt.hash(password, 10)

    /*
      Before creating a user make sure the email hasn't been used.
      if exists, throw an error.
    */
    const existingUser = await getUserByEmail(email)
    if (existingUser) throw new Error("Email already in use")

    /*
      Create user
      The create method throws an error: PrismaClientInitializationError
      if can't connect to db.
    */
    await prismaDb.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    
    // Send verification token.
    const verificationToken = await generateVericationToken(email)

    // Finally.
    return { success: "Confirmation email sent"}

  } 
  catch (error: unknown) {
    console.log(error)
    throw new Error(getServerErrorMessage(error))
  }  


}

