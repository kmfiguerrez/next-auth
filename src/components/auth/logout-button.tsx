import React, { ReactNode } from 'react'

import { Button } from '../ui/button'
import { logout } from '@/actions/log-out'

type TLogoutButtonProps = {
  children: ReactNode
}

const LogoutButton: React.FC<TLogoutButtonProps> = ({ children }) => {

  const handleClick = () => {
    logout()
  }

  return (
    <Button onClick={handleClick} size={'sm'}>
      {children}
    </Button>
  )
}

export default LogoutButton