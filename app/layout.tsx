import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { Toaster } from "react-hot-toast";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://08-zustand-plum-ten.vercel.app/"),
  title: "NoteHub",
  description: "A web application where you can store your notes",
  openGraph: {
    title: "NoteHub",
    description: "A web application where you can store your notes",
    url: "https://08-zustand-plum-ten.vercel.app/",
    images: [{
      url: "/notehub-og-meta.jpg",
      alt: "banner, company logo",
      width: 1200,
      height: 630,
    }]
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>

        <TanStackProvider>
          <AuthProvider>
            <Header />

            <main>
              {children}
              {modal}
              <Toaster position="top-center" reverseOrder={false} />
            </main>

            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
