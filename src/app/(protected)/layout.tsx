import React from 'react'

import Navbar from '@/components/nav/navbar'

type ProtectedLayoutProps = {
  children: React.ReactNode
}



const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center border'>
      <Navbar />
      {children}
    </div>
  )
}

export default ProtectedLayout