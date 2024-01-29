'use client'
import Loader from '@/app/components/Loader'
import PostCard from '@/app/components/PostCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function LikedPosts() {
  const {data:session} = useSession()
  const [userData,setUserData] = useState({})
  const [loading,setLoading] = useState(true)

  const getUser = async()=>{
    const response = await fetch(`/api/user/${session?.user?.id}`)
    const data = await response.json()
    setUserData(data)
    setLoading(false)
  }

  useEffect(()=>{
    if(session){
      getUser()
    }
  },[session])

  return loading ? <Loader /> : (
    <div className='flex flex-col gap-5'>
      {userData?.likedPosts?.map(post => (
        <PostCard key={post._id} post={post} update={getUser} />
      ))}
    </div>
  )
}
