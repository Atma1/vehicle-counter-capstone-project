'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query')?.toString() || '');

    function handleSearch() {
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set('query', searchTerm);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-2 mt-4 w-1/5">
            <label htmlFor="search" className="text-sm font-medium">
                Search
            </label>
            <div className="flex gap-2">
                <input
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
        </div>
    )
}
