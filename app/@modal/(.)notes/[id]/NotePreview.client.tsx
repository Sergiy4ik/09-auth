"use client"
import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css"

import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NotePreview() {
    const router = useRouter()

    const handleClose = () => {
        router.back()
    }

    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    });

    if (isLoading) return "Loading..."

    if (error || !data) return "Something went wrong..."

    return (
        <Modal onClose={handleClose}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{data?.title}</h2>
                        <span className={css.tag}>{data?.tag}</span>
                    </div>
                    <p className={css.content}>{data?.content}</p>
                    <p className={css.date}>{data?.createdAt}</p>
                </div>
                <button onClick={handleClose} type="button" className={css.backBtn}>
                    Back
                </button>
            </div>
        </Modal>
    )
}