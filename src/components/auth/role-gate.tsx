"use client"

import React, { ReactNode } from 'react'

import type { UserRole } from '@prisma/client'

import { useCurrentRole } from '@/hooks/user'
import FormError from './forms/form-error'

type TRoleGateProps = {
  children: ReactNode
  allowedRole: UserRole
}


const RoleGate: React.FC<TRoleGateProps> = ({children, allowedRole}) => {
  const role = useCurrentRole()

  if (role !== allowedRole) {
    return (
      <FormError message='You do not have permission to view this content!' />
    )
  }

  return (
    <>
      { children }
    </>
  )
}

export default RoleGate