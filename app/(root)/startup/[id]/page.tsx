import StartUpCardType, { StartUpTypeCard } from '@/components/StartUpCardType';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { formateData } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import markdownit from 'markdown-it'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
export const experimental_ppr=true;

const md = markdownit();
const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    const [post , {select:editorPosts} ] = await Promise.all([
      client.fetch(STARTUP_BY_ID_QUERY , {id}),
      client.fetch( PLAYLIST_BY_SLUG_QUERY , {slug:'editor-picks'})

      
    ])
    // const post = await client.fetch(STARTUP_BY_ID_QUERY , {id})
    // const {select:editorPosts} = await client.fetch(
    //   PLAYLIST_BY_SLUG_QUERY , {slug:'editor-picks'});

    if (!post ) return notFound();
    
    const paresdContent = md.render(post?.pitch || '')
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
      <p className='tag'>{formateData(post?._createdAt)}</p>
      <h1 className='heading'>{post.title}</h1>
      <p className='sub-heading !max-w-5xl'>
        {post.description}
        </p>
    </section>
    <section className='section_container'>
      <img src={post.image} alt='postImg' className='w-full h-auto rounded-xl'/>
      <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className="flex-between gap-5">
          <Link href={`/user/${post.author?._id}`}
           className='flex gap-2 items-center mb-3'>
            <Image src={post.author.image} alt='author'
            width={64} height={64} className='rounded-full drop-shadow-xl '
            />
            <div>
              <p className='text-20-medium'>{post.author.name}</p>
              <p className='text-16-medium'>@{post.author.username}</p>
            </div>
          </Link>
          <p className='category-tag'>{post.category}</p>
        </div>
        <h3 className='text-30-bold'>Pitch Detailes</h3>
        {
          paresdContent?(
            <article className='prose max-w-4xl font-work-sans break-all rounded-lg shadow-black shadow-sm px-3 py-4'
            dangerouslySetInnerHTML={{__html:paresdContent}}/>
          ):<p className='no-result'>No Results Detailes  </p>
        }
      </div>
      <hr className='divider'/>
     {
      editorPosts?.length>0 &&(
        <div className='max-w-4xl mx-auto'>
          <p className='text-30-semibold'>Editor Picks</p>
          <ul className='mt-1 card_grid-sm'>
            {editorPosts.map((post:StartUpTypeCard , index:number)=>(
              <StartUpCardType key={index} post={post}/>
            ))}
          </ul>
        </div>
      )
     }
      <Suspense fallback={<Skeleton className='view_sekelton'/>}>
      <View id={id}/>
      </Suspense>
    </section>
    </> 
 )
}

export default page