import React from 'react'
import Header from './header'
import Social from './social'
import BackButton from './back-button'
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '../ui/card'

type CardWrapperProps = {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}


const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  backButtonHref,
  headerLabel,
  backButtonLabel,
  showSocial
}) => {
  
  
  
  return (
    <Card className='w-[400px] shadow-md'>
      
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial &&
        <CardFooter>
          <Social />
        </CardFooter>        
      }
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>

    </Card>      
  )
}

export default CardWrapper