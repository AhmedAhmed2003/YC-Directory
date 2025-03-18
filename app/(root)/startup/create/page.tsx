import { auth } from '@/auth'
import StartUpForm from '@/components/StartUpForm';
import { redirect } from 'next/navigation';
import React from 'react'

const create =async () => {
    const session  = await auth();
    if (!session) {
        redirect('/')
    }
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>
            Submit Your StartUp 
        </h1>
    </section>
    <StartUpForm/>
    </>
  )
}

export default create