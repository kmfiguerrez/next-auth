import React from 'react'

import { auth } from '@/auth'
import NavLinks from '@/components/nav/nav-links'

const DashboardPage = async () => {
  const session = await auth()

  return (
    <>
      <header className="mb-5">
        <NavLinks />
      </header>
      <div className='text-white'>
        This is a protected routes
        <ul>
          <li>Id: {session?.user?.id}</li>
          <li>Email: {session?.user?.email}</li>
          <li>Role: {session?.user.role}</li>
          <li>Name: {session?.user?.name}</li>
          <li>Image: {session?.user?.image}</li>
        </ul>      
      </div>
    </>
  )
}

export default DashboardPage