'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Globe, AlignJustify, X } from 'lucide-react'
import { usePathname } from 'next/navigation';
import { useViewportSize } from '@mantine/hooks';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  const closeMenuOnMobile = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  }
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center h-[80px] justify-between p-4 border-b bg-white z-50">
      <Link href="/" className="flex items-center gap-2">
        <Globe className="w-8 h-8" />
        <span className="text-xl font-bold">VehicleCounter</span>
      </Link>
      <div
        className={cn(
          'flex items-center gap-8',
          isMenuOpen &&
          'bg-white flex-col fixed top-[80px] right-0 bottom-0 w-1/2 p-8 transform transition-transform duration-300 ease-in-out translate-x-0 border-l',
          !isMenuOpen &&
          isMobile &&
          'bg-white flex-col fixed top-[80px] right-0 bottom-0 w-1/2 p-8 transform transition-transform duration-300 ease-in-out translate-x-full'
        )}>
        <Link href="/"
          className={pathname == "/" ? 'font-extrabold' : `hover:text-primary`}
          onClick={closeMenuOnMobile}>
          Home
        </Link>
        <Link href="/about"
          className={pathname == "/about" ? 'font-extrabold' : `hover:text-gray-700`}
          onClick={closeMenuOnMobile}>
          About Us
        </Link>
        <Link href="/detections"
          className={pathname == "/detections" ? 'font-extrabold' : `hover:text-gray-700`}
          onClick={closeMenuOnMobile}>
          Detect
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 text-white bg-[#362222] rounded-md hover:bg-[#362222]/90"
          onClick={closeMenuOnMobile}>
          Dashboard
        </Link>
      </div>
      <div className="md:hidden">
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" onClick={toggleMenu}>
          {
            isMenuOpen ?
              <X className='w-8 h-8' /> :
              <AlignJustify className='w-8 h-8' />
          }
        </button>
      </div>
    </nav>
  )
}