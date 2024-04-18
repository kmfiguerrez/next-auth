import { z } from "zod"
 
const NewPasswordSchema = z.object({  
  password: z.string({ required_error: "Password is required" })
            .min(1, "Password is required")
            .min(8, "Password must be more than 8 characters")
            .max(32, "Password must be less than 32 characters"),
  confirmPassword: z.string({ required_error: "Confirm password is required" })
  .min(1, "Confirm password is required")
  .min(8, "Confirm password must be more than 8 characters")
  .max(32, "Confirm password must be less than 32 characters"),            
})

export type TNewPasswordSchema = z.infer<typeof NewPasswordSchema>

export default NewPasswordSchema