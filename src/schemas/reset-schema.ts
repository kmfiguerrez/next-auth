import { z } from "zod"
 
const ResetSchema = z.object({  
  email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
})

export type TResetSchema = z.infer<typeof ResetSchema>

export default ResetSchema