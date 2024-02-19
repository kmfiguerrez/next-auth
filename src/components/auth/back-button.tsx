import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

type BackButtonProps = {
  href: string
  label: string
}


const BackButton: React.FC<BackButtonProps> = ({ label, href }) => {
  return (
    <Button
      variant={"link"}
      className='font-normal w-full'
      size={"sm"}
      asChild
    >
      <Link
       href={href}
      >
        {label}
      </Link>
    </Button>
  )
}

export default BackButton