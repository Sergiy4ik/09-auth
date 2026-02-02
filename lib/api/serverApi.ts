import type { Note } from "@/types/note";
import type { User } from "@/types/user";

import { nextServer } from "./api";
import { CheckSessionRequest, FetchNotesResponse } from "./clientApi";

export const fetchNotes = async (page: number = 1, search: string = '', tag?: string): Promise<FetchNotesResponse> => {
    const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
        params: { page, perPage: 12, search, tag },
    });

    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await nextServer.get<Note>(`/notes/${id}`)

    return data
}

export const checkSession = async () => {
    const response = await nextServer.get<CheckSessionRequest>("/auth/session");

    return response.data.success;
};

export const getMe = async () => {
    const response = await nextServer.get<User>("/users/me");

    return response.data;
};