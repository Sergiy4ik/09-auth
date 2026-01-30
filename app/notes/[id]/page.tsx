import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

import { Metadata } from "next";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id)

  return {
    title: `${note.title}`,
    description: `${note.content.slice(0, 30)}`,
    openGraph: {
      title: `${note.title}`,
      description: `${note.content.slice(0, 30)}`,
      url: `https://08-zustand-plum-ten.vercel.app/notes/${id}`,
      images: [{
        url: "/notehub-og-meta.jpg",
        alt: "banner, company logo",
        width: 1200,
        height: 630,
      }]
    }
  }
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>);
};
