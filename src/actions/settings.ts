"use server"

import { getUserById } from "@/lib/db-data"
import { currentUser } from "@/lib/user-auth"

import prismaDb from "@/lib/prisma-db"

import { TSettingsSchema } from "@/schemas/settings-schema"


export const settings = async (values: TSettingsSchema) => {
  const user = await currentUser()

  if (!user) throw new Error("Unauthorized")
  
  // Verify that user actually exists in the db and not just some session.
  const dbUser = await getUserById(user.id as string)

  await prismaDb.user.update({
    where: { id: dbUser?.id},
    data: {
      ...values
    }
  })


  return { success: "Settings Updated"}
}