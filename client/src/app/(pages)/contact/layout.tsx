import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about roles, projects, or collaborations.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
