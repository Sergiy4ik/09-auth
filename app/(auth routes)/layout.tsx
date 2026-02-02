"use client";

import css from "./AuthLayout.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type LayoutRegisterProps = {
    readonly children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutRegisterProps) {
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        router.refresh();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
    }, [router]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <section className={css.container}>
                    <div className={css.registerWrapper}>{children}</div>
                </section>
            )}
        </>
    );
}