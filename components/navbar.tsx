'use client'

import Link from 'next/link'
import { Globe } from 'lucide-react'
import { usePathname } from 'next/navigation';
import MobileNavbar from './MobileNavbar';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center h-[80px] justify-between p-4 border-b bg-white z-50">
      <Link href="/" className="flex items-center gap-2">
        <Globe className="w-8 h-8" />
        <span className="text-xl font-bold">VehicleCounter</span>
      </Link>
      <div
        className='hidden md:flex items-center gap-8 '>
        <Link href="/"
          className={pathname == "/" ? 'font-extrabold' : `hover:text-black text-gray-500`}>
          Home
        </Link>
        <Link href="/about"
          className={pathname == "/about" ? 'font-extrabold' : `hover:text-black text-gray-500`}>
          About Us
        </Link>
        <Link href="/detections"
          className={pathname == "/detections" ? 'font-extrabold' : `hover:text-black text-gray-500`}>
          Detect
        </Link>
        <Link href="/dashboard"
          className="px-4 py-2 text-white bg-[#362222] rounded-md hover:bg-[#362222]/90">
          Dashboard
        </Link>
      </div>
      {/* Mobile Nav */}
      <MobileNavbar />
    </nav>
  )
}