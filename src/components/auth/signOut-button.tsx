import React from 'react'

import { Button } from '../ui/button'
import { signOut } from '@/auth'



const SignOutButton = () => {
  return (
    <form action={async () => {
      "use server"
      await signOut()
    }}>
      <Button type='submit'>
        Sign Out
      </Button>
    </form>
  )
}

export default SignOutButton