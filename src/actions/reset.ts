"use server"

import { getUserByEmail } from "@/lib/db-data"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/token"
import ResetSchema, { TResetSchema } from "@/schemas/reset-schema"

export const reset = async (value: TResetSchema) => {
  const validatedField = ResetSchema.safeParse(value)

  if (!validatedField.success) {
    throw new Error("Invalid email")
  }

  const { email } = validatedField.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser) {
    throw new Error("Email not found")
  }

  const passwordResetToken = await generatePasswordResetToken(existingUser.email)
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return {success: "Reset email sent"}
}