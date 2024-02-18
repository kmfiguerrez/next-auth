import CardWrapper from '@/components/card-wrapper'
import RegisterForm from '@/components/forms/register-form'
import React from 'react'

const RegisterPage = () => {
  return (
    <div>
      <CardWrapper title='Register' className='mx-auto'>
        <RegisterForm />
      </CardWrapper>
    </div>
  )
}

export default RegisterPage