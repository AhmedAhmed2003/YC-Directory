import { auth , signIn , signOut } from '@/auth'
import { BadgePlus, LogIn, LogOut, Plus, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const NavBar =async () => {
    const session  = await auth()

    
    
  return (
    <header className=' bg-white py-5 shadow-sm '>
        <nav className=' flex justify-between items-center px-5 text-black text-2xl capitalize'>
        <div className="logo">
         <Link href={'/'}>
         <Image src={'/logo.png'} alt='logo' width={144} height={30}/>
         </Link>
        </div>
        <div className='flex items-center  gap-5'>
            {session && session?.user?(
                <>
                <Link href='/startup/create/ '  className='flex items-center justify-center'> <BadgePlus className='text-primary size-6'/></Link>
                <form action={async()=>{
                    'use server';
                    await signOut({redirectTo:'/'})
                }}> <button type='submit' className='flex items-center justify-center' ><LogOut className='text-primary size-6'/> </button> </form>
               <Link href={`/user/${session?.id}`}>
                <Avatar className='size-10'>
                    <AvatarImage src={session?.user?.image}
                    alt={session?.user?.name}/>
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                </Link>

                </>
            ):<form action={async()=>{
                'use server';
                await signIn('github')
            }}> 
            <button type="submit" className='text-primary'><LogIn className='text-primary size-6'/></button>
            </form>}

        </div>
        </nav>
    </header>
  )
}

export default NavBar