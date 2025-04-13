import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className="flex justify-center items-center my-20">
      <SignIn />
    </div>
  )
}

export default Page;
