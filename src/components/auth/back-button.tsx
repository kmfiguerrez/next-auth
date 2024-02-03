'use client'

import React from 'react'

import Link from 'next/link'

import { Button } from '../ui/button'


type BackButtonProps = {
  href: string
  label: string
}

const BackButton: React.FC<BackButtonProps> = ({ href, label}) => {
  
  
  return (
    <Button
      variant={"link"}
      size={"sm"}
      asChild
      className='font-normal w-full'
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}

export default BackButton