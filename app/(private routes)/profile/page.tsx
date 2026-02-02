import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Profile",
    description: "View profile",
    openGraph: {
        title: "My Profile",
        description: "View profile",
        type: "article",
        url: "https://localhost:3000/",
    },
};

export default function Profile() {
    return (
        <Profile />
    )


}