/*
  Note
  Server code doesn't work in client components.
*/

// Server code.
import { PrismaClientInitializationError } from "@prisma/client/runtime/library"


export const getServerErrorMessage = (error: unknown) => {
  let message: string

  if (error instanceof PrismaClientInitializationError) {
    message = "Database could be down"
    return message
  }
  else if (error instanceof Error) {
    message = error.message
    return message
  }
  else {
    message = "Something went wrong"
    return message
  }
}