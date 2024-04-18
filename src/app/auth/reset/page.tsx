import CardWrapper from '@/components/auth/card-wrapper'
import ResetForm from '@/components/auth/forms/reset-form'

const ResetPage = () => {
  return (
    <CardWrapper
      title='Forgot password'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
      className='mx-auto'
    >
      <ResetForm />
    </CardWrapper>
  )
}

export default ResetPage