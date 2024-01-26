'use client'
import Loader from '@/app/components/Loader'
import PostCard from '@/app/components/PostCard'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import  { useEffect, useState } from 'react'

export default function SearchPosts() {
    const {query} = useParams()
    const [loading,setLoading] = useState(true)
    const [searchedPosts,setSearchedPosts] = useState([])

    const getSearchedPosts = async ()=>{
        const response = await fetch(`/api/post/search/${query}`)
        const data = await response.json()
        setSearchedPosts(data)
        setLoading(false)
    }

    useEffect(()=>{
        getSearchedPosts()
    },[query])

  return loading ? <div className='flex justify-center'><Loader /></div> : (
    <div className='flex flex-col gap-5'>
        <div className='flex gap-5'>
            <Link className="px-4 py-2 rounded-lg bg-blue-500" href={`/search/posts/${query}`}>Posts</Link>
            <Link className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-500" href={`/search/people/${query}`}>People</Link>
        </div>

        {searchedPosts.map(post => (
            <PostCard post={post} key={post._id}  />
        ))}
    </div>
  )
}
