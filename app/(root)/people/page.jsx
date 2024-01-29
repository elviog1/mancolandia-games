'use client'
import Loader from '@/app/components/Loader'
import UserCard from '@/app/components/UserCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function PeoplePage() {
    const {data:session} = useSession()
    const [loading,setLoading] = useState(true)
    const [allUsers,setAllUsers] =useState([])

    const getAllUser = async ()=>{
        const response = await fetch(`/api/user`)
        const data = await response.json()
        setAllUsers(data)
        setLoading(false)
    }

    useEffect(()=>{
        getAllUser()
    },[])

  return loading ? <Loader /> : (
    <div className='flex flex-col gap-5 min-h-screen'>
        {allUsers.map(user => (
            <UserCard key={user._id} userData={user} update={getAllUser} />
        ))}
    </div>
  )
}
