import type { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";

import { nextServer } from "./api";

import { AxiosError } from "axios";

// TYPES START

export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}

export interface CreateNotePayload {
    title: string,
    content: string,
    tag: NoteTag,
}

export type RegisterRequest = {
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export interface updateUserRequest {
    email?: string;
    username: string;
};

export interface CheckSessionRequest {
    success: boolean;
};

export type apiError = AxiosError<{ error: string }>;

// TYPES END

// FUNCTIONS START

export const fetchNotes = async (page: number = 1, search: string = '', tag?: string): Promise<FetchNotesResponse> => {
    const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
        params: { page, perPage: 12, search, tag },
    });

    return data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
    const { data } = await nextServer.post<Note>('/notes', note);

    return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await nextServer.delete<Note>(`/notes/${id}`);

    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await nextServer.get<Note>(`/notes/${id}`)

    return data
}

export const register = async (data: RegisterRequest) => {
    const response = await nextServer.post<User>("/auth/register", data);

    return response.data;
};

export const login = async (data: LoginRequest) => {
    const response = await nextServer.post<User>("/auth/login", data);

    return response.data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post("/auth/logout");
};

export const checkSession = async () => {
    const response = await nextServer.get<CheckSessionRequest>("/auth/session");

    return response.data.success;
};

export const getMe = async () => {
    const response = await nextServer.get<User>("/users/me");

    return response.data;
};

export const updateMe = async (data: updateUserRequest) => {
    const response = await nextServer.patch<User>("/users/me", data);

    return response.data;
};

// FUNCTIONS END