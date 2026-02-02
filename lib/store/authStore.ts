import { User } from "@/types/user";
import { create } from "zustand";

import axios from "axios";

export const nextServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    withCredentials: true,
})

type AuthStore = {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user: User) => {
        set(() => ({ user, isAuthenticated: true }))
    },

    clearIsAuthenticated: () => {
        set(() => ({ user: null, isAuthenticated: false }));
    }
}));