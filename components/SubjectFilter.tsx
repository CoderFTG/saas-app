"use client";
import React, { useCallback, useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchParamsRef = useRef(searchParams);
    searchParamsRef.current = searchParams;
    const subject = searchParams.get("subject") || "all";

    const handleValueChange = useCallback((value: string) => {
        const params = searchParamsRef.current.toString();
        const newUrl =
            value === "all"
                ? removeKeysFromUrlQuery({ params, keysToRemove: ["subject"] })
                : formUrlQuery({ params, key: "subject", value });
        router.push(newUrl, { scroll: false });
    }, [router]);

    return (
        <Select onValueChange={handleValueChange} value={subject}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;