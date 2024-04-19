import prismaDb from "./prisma-db"

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prismaDb.twoFactorToken.findUnique({
      where: { token }
    })

    return twoFactorToken
  } 
  catch (error: unknown) {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prismaDb.twoFactorToken.findFirst({
      where: { email }
    })

    return twoFactorToken
  } 
  catch (error: unknown) {
    return null
  }
}