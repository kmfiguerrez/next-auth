import { UserRole } from "@prisma/client"
import { z } from "zod"

const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(8)),
  newPassword: z.optional(z.string().min(8)),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER])
})
.refine(data => {
  // If user entered old password but not in new password.
  if (data.password && !data.newPassword) return false


  return true
}, {
  message: "New password is required",
  path: ["newPassword"]
})
.refine(data => {
  // If user entered new password but not in old password.
  if (data.newPassword && !data.password) return false  

  return true
}, {
  message: "Old Password is required",
  path: ["password"]
})

export type TSettingsSchema = z.infer<typeof SettingsSchema>

export default SettingsSchema