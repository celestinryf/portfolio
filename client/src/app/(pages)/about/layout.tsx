import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer, CS student at the University of Washington, club founder, and hackathon organizer.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
