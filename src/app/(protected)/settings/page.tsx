"use client"

import { useSession } from "next-auth/react"

const SettingsPage = () => {
  const session = useSession()
  
  return (
    <div className="bg-white p-10 rounded-xl">
      {JSON.stringify(session)}
    </div>
  )
}

export default SettingsPage