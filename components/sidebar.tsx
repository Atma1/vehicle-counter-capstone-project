'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions/auth";
import { Home, ChartArea } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div
            className='flex items-center justify-between gap-8 bg-white flex-col fixed top-[80px] left-0 w-[300px] bottom-0 p-8 border-r'>
            <div className="flex flex-col space-y-6">
                <Link href="/dashboard"
                    className={pathname == "/dashboard" ? 'font-extrabold' : `hover:text-black text-gray-500`}>
                    <Home />
                    Home
                </Link>
                <Link href="/dashboard"
                    className={pathname == "/dashboard/analytics" ? 'font-extrabold' : `hover:text-black text-gray-500`}>
                    <ChartArea />
                    Analytics
                </Link>
            </div>
            <button
                className="px-10 py-3 text-white bg-[#362222] rounded-lg hover:bg-[#362222]/90"
                onClick={() => logout()}>
                Logout
            </button>
        </div>
    )
}
