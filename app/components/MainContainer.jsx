'use client'
import React from 'react'
import TopBar from './TopBar'
import { usePathname } from 'next/navigation'
import { pageTitles } from '../constants';

export default function MainContainer({children}) {
  const currentPath = usePathname()
  const regex = /^\/([^\/]+)/;
  const firstPath = currentPath.match(regex) ? currentPath.match(regex)[0] : currentPath

  const title = pageTitles.find(page => page.url === firstPath)?.title || ""
  return (
    <section className='flex flex-col flex-1 bg-gray-950 max-w-4xl px-8 md:px-10 xl:px-20'>
      <TopBar />
      <div className='mt-5 mb-10'>
        <h2 className='font-bold text-3xl'>{title}</h2>
      </div>
      <div className=''>
        {children}
      </div>
    </section>
  )
}
