import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { RiTwitterXFill, RiGithubFill, RiMoonFill } from 'react-icons/Ri'
import { RxSun } from 'react-icons/Rx'

export default function Header() {

    const [mounted, setMounted] = useState(false)
    const { setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <header className="my-20 flex justify-between content-center items-center text-base">
            <div className='flex gap-4'>
                <Link href="/">Home</Link>
                <Link href="/posts">Posts</Link>
                <Link href="/posts">About</Link>
            </div>
            <div className='flex justify-between gap-4'>
                <Link href=""><RiTwitterXFill /></Link>
                <Link href=""><RiGithubFill /></Link>
                <button onClick={() => setTheme('light')}><RxSun /></button>
                <button onClick={() => setTheme('dark')}><RiMoonFill /></button>
            </div>
        </header>
    )
}