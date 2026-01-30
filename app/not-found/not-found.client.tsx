"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundClient() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000)

        return () => clearTimeout(timer);
    }, [router])

    return (
        <>
            <h1 className="title">404 - Page not found</h1>
            <p className="description">Sorry, the page you are looking for does not exist.</p>
            <p className="description">You will be redirected to the home page in a few seconds...</p>
        </>
    )
}