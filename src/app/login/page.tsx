import CardWrapper from '@/components/card-wrapper'
import LoginForm from '@/components/forms/login-form'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <CardWrapper title='Login' className='mx-auto'>
        <LoginForm />
      </CardWrapper>
    </div>
  )
}

export default LoginPage