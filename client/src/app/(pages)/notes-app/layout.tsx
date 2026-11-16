import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes App",
  description: "Case study: building a local-first, tray-resident notes app with Electron, TypeScript, SQLite FTS5, and Rust WebAssembly engines.",
};

export default function NotesAppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
