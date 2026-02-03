"use client";

import css from './NoteForm.module.css';
import toast from 'react-hot-toast';

import type { NoteTag } from '@/types/note';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createNote, CreateNotePayload } from '@/lib/api/clientApi';
import { useDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
    const router = useRouter();
    const queryClient = useQueryClient()

    const { draft, setDraft, clearDraft } = useDraftStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        })
    }

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["notes"]
            })

            clearDraft()
            router.push("/notes/filter/all");
            toast.success("The note has been added successfully.")
        },
        onError: () => {
            toast.error("Failed to create note")
        }
    });

    const handleSubmit = (formData: FormData) => {
        const rawValues = Object.fromEntries(formData.entries());

        const values: CreateNotePayload = {
            title: rawValues.title?.toString() ?? "",
            content: rawValues.content?.toString() ?? "",
            tag: rawValues.tag?.toString() as NoteTag,
        };

        mutation.mutate(values);
    };

    const handleCancel = () => {
        router.push("/notes/filter/all")
    }

    return (
        <form className={css.form} action={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" className={css.input} defaultValue={draft?.title} onChange={handleChange} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows={8} className={css.textarea} defaultValue={draft?.content} onChange={handleChange} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag" name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange} >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={handleCancel}>
                    Cancel
                </button>

                <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
                    {mutation.isPending ? "Creating..." : "Create note"}
                </button>
            </div>
        </form>
    );
}
