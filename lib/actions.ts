"use server"
import slugify from "slugify"
import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async(_state:any, title:string,
    description:string,
    category:string,
    link:string ,
    pitch:string , )=>{
        const session = await auth();
        if (!session) {
            return parseServerActionResponse({
                error:"Bot Signed in",
                status:"ERROR"
            });
        }
        const slug = slugify(title as string ,{lower:true ,
             strict:true})
             try{
                const startup = {
                    title,
                    description,
                    category,
                    image:link ,
                  slug:{
                    _type:slug,
                    current:slug
                  },
                  author:{
                    _type:'reference',
                    _ref:session?.id
                  },
                  pitch,
                  
                };
                const result = await writeClient.create({
                  _type:"startup" ,
                   ...startup ,
                } );
                return parseServerActionResponse({
                    ...result,
                    error:"",
                    status:"SUCCESS", 
                })
             }catch(error){
                console.log(error);
                return parseServerActionResponse({
                    error:JSON.stringify(error),
                    status:"ERROR" ,
                })
                

             }
    }