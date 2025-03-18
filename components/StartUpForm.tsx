"use client"
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import {z} from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';



const StartUpForm = () => {
const  [errors, setErrors] = useState<Record<string , string>>({});
const [pitch, setPitch] = useState("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");
const [link, setLink] = useState("");




const router = useRouter();

const handleFormSubmit = async (prevState:any )=>{
try{
    const formvalues = {
        // title:formData.get('title') as string,
        title,
        description,
        category,
        link ,
        pitch ,
    }
    await formSchema.parseAsync(formvalues);
    // console.log(formvalues);
    
    const result = await createPitch(prevState ,   title,
        description,
        category,
        link ,
        pitch ,);
    console.log(result);
    if (result.status=="SUCCESS") {
        toast.success('Pitch submitted successfully!', {
            description: 'Your startup idea has been recorded.',
          });
          router.push(`/startup/${result._id}`)
    }
    return result

}
catch(error){
if(error instanceof z.ZodError){
    const fieldErrors = error.flatten().fieldErrors;
    setErrors(fieldErrors as unknown as Record<string , string>);
    toast.error('Validation Error', {
        description: 'Please check your input fields',
      });
    return {...prevState ,error:'Validation field' , status:"ERROR"}
}
return {
    ...prevState,
    error:"An unexpected error has ocured"
}
}
    
}

const [state , formAction , isPending] = useActionState(
    handleFormSubmit ,
    {error :'',state :"INITIAL"},
)
return (
<form action={formAction} className='startup-form'>
    <div>
    <label htmlFor="title" className='startup-form_label'>
        Title
        </label>
        <Input 
        id='title'
        name='title'
        className='startup-form_input'
        required
        placeholder='Startup Title'
        onChange={(e)=>setTitle(e.target.value) }
        value={title}
            />
            {errors.title && <p className='startup-form_error'>
            {errors.title}</p>}
            </div>

            <div>
    <label htmlFor="description" className='startup-form_label'>
        Description
        </label>
        <Textarea 
        id='description'
        name='description'
        className='startup-form_textarea'
        required
        placeholder='Startup Description'
        onChange={(e)=>setDescription(e.target.value) }
        value={description}
            />
            {errors.description && <p className='startup-form_error'>
            {errors.description}</p>}
            </div>

            <div>
    <label htmlFor="category" className='startup-form_label'>
    Category
        </label>
        <Input 
        id='category'
        name='category' 
        className='startup-form_input'
        required
        placeholder='Startup Category (Tech , Health , Education...)'
        onChange={(e)=>setCategory(e.target.value) }
        value={category}
        
            />
            {errors.category && <p className='startup-form_error'>
            {errors.category}</p>}
            </div>

            <div>
    <label htmlFor="link" className='startup-form_label'>
    Image Url
        </label>
        <Input 
        id='link'
        name='link'
        className='startup-form_input'
        required
        placeholder='Startup Image'
        onChange={(e)=>setLink(e.target.value) }
        value={link}
            />
            {errors.link && <p className='startup-form_error'>
            {errors.link}</p>}
            </div>

            <div data-color-mode='light'>
            <label htmlFor="pitch" className='startup-form_label'>
            Pitch
        </label>
        <MDEditor 
    value={pitch}
    onChange={(value)=>setPitch(value as string)}
    id='pitch'
    preview='edit'
    height={300}
    style={{borderRadius:20 , overflow:"hidden"}}
    textareaProps={{
        placeholder:"Briefly describ your idea and what proplem it solves",

    }}
    previewOptions={{
        disallowedElements:['style'],
    }}
    />
    {errors.pitch && <p className='startup-form_error'>
        {errors.pitch}</p>}
            
            </div>
            <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
                {isPending?'Submiting...':'Submit Tour Pitch'}
                <Send className='!size-6 '/>
                </Button>
</form>

)
}

export default StartUpForm