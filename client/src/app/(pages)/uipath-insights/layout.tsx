import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UiPath Insights CLI",
  description: "Case study: teaching AI agents to run UiPath's analytics product through typed CLI commands, MCP, and an agent skill.",
};

export default function UipathInsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
