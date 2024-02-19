import CardWrapper from '@/components/auth/card-wrapper'
import LoginForm from '@/components/auth/forms/login-form'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <CardWrapper 
        title='Login'
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
        className='mx-auto'
      >
        <LoginForm />
      </CardWrapper>
    </div>
  )
}

export default LoginPage