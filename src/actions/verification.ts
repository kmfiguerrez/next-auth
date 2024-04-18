"use server"

import { getUserByEmail } from "@/lib/db-data"
import prismaDb from "@/lib/prisma-db"
import { getVerificationTokenByToken } from "@/lib/verification-token"

export const verification = async (token: string) => {
 console.log(token) 

  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    throw new Error("Token does not exists")
  }

  const hasExpired: boolean = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    throw new Error("Token has expired")
  }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) {
    throw new Error("Email does not exists")
  }

  await prismaDb.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email  // This is used when user wants to change their email.
    }
  })

  await prismaDb.verificationToken.delete({
    where: { id: existingToken.id }
  })

  return { success: "Email verified"}
}