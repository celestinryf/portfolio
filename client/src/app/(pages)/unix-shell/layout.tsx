import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Shell in C",
  description: "Case study: a Unix shell built from scratch in C — processes, pipes, redirection, and signals.",
};

export default function UnixShellLayout({ children }: { children: React.ReactNode }) {
  return children;
}
