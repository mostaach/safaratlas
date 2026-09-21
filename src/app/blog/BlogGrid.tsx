"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  "Desert Guides": "bg-[#C4A258]/15 text-[#C4A258] border-[#C4A258]/30",
  "Trip Architecture": "bg-[#C4A258]/10 text-[#d6b78a] border-[#d6b78a]/30",
  "Coastal Travel": "bg-[#0369a1]/20 text-[#60b4f4] border-[#60b4f4]/30",
  "Insider Tips": "bg-[#C4A258]/15 text-[#C4A258] border-[#C4A258]/30",
};

const categoryTabColors: Record<string, string> = {
  All: "bg-[#C4A258] text-[#07192d] border-[#C4A258]",
  "Desert Guides": "bg-[#C4A258] text-[#07192d] border-[#C4A258]",
  "Trip Architecture": "bg-[#d6b78a] text-[#07192d] border-[#d6b78a]",
  "Coastal Travel": "bg-[#0369a1] text-white border-[#0369a1]",
  "Insider Tips": "bg-[#C4A258] text-[#07192d] border-[#C4A258]",
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
            : "bg-white/5 text-[#f6f2ec]/70 border-white/10 hover:border-[#C4A258]/40";
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
        <p className="text-center text-sm text-[#f6f2ec]/50 py-12">
          No articles in this category yet.
        </p>
      )}

      {/* Featured Post */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="block group">
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0d2239]/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="relative h-72 sm:h-96">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="(min-width: 768px) 80vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
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
                <p className="text-xs font-bold text-[#C4A258] mb-2">
                  ★ {activeCategory === ALL ? "Featured Guide" : `Top ${activeCategory} Read`}
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-black leading-tight">
                  {featured.title}
                </h2>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm text-[#f6f2ec]/70 leading-relaxed line-clamp-2">
                  {featured.summary}
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover border border-white/20"
                  />
                  <span className="text-xs text-[#f6f2ec]/50 font-semibold">
                    {featured.author.name} · {featured.publishedAt} · {featured.readTime}
                  </span>
                </div>
              </div>
              <span className="shrink-0 text-xs font-black text-[#C4A258] group-hover:translate-x-1 transition-transform">
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
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0d2239]/80 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                <div className="relative h-52 overflow-hidden shrink-0">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
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
                  <h2 className="text-lg font-serif font-bold text-[#f6f2ec] leading-snug group-hover:text-[#C4A258] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#f6f2ec]/70 leading-relaxed line-clamp-3 flex-1">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 rounded-full object-cover border border-white/20"
                      />
                      <span className="text-[11px] text-[#f6f2ec]/50 font-semibold">
                        {post.author.name} · {post.readTime}
                      </span>
                    </div>
                    <span className="text-xs font-black text-[#C4A258] group-hover:translate-x-1 transition-transform">
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
