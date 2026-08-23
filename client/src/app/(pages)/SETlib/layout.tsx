import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SETlib",
  description: "Case study: a worksheet management platform for UW Tacoma faculty built with Spring Boot and AWS.",
};

export default function SetlibLayout({ children }: { children: React.ReactNode }) {
  return children;
}
