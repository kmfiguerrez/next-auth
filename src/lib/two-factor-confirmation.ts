import prismaDb from "./prisma-db"

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prismaDb.twoFactorConfirmation.findUnique({
      where: { userId }
    })

    return twoFactorConfirmation
  } 
  catch (error: unknown) {
    return null
  }
}