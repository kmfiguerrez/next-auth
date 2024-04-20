"use server"

import { getUserByEmail, getUserById } from "@/lib/db-data"
import { currentUser } from "@/lib/user-auth"
import prismaDb from "@/lib/prisma-db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVericationToken } from "@/lib/token"

import { TSettingsSchema } from "@/schemas/settings-schema"

import bcrypt from "bcryptjs"



export const settings = async (values: TSettingsSchema) => {
  const user = await currentUser()

  if (!user) throw new Error("Unauthorized")
  
  // Verify that user actually exists in the db and not just some leftover session.
  const dbUser = await getUserById(user.id as string)

  if (!dbUser) throw new Error("Unauthorized")

  // Check if user has logged in using OAuth.
  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  /*
    If email is being changed.
    Only send email verification if current email is not equal to
    previous email.
    Also make sure that the new email is not being used by other
    users.
  */
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email)
    if (existingUser && existingUser.id !== user.id) {
      throw new Error("Email already in use")
    }

    const verificationToken = await generateVericationToken(values.email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { success: "Verification email sent"}
  }

  /*
    If password is being changed.
    Make sure that the old password actually exists in the database.
  */
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password)
    if (!passwordMatch) throw new Error("Incorrect password")
    
    // Otherwise password is correct.
    const hashedPassword = await bcrypt.hash(values.newPassword, 10)
    values.password = hashedPassword
    // Do not include newPassword in db query.
    values.newPassword = undefined
  }

  await prismaDb.user.update({
    where: { id: dbUser?.id},
    data: {
      ...values
    }
  })


  return { success: "Settings Updated"}
}