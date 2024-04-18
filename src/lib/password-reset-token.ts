import prismaDb from "./prisma-db"

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prismaDb.passwordResetToken.findUnique({
      where: {token}
    })  

    return passwordResetToken
  } 
  catch (error: unknown) {
    console.log(error)
    return null
  } 
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prismaDb.passwordResetToken.findFirst({
      where: {email}
    })  
    // console.log("Password reset token: ", passwordResetToken)

    return passwordResetToken
  } 
  catch (error: unknown) {
    // console.log("yo", error)
    return null
  } 
}