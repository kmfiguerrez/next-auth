"use server"

import { getUserByEmail } from "@/lib/db-data"
import { getServerErrorMessage } from "@/lib/error-message"
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token"
import prismaDb from "@/lib/prisma-db"

import NewPasswordSchema, { TNewPasswordSchema } from "@/schemas/new-password-schema"

import bcrypt from "bcryptjs"


export const newPassword = async (values: TNewPasswordSchema, token: string | null) => {
  try {
    if (!token) throw new Error("Missing token")

    const validatedFields = NewPasswordSchema.safeParse(values)

    if (!validatedFields.success) throw new Error("Invalid password format")

    const { password, confirmPassword } = validatedFields.data

    // Check if password and confirmPassword are not the same.
    if (password !== confirmPassword) throw new Error("Passwords are not the same")

    const existingToken = await getPasswordResetTokenByToken(token)
    if (!existingToken) throw new Error("Invalid token")

    const hasExpired: boolean = new Date(existingToken.expires) < new Date()
    if (hasExpired) throw new Error("Token has expired")

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) throw new Error("Email does not exists")

    /*
      Hashed the password and update the database.
      Database queries throw an error: PrismaClientInitializationError
      if can't connect to db.
    */  
    const hashedPassword = await bcrypt.hash(password, 10)
    await prismaDb.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword }
    })

    await prismaDb.passwordResetToken.delete({
      where: { id: existingToken.id }
    })

    // Finally
    return { success: "Password updated"}
  } 
  catch (error:unknown) {
    throw new Error(getServerErrorMessage(error))
  }
}