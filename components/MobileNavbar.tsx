import { usePathname } from "next/navigation";
import { AlignJustify, X } from 'lucide-react';
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MobileNavbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { width } = useViewportSize();
    const isMobile = width < 768;
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const closeMenuOnMobile = () => {
        if (isMobile) setIsMenuOpen(false);
    }
    return (
        <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" onClick={toggleMenu}>
                {
                    isMenuOpen ?
                        <X className='w-8 h-8' /> :
                        <AlignJustify className='w-8 h-8' />
                }
            </button>
            <div
                className={cn(
                    'flex flex-col items-center gap-8',
                    isMenuOpen &&
                    'bg-white fixed top-[80px] right-0 w-[300px] bottom-0 p-8 transform transition-transform duration-300 ease-in-out translate-x-0 border-l',
                    !isMenuOpen &&
                    isMobile &&
                    'bg-white fixed top-[80px] right-0 w-[300px] bottom-0 p-8 transform transition-transform duration-300 ease-in-out translate-x-full'
                )}>
                <Link href="/"
                    className={pathname == "/" ? 'font-extrabold' : `hover:text-black text-gray-500`}
                    onClick={closeMenuOnMobile}>
                    Home
                </Link>
                <Link href="/about"
                    className={pathname == "/about" ? 'font-extrabold' : `hover:text-black text-gray-500`}
                    onClick={closeMenuOnMobile}>
                    About Us
                </Link>
                <Link href="/detections"
                    className={pathname == "/detections" ? 'font-extrabold' : `hover:text-black text-gray-500`}
                    onClick={closeMenuOnMobile}>
                    Detect
                </Link>
                <Link href="/dashboard"
                    className="px-4 py-2 text-white bg-[#362222] rounded-md hover:bg-[#362222]/90"
                    onClick={closeMenuOnMobile}>
                    Dashboard
                </Link>
            </div>
        </div>
    )
}
