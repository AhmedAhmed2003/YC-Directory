import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))

}
export function formateData(data:string){
  return new Date(data).toLocaleDateString('en-Us' , {
    month:'long',
    day:'numeric',
    year:'numeric'
  })
}
export const  parseServerActionResponse = <T>(response:T)=>{
return JSON.parse(JSON.stringify(response))
}

