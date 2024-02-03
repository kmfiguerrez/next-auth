'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

type LoginButtonProps = {
  children: ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}


const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  mode = "redirect",
  asChild
}) => {
  const router = useRouter()

  if (mode === "modal") {
    return (
      <span>
        Todo: Implement
      </span>
    )
  }


  const handleClick = () => {
    router.push("/auth/login")
  }


  return (
    <span onClick={handleClick} className='cursor-pointer'>
      {children}
    </span>
  )
}

export default LoginButton