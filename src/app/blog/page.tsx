import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "../../data/blogData";

export const metadata: Metadata = {
  title: "SafarAtlas Journal | Morocco Travel Guides & Insider Escapes",
  description:
    "Discover expert Morocco travel guides — choosing the right desert, planning a 7-day managed journey, and uncovering the best coastal escapes.",
};

const categoryColors: Record<string, string> = {
  "Desert Guides": "bg-[#c95e3d]/10 text-[#c95e3d] border-[#c95e3d]/20",
  "Trip Architecture": "bg-[#123b34]/10 text-[#123b34] border-[#123b34]/20",
  "Coastal Travel": "bg-[#0369a1]/10 text-[#0369a1] border-[#0369a1]/20",
  "Insider Tips": "bg-[#f4c36b]/20 text-[#7a5a00] border-[#f4c36b]/40",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="min-h-screen bg-[#faf6f0]">
      {/* Header */}
      <div className="bg-[#123b34] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4c36b]/20 border border-[#f4c36b]/30 text-[#f4c36b] text-xs font-extrabold uppercase tracking-widest">
            ✍️ SafarAtlas Journal
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight">
            Morocco Travel Guides
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
            Insider knowledge from local scouts. Plan smarter, travel deeper.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Featured Post */}
        <Link href={`/blog/${featured.slug}`} className="block group">
          <div className="rounded-3xl overflow-hidden border border-[#e5dacb] bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="relative h-72 sm:h-96">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-5 left-5">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${categoryColors[featured.category]}`}
                >
                  {featured.category}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-bold text-[#f4c36b] mb-2">
                  ★ Featured Guide
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-black leading-tight">
                  {featured.title}
                </h2>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-[#4e5e57] leading-relaxed line-clamp-2">
                  {featured.summary}
                </p>
                <p className="text-xs text-[#4e5e57] font-semibold">
                  {featured.publishedAt} · {featured.readTime}
                </p>
              </div>
              <span className="shrink-0 text-xs font-black text-[#c95e3d] group-hover:translate-x-1 transition-transform">
                Read →
              </span>
            </div>
          </div>
        </Link>

        {/* Rest of Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="rounded-3xl overflow-hidden border border-[#e5dacb] bg-white shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-52 overflow-hidden shrink-0">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${categoryColors[post.category]}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <h2 className="text-lg font-serif font-bold text-[#121a17] leading-snug group-hover:text-[#c95e3d] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#4e5e57] leading-relaxed line-clamp-3 flex-1">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#e5dacb]">
                    <span className="text-xs text-[#4e5e57] font-semibold">
                      {post.publishedAt} · {post.readTime}
                    </span>
                    <span className="text-xs font-black text-[#c95e3d] group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to site */}
        <div className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123b34] text-[#f4c36b] text-xs font-black tracking-widest hover:bg-[#0b110f] transition-all shadow-lg"
          >
            ← Back to SafarAtlas
          </Link>
        </div>
      </div>
    </div>
  );
}
