"use client"

import UserInfo from "@/components/user-info"

import { useCurrentUser } from "@/hooks/user"


const ClientPage = () => {
  const user = useCurrentUser()

  return (
    <div className="text-white">
      <UserInfo user={user} label="Client Component"/>
    </div>
  )
}




export default ClientPage