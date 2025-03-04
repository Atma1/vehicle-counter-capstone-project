'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions/auth";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div
            className='flex items-center gap-8 bg-white flex-col fixed top-[80px] left-0 w-[300px] bottom-0 p-8 border-r'>
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
            <button
                className="px-4 py-2 text-white bg-[#362222] rounded-md hover:bg-[#362222]/90"
                onClick={() => logout()}>
                Logout
            </button>
        </div>
    )
}
