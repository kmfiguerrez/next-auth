import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string()
        .min(1, { message: "Name is required"}),
  email: z.string().email({ message: "Email is required" }),
  password: z.string()
            .min(6, { message: "Minimum 6 characters required" })
})
.strict()

type TRegisterForm = z.infer<typeof RegisterSchema>


export default RegisterSchema
export type { TRegisterForm }