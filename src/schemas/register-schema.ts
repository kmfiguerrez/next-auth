import { z } from "zod"
 
const RegisterSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  email: z.string().email({message: "Provide a valid email"}),
  password: z.string().min(1, {message: "Password is required"})
})

export type TRegisterSchema = z.infer<typeof RegisterSchema>

export default RegisterSchema