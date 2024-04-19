"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/auth"

import LoginSchema, { TLoginSchema } from "@/schemas/login-schema"

import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes"

import { getUserByEmail } from "@/lib/db-data"
import { generateTwoFactorToken, generateVericationToken } from "@/lib/token"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail"
import { getVerificationTokenByEmail } from "@/lib/verification-token"
import { getTwoFactorTokenByEmail } from "@/lib/two-factor-token"
import prismaDb from "@/lib/prisma-db"
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor-confirmation"


export const login = async (values: TLoginSchema) => {
  // Validate form values because server actions run on the server.
  const validatedFields = LoginSchema.safeParse(values)

  try {
    if (!validatedFields.success) throw new Error("Invalid fields!")
    
    const {email, password, twoFACode} = validatedFields.data

    // Check first if users have verified their email.
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
      throw new Error("Invalid credentials")
    }
    if (!existingUser.emailVerified) {
      /*
        Before generating verification token, check first if there's one
        existing and still hasn't expired.
        Because the register action also generates token and sends
        verification email.
      */
      const existingToken = await getVerificationTokenByEmail(existingUser.email)
      if (existingToken) {
        const hasExpired: boolean = new Date(existingToken.expires) < new Date()
        if(!hasExpired) throw new Error("Please verify your email")
      }
      // Otherwise no token or expired, generate token and send it.
      const verificationToken = await generateVericationToken(existingUser.email)
      await sendVerificationEmail(verificationToken.email, verificationToken.token)
      return { success: "Confirmation email sent"}
    }

    // Only execute this if block if users chose to use 2FA.
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (twoFACode) {
        // After clicking the login button, 2FA code will be propmted.
        const twoFAToken = await getTwoFactorTokenByEmail(existingUser.email)

        if (!twoFAToken) throw new Error("Missing 2FA code")

        if (twoFAToken.token !== twoFACode) throw new Error("Invalid 2FA code")
        
        const hasExpired = new Date(twoFAToken.expires) < new Date()
        if (hasExpired) throw new Error("2FA code expired")

        await prismaDb.twoFactorToken.delete({
          where: { id: twoFAToken.id }
        })

        const existing2FAConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if (existing2FAConfirmation) {
          await prismaDb.twoFactorConfirmation.delete({
            where: { id: existing2FAConfirmation.id }
          })
        }

        await prismaDb.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id
          }
        })
      }
      else {        
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
        return {twoFA: "2FA code sent"}
      }
    }

    // The signIn throws error from next auth.
    await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})

    return {success: "Loggin successful"}
  } 
  catch (error: unknown) {
    console.log("What's the error")
    console.log({itoh: error})
    if (error instanceof AuthError) {
      switch (error.type) {        
        case "CredentialsSignin": {
          throw new Error("Invalid credentials")
        }
        default:
          throw new Error("Something went wrong")
      }
    }
    // Otherwise error is Error.
    // This is required for the redirectTo to work.
    throw error
  }
  
}

