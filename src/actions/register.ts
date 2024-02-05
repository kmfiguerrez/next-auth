"use server"

import RegisterSchema, { type TRegisterForm } from "@/schemas/register-form"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"



const register = async (values: TRegisterForm) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  // Extract fields.
  const { name, email, password } = validatedFields.data

  // Hash the password.
  const hashedPassword = await bcrypt.hash(password, 10)

  // Check if email exists.
  const existingUser = await db.user.findUnique({
    where: {
      email: validatedFields.data.email
    }
  })
  if (existingUser) return { error: "Email already in use!"}

  // Otherwise email doesn't exists.
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  // Send verification token email.

  return { success: "Email sent" }
}


export { register }