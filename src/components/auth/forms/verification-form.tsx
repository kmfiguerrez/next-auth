'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import CardWrapper from '../card-wrapper'

import { BeatLoader } from "react-spinners"

import { verification } from '@/actions/verification'

import FormSucess from './form-success'
import FormError from './form-error'


const VerificationForm = () => {
  const [success, setSuccess] = useState<string>()
  const [error, setError] = useState<string>()

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token")
      return
    }

    verification(token)
    .then(data => setSuccess(data.success))
    .catch(error => {
      console.log(error)
      setError(error.message)
    })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      title='Confirming your verification'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
      className='mx-auto'
    >
      <div className='flex items-center w-full justify-center'>
        {!success || !error &&
          <BeatLoader />
        }
        
        <FormSucess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}

export default VerificationForm