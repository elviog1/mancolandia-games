import Posting from '@/app/components/form/Posting'
import React from 'react'

export default function CreatePost() {
  const postData = {
    creator: "",
    game: "",
    title: "",
    description: "",
  };

  return (
    <div className='flex flex-col items-center'>
        <Posting post={postData} apiEndpoint={"/api/post/new"} />
    </div>
  )
}
