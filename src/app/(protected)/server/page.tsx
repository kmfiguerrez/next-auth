import { auth } from "@/auth"

const ServerPage = async () => {
  const user = await currentUser()
  console.log(user)

  return (
    <div className="text-white">
      {JSON.stringify(user)}
    </div>
  )
}


const currentUser = async () => {
  const session = await auth()

  return session?.user
}

export default ServerPage