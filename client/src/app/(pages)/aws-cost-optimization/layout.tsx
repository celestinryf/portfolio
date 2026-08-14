import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AWS Cost Optimization",
  description: "Case study: an automated S3 cost optimizer with risk scoring and rollback snapshots, deployed serverless with Terraform.",
};

export default function AwsCostOptimizationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
