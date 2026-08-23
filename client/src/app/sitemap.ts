import type { MetadataRoute } from "next";
import { PROJECTS } from "@/app/data/projects";

const BASE = "https://www.celestinryf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/work", "/about", "/contact"];
  const projectPaths = PROJECTS.map((p) => `/${p.slug}`);

  return [...staticPaths, ...projectPaths].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));
}
