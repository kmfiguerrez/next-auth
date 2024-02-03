import React from 'react'
import { gradientBackground } from '@/lib/styles'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={`
      h-full flex items-center justify-center
      ${gradientBackground}
      `}
    >
      {children}
    </div>
  )
}

export default AuthLayout