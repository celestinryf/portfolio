import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Recommendation System",
  description: "Case study: a multi-stage home recommendation engine built on Zillow's 31M-row ZTRAX dataset.",
};

export default function HomeRecommendationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
