import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import React from 'react'

const SettingPage = async () => {
  const session = await auth()

  return (
    <div>
      <p className='mb-4'>
        {JSON.stringify(session)}
      </p>

      <form action={async () => {
        "use server"

        await signOut()
      }}>
        <Button>
          Logout
        </Button>
      </form>
    </div>
  )
}

export default SettingPage