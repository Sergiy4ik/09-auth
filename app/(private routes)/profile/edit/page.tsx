"use client";

import css from "./editPage.module.css"

import Image from "next/image";
import toast from "react-hot-toast";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { apiError, updateMe, updateUserRequest } from "@/lib/api/clientApi";

export default function EditProfile() {
    const { email, username, avatar } = useAuthStore((state) => state.user) || {};
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (formData: FormData) => {
        try {
            const formValues = Object.fromEntries(formData) as updateUserRequest;

            const updatedFormValues = {
                ...formValues,
                email: email,
            };

            const res = await updateMe(updatedFormValues);
            if (res) {
                setUser(res);
                router.push("/profile");
            }
        } catch (error) {
            toast.error("Something went wrong...")
            setError(
                (error as apiError).response?.data?.error ??
                (error as apiError).message ??
                "Something went wrong...",
            )
        }
    };

    const handleCancel = () => {
        router.push("/profile");
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={avatar || "/file.svg"}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form action={handleSubmit} className={css.profileInfo}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            defaultValue={username}
                            id="username"
                            name="username"
                            type="text"
                            className={css.input}
                        />
                    </div>
                    <p>
                        Email: <strong>{email}</strong>
                    </p>
                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            type="button"
                            className={css.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                    {error && <p className={css.error}>{error}</p>}
                </form>
            </div>
        </main>
    );
}