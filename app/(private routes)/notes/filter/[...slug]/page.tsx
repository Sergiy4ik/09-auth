import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";


interface NotesByTagProps {
    readonly params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: NotesByTagProps): Promise<Metadata> {
    const { slug } = await params;

    return {
        title: `${slug[0]} - notes`,
        description: `notes tagged with: ${slug[0]}`,
        openGraph: {
            title: `NoteHub - ${slug[0]}`,
            description: "A web application where you can store your notes",
            url: "https://08-zustand-plum-ten.vercel.app/",
            images: [{
                url: "/notehub-og-meta.jpg",
                alt: "banner, company logo",
                width: 1200,
                height: 630,
            }]
        }
    }
}

export default async function NotesByTag({ params }: NotesByTagProps) {
    const { slug } = await params;

    const search = "";
    const tag = slug[0] === "all" ? undefined : slug[0];
    const page = 1;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", search, page, tag],
        queryFn: () => fetchNotes(page, search, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
}