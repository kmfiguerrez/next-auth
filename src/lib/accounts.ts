import prismaDb from "./prisma-db"

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prismaDb.account.findFirst({
      where: { userId }
    })  

    return account
  } 
  catch (error: unknown) {
    return null
  }
}