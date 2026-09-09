import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "../../data/blogData";
import { Header } from "../../components/brand/Header";
import BlogGrid from "./BlogGrid";

export default function BlogPage() {
  // Sort posts newest-first so featured = most recent
  const sorted = [...BLOG_POSTS].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <div className="min-h-screen bg-[#faf6f0]">
      {/* Consistent brand header */}
      <Header variant="dark" />

      {/* Page Header */}
      <div className="bg-[#123b34] text-white pt-28 pb-16 px-4">
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
          <p className="text-xs text-white/40">
            {BLOG_POSTS.length} articles · Updated {sorted[0].publishedAt}
          </p>
        </div>
      </div>

      {/* Blog Grid with category filter */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <BlogGrid posts={sorted} />
      </div>

      {/* Back to site */}
      <div className="text-center pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123b34] text-[#f4c36b] text-xs font-black tracking-widest hover:bg-[#0b110f] transition-all shadow-lg"
        >
          ← Back to SafarAtlas
        </Link>
      </div>
    </div>
  );
}
