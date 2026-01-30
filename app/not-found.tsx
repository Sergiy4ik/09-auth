import { Metadata } from "next";
import NotFoundClient from "./not-found/not-found.client";

export const metadata: Metadata = {
    title: "Page not found",
    description: "Unfortunately, the page cannot be found. Please try again later.",
};


export default function NotFoundPage() {
    return <NotFoundClient />;
}
