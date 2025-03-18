import Form from 'next/form'
import SerachFormReset from './SerachFormReset'
import { Search } from 'lucide-react'
 
export default function SearchForm({query}:{query?:string}) {
  return (
    <Form action="/" className='search-form'>
      <input name="query" className='search-input' defaultValue={query} required/>
      <button type="submit" className='search-btn text-white'><Search className='size-5'/></button>
{query&&<SerachFormReset/>}
    </Form>
  )
}