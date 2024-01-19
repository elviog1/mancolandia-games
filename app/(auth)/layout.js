import { ClerkProvider } from '@clerk/nextjs'
import {Inter} from 'next/font/google'
export const metadata = {
    title: 'Auth',
    description: 'Next 14 Sign in/up'
}
import '../globals.css'
const inter = Inter({subsets:['latin']})

export default function LayoutPage({ children }) {
    return (
        <ClerkProvider>
        <html lang='en'>
            <body className={`${inter.className} bg-gray-950`}>
                {children}
            </body>
        </html>
        </ClerkProvider>
    )
}
