import css from "./create-note.module.css"

import { Metadata } from "next";

import NoteForm from "@/components/NoteForm/NoteForm"

export const metadata: Metadata = {
    title: "NoteHub - Create New Note",
    description: "A web application where you can store your notes",
    openGraph: {
        title: "NoteHub - Create New Note",
        description: "A web application where you can store your notes",
        url: "https://08-zustand-plum-ten.vercel.app/notes/action/create",
        images: [{
            url: "/notehub-og-meta.jpg",
            alt: "banner, company logo",
            width: 1200,
            height: 630,
        }]
    }
};

export default function CreateNote() {

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                {<NoteForm />}
            </div>
        </main>
    )
}

