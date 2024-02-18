import { z } from "zod"
 
const LoginSchema = z.object({  
  email: z.string().email({message: "Provide a valid email"}),
  password: z.string().min(1, {message: "Password is required"})
})

export type TLoginSchema = z.infer<typeof LoginSchema>

export default LoginSchema