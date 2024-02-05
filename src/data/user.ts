import { db } from "@/lib/db";

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    return user
  } catch (error) {
    console.log(error)
  }
}


const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id
      }
    })

    return user    
  } catch (error) {
    console.log(error)
  }
}


export {
  getUserByEmail,
  getUserById
}