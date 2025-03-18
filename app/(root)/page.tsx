import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartUpCardType, { StartUpTypeCard } from "@/components/StartUpCardType";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams} : {searchParams :Promise<{query?:string}>}) {
  const query = (await searchParams).query
  const params = {search:query || null}
  const {data:posts} = await sanityFetch({query : STARTUPS_QUERY , params})
  // const posts = await client.fetch(STARTUPS_QUERY);
  // console.log("121212121",JSON.stringify(posts));
  
  // const posts = [{
  //   _createdAt:new Date(),
  //   views:'45',
  //   author:{_id:1  , name:'Ahemd'},
  //   _id:1,
  //   descp:'This is Descriptions',
  //   image:'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   category:'Robots',
  //   title:'Robots Developing',
  // }]
  const session = await auth();
  console.log(session?.id);
  
  
  return (
    <>
   <section className="pink_container">
    <h1 className="heading">Pitch Your Startup, 
   <br/> Connect with Entrepreneurs</h1>
   <p className="sub-heading !max-w-3xl">
    Submit Ideas, Vote on Pitches, and Get Noticed in
     Virtual Competitions
     </p>
     <SearchForm query={query}/>
   </section>
   <section className="section_container">
    <p className="text-30-semibold">
      {query?`Search Results Is :${query}` :'All Statrups'}
    </p>
    <ul className="mt-7 card_grid">
   { 
      posts?.length>0?(
        posts.map((post:StartUpTypeCard )=>(
          <StartUpCardType post={post} key={post._id} />
        ))
      ):<p>No results Here</p>}
    
    
    </ul>
   </section>
   <SanityLive/>
 
   </>
  );
}
