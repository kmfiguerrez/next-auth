import prismaDb from "./prisma-db"

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prismaDb.verificationToken.findUnique({
      where: {token}
    })

    return verificationToken
  } 
  catch (error: unknown) {
    
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prismaDb.verificationToken.findFirst({
      where: {email}
    })

    return verificationToken
  } 
  catch (error: unknown) {
    
  }
}