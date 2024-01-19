'use client'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '../constants'
import Link from 'next/link'

export default function MenuSideBar() {
    const pathName = usePathname()
  return (
    <div className='flex flex-col gap-2'>
        {sidebarLinks.map(link =>{
            const isActive = pathName === link.route
            return (
                <Link key={link.label} className={`flex gap-4 py-2 px-4 rounded-lg hover:bg-blue-800 duration-200 justify-start ${isActive && 'bg-blue-800'} `} href={link.route}>{link.icon} <p>{link.label}</p></Link>
            )
        })}
    </div>
  )
}
