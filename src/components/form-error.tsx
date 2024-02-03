import React from 'react'
import { AlertTriangle } from 'lucide-react'


type FormErrorProps = {
  message?: string
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null
  
  return (
    <div className='
      bg-destructive/15 p-3 rounded-md flex items-center
      gap-x-2 text-sm text-destructive
    '>
      <AlertTriangle />
      <p>{message}</p>
    </div>
  )
}

export default FormError