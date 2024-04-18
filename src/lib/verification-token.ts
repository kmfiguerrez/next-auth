import prismaDb from "./prisma-db"

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prismaDb.verificationToken.findUnique({
      where: {token}
    })

    if (!verificationToken) throw new Error("Token does not exists")

    return verificationToken
  } 
  catch (error: unknown) {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prismaDb.verificationToken.findFirst({
      where: {email}
    })

    if (!verificationToken) throw new Error("Token does not exists")

    return verificationToken
  } 
  catch (error: unknown) {
    return null
  }
}