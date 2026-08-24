import { MetadataRoute } from "next";
import { ESCAPES_PACKAGES } from "../data/mockData";
import { BLOG_POSTS } from "../data/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://safaratlas.com").replace(/\/$/, "");
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/journey`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/partners`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/legal/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    ...ESCAPES_PACKAGES.map(pkg => ({ url: `${baseUrl}/escapes/${pkg.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...BLOG_POSTS.map(post => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
