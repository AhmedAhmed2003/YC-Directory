import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React, { Suspense } from 'react'
import StartUpCardType,{ StartUpTypeCard  } from './StartUpCardType'

const UserStartups = async({id}:{id:string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY
         ,{id} )
  return (
    <>
    {startups.length>0?startups.map((startup:StartUpTypeCard)=>(
      
         <StartUpCardType post={startup} key={startup._id}/>
      
    )):<p className='no-result'>No posts yet</p>}
    </>
  )
}

export default UserStartups