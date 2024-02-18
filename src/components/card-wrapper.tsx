import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils'
  
type CardWrapperProps = {
    title: string
    className?: string
    children: React.ReactNode
}

  
const CardWrapper: React.FC<CardWrapperProps> = ({ children, title, className }) => {

  return (
    <Card className={cn(`w-[380px]`, className)}>
    <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
    </CardHeader>
    <CardContent>
        { children }
    </CardContent>
    {/* <CardFooter>
        <p>Card Footer</p>
    </CardFooter> */}
    </Card>
  )
}

export default CardWrapper