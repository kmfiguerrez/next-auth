import { v4 as uuidv4 } from 'uuid';
import prismaDb from './prisma-db';
import { getVerificationTokenByEmail } from './verification-token';

export const generateVericationToken = async (email:string) => {
  const token = uuidv4()

  // Expire the token in one hour.
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  // Check for existing token per email and delete it.
  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await prismaDb.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  // Create new verification token.
  const verificationToken = await prismaDb.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}