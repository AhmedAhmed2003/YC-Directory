"use client"
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const SerachFormReset = () => {
  const router = useRouter()
    const reset =()=>{
      const form = document.querySelector('.search-input') as HTMLFormElement ;
      if(form) form.reset
      router.push('/')
    }
  return (
    <div>   
          <button type="reset" onClick={reset} className='search-btn text-white'>
         <X className='size-7'/>
            </button>
</div>
  )
}

export default SerachFormReset