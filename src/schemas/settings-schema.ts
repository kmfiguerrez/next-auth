import { z } from "zod"

const SettingsSchema = z.object({
  name: z.optional(z.string())
})

export type TSettingsSchema = z.infer<typeof SettingsSchema>

export default SettingsSchema