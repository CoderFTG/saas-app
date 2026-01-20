'use client'
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParamsRef = useRef(searchParams);
    searchParamsRef.current = searchParams;

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const t = setTimeout(() => {
            const params = searchParamsRef.current.toString();
            if (searchQuery) {
                router.push(formUrlQuery({ params, key: "topic", value: searchQuery }), { scroll: false });
            } else if (pathname === '/companions') {
                router.push(removeKeysFromUrlQuery({ params, keysToRemove: ["topic"] }), { scroll: false });
            }
        }, 500);
        return () => clearTimeout(t);
    }, [searchQuery, pathname, router]);
    
    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <Image src="/icons/search.svg" alt="search" width={15} height={15} />
            <input
                placeholder="Search companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}

export default SearchInput