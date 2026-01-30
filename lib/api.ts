import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}

export interface CreateNotePayload {
    title: string,
    content: string,
    tag: NoteTag,
}

const noteApi = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
});

export const fetchNotes = async (page: number = 1, search: string = '', tag?: string): Promise<FetchNotesResponse> => {

    const { data } = await noteApi.get<FetchNotesResponse>('/notes', {
        params: { page, perPage: 12, search, tag },
    });

    return data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {

    const { data } = await noteApi.post<Note>('/notes', note);

    return data;
};

export const deleteNote = async (id: string): Promise<Note> => {

    const { data } = await noteApi.delete<Note>(`/notes/${id}`);

    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    
    const { data } = await noteApi.get<Note>(`/notes/${id}`)

    return data
}