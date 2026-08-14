import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Illuminance Esthetics",
  description: "Case study: a beauty school LMS shipped end to end with Next.js, Go, and PostgreSQL.",
};

export default function IlluminanceEstheticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
