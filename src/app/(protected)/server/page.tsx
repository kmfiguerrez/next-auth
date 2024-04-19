import { auth } from "@/auth"
import UserInfo from "@/components/user-info"
import type { User } from "next-auth" 


const ServerPage = async () => {
  const user = await currentUser()

  return (
    <div className="text-white">
      <UserInfo user={user} label="Server Component"/>
    </div>
  )
}


const currentUser = async () => {
  const session = await auth()

  return session?.user
}

export default ServerPage