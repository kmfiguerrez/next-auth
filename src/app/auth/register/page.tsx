import CardWrapper from '@/components/auth/card-wrapper'
import RegisterForm from '@/components/auth/forms/register-form'
import React from 'react'

const RegisterPage = () => {
  return (
    <div>
      <CardWrapper 
        title='Register'
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
        className='mx-auto'
      >
        <RegisterForm />
      </CardWrapper>
    </div>
  )
}

export default RegisterPage