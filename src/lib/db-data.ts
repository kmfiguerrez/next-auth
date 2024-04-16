/*
  These functions are server-side code.
  Meaning they can't be used in client components.
*/

import prismaDb from "./prisma-db"


export const getUserByEmail = async (email:string) => {
  try {
    const user = await prismaDb.user.findUnique({
      where: {
        email
      }
    })
    
    return user
  } 
  catch (error:unknown) {
    return null
  }
}


export const getUserById = async (id:string) => {
  try {
    const user = await prismaDb.user.findUnique({
      where: {
        id
      }
    })
    
    return user
  } 
  catch (error:unknown) {
    return null
  }
}