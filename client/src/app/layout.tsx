import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from "./components/layout/Topbar";
import Footer from "./components/layout/Footer";
import DarkModeToggle from "../app/components/LightDark";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.celestinryf.com"),
  title: {
    default: "Celestin Ryf",
    template: "%s — Celestin Ryf",
  },
  description: "Portfolio of Celestin Ryf, a software engineer specializing in full-stack development and systems design.",
  openGraph: {
    title: "Celestin Ryf",
    description: "Software engineer and CS student at the University of Washington. Work history, project case studies, and contact.",
    url: "/",
    siteName: "Celestin Ryf",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celestin Ryf",
    description: "Software engineer and CS student at the University of Washington.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Topbar />
        
        <DarkModeToggle />

        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}