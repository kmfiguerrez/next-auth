import React from 'react'
import { CheckCircle2 } from 'lucide-react'

type FormSuccessProps = {
  message?: string
}

const FormSucess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null
  
  return (
    <div className='
      bg-emerald-500/15 p-3 rounded-md flex items-center
      gap-x-2 text-sm text-emerald-500
    '>
      <CheckCircle2 />
      <p>{message}</p>
    </div>
  )
}

export default FormSucess