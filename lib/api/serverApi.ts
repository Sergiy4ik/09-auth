import type { Note } from "@/types/note";
import type { User } from "@/types/user";

import { nextServer } from "./api";
import { CheckSessionRequest, FetchNotesResponse } from "./clientApi";

import { cookies } from "next/headers";

export const fetchNotes = async (page: number = 1, search: string = '', tag?: string): Promise<FetchNotesResponse> => {
    const cookieStore = await cookies()

    const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
        params: { page, perPage: 12, search, tag },
        headers: {
            Cookie: cookieStore.toString()
        }
    });

    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieStore = await cookies()

    const { data } = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    return data
}

export const checkSession = async () => {
    const cookieStore = await cookies();

    const response = await nextServer.get<CheckSessionRequest>("/auth/session", {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    return response;
};

export const getMe = async () => {
    const cookieStore = await cookies()

    const { data } = await nextServer.get<User>("/users/me", {
        headers: {
            Cookie: cookieStore.toString()
        }
    });

    return data;
};