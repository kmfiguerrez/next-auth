import React from 'react'

import { cn } from '@/lib/utils'

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type CardWrapperProps = {
  title: string
  className?: string
  children: React.ReactNode
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}


const CardWrapper: React.FC<CardWrapperProps> = ({ children, title, className }) => {

  return (
    <Card className={cn(`w-[380px]`, className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        <Socials />
      </CardFooter>
    </Card>
  )
}

export default CardWrapper