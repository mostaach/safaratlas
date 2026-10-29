import { MetadataRoute } from "next";
import { ESCAPES_PACKAGES } from "../data/mockData";
import { BLOG_POSTS } from "../data/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://safaratlas.com";
  // Content revision date, not the build date: a changing lastmod on every
  // deploy teaches Google to ignore the signal.
  const contentUpdated = new Date("2026-10-29");

  return [
    { url: baseUrl, lastModified: contentUpdated, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/agafay`, lastModified: contentUpdated, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/taghazout`, lastModified: contentUpdated, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/marrakech`, lastModified: contentUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/journey`, lastModified: contentUpdated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/partners`, lastModified: contentUpdated, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: contentUpdated, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/legal/privacy`, lastModified: contentUpdated, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/terms`, lastModified: contentUpdated, changeFrequency: "yearly", priority: 0.2 },
    ...ESCAPES_PACKAGES.filter(pkg => pkg.slug !== "agafay-escape-1d" && pkg.slug !== "taghazout-escapes").map(pkg => ({
      url: `${baseUrl}/escapes/${pkg.slug}`,
      lastModified: contentUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...BLOG_POSTS.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
