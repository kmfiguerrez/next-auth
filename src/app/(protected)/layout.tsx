import React from 'react'

type ProtectedLayoutProps = {
  children: React.ReactNode
}


const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center'>
      ProtectedLayout
    </div>
  )
}

export default ProtectedLayout