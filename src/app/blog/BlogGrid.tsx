"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogPost } from "../../data/blogData";

const ALL = "All";

const CATEGORIES = [
  ALL,
  "Desert Guides",
  "Trip Architecture",
  "Coastal Travel",
  "Insider Tips",
] as const;

const categoryColors: Record<string, string> = {
  "Desert Guides": "bg-[#c95e3d]/10 text-[#c95e3d] border-[#c95e3d]/30",
  "Trip Architecture": "bg-[#123b34]/10 text-[#123b34] border-[#123b34]/30",
  "Coastal Travel": "bg-[#0369a1]/10 text-[#0369a1] border-[#0369a1]/30",
  "Insider Tips": "bg-[#f4c36b]/20 text-[#7a5a00] border-[#f4c36b]/40",
};

const categoryTabColors: Record<string, string> = {
  All: "bg-[#121a17] text-white border-[#121a17]",
  "Desert Guides": "bg-[#c95e3d] text-white border-[#c95e3d]",
  "Trip Architecture": "bg-[#123b34] text-white border-[#123b34]",
  "Coastal Travel": "bg-[#0369a1] text-white border-[#0369a1]",
  "Insider Tips": "bg-[#7a5a00] text-white border-[#7a5a00]",
};

interface Props {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const filtered =
    activeCategory === ALL
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div className="space-y-12">
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const activeStyle = isActive
            ? categoryTabColors[cat]
            : "bg-white text-[#4e5e57] border-[#e5dacb] hover:border-[#121a17]/30";
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest border transition-all duration-200 ${activeStyle}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-[#4e5e57] py-12">
          No articles in this category yet.
        </p>
      )}

      {/* Featured Post */}
      {featured && (
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
                  ★ {activeCategory === ALL ? "Featured Guide" : `Top ${activeCategory} Read`}
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-black leading-tight">
                  {featured.title}
                </h2>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm text-[#4e5e57] leading-relaxed line-clamp-2">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#e5dacb]"
                  />
                  <span className="text-xs text-[#4e5e57] font-semibold">
                    {featured.author.name} · {featured.publishedAt} · {featured.readTime}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-xs font-black text-[#c95e3d] group-hover:translate-x-1 transition-transform">
                Read →
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Posts Grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
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
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-5 h-5 rounded-full object-cover border border-[#e5dacb]"
                      />
                      <span className="text-[11px] text-[#4e5e57] font-semibold">
                        {post.author.name} · {post.readTime}
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#c95e3d] group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
