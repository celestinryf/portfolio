import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Featured projects and case studies: AI agent tooling, full-stack platforms, ML systems, and more.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
