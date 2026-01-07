import { SignIn } from '@clerk/clerk-react';
import React from 'react'

const LogInPage = () => {
  return (
    <div className='h-screen hero'>
      <SignIn/>
    </div>
  )
}

export default LogInPage;
