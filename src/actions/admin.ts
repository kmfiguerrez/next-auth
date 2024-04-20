"use server"

import { currentRole } from "@/lib/user-auth"
import { UserRole } from "@prisma/client"

export const admin = async () => {
  const role = await currentRole()

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action"}
  }

  throw new Error("Forbidden Server Action")
}