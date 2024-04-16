import React from 'react'

import { auth } from '@/auth'

const DashboardPage = async () => {
  const session = await auth()

  return (
    <div className='text-white'>
      This is a protected routes
      <ul>
        <li>Id: {session?.user?.id}</li>
        <li>Email: {session?.user?.email}</li>
        <li>Name: {session?.user?.name}</li>
        <li>Image: {session?.user?.image}</li>
      </ul>      
    </div>
  )
}

export default DashboardPage