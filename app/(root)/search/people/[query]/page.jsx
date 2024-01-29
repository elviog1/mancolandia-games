'use client'
import UserCard from '@/app/components/UserCard'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import  { useEffect, useState } from 'react'

export default function SearchPeople() {
    const {query} = useParams()
    const [loading,setLoading] = useState(true)
    const [searchedPeople,setSearchedPeople] = useState([])

    const getSearchedPeople = async ()=>{
        const response = await fetch(`/api/user/search/${query}`)
        const data = await response.json()
        setSearchedPeople(data)
        setLoading(false)
    }

    useEffect(()=>{
        getSearchedPeople()
    },[query])

  return (
    <div className='flex flex-col gap-5'>
        <div className='flex gap-5'>
            <Link className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-500" href={`/search/posts/${query}`}>Posts</Link>
            <Link className="px-4 py-2 rounded-lg bg-blue-500 " href={`/search/people/${query}`}>People</Link>
        </div>

        {searchedPeople.map(person => (
            <UserCard userData={person} key={person._id} update={getSearchedPeople} />
        ))}
    </div>
  )
}
