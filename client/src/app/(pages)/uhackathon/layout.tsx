import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UHackathon",
  description: "Case study: founding the largest hackathon south of Seattle, with 100+ competitors.",
};

export default function UhackathonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
