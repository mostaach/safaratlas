import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "../../../data/blogData";
import { ESCAPES_PACKAGES } from "../../../data/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | SafarAtlas Journal`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const recommendedEscape = post.recommendedEscapeSlug
    ? ESCAPES_PACKAGES.find((e) => e.slug === post.recommendedEscapeSlug)
    : null;

  // Convert our simple markdown-ish content to paragraphs for display
  const contentBlocks = post.contentMarkdown
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);

  const renderBlock = (block: string, idx: number) => {
    if (block.startsWith("# ")) {
      return (
        <h1 key={idx} className="text-3xl sm:text-4xl font-serif font-black text-[#121a17] leading-tight mt-10 mb-4">
          {block.replace("# ", "")}
        </h1>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-[#121a17] mt-8 mb-3">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-base font-serif font-bold text-[#123b34] mt-6 mb-2">
          {block.replace("### ", "")}
        </h3>
      );
    }
    if (block === "---") {
      return <hr key={idx} className="border-[#e5dacb] my-8" />;
    }
    // Bold inline
    const rendered = block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <p
        key={idx}
        className="text-sm sm:text-base text-[#4e5e57] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#faf6f0]">

      {/* Cover Hero */}
      <div className="relative h-72 sm:h-[480px] w-full overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121a17] via-[#121a17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-4xl mx-auto">
          <div className="space-y-3 text-white">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#c95e3d]/90 text-white text-[10px] font-extrabold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-white/60">
                {post.publishedAt} · {post.readTime}
              </span>
            </div>
            <h1 className="text-2xl sm:text-5xl font-serif font-black leading-tight drop-shadow-md">
              {post.title}
            </h1>
            <p className="text-sm text-white/80 max-w-2xl">{post.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-4">

        {/* Author */}
        <div className="flex items-center gap-3 pb-6 border-b border-[#e5dacb]">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover border border-[#e5dacb]"
          />
          <div>
            <p className="text-xs font-bold text-[#121a17]">{post.author.name}</p>
            <p className="text-[10px] text-[#4e5e57]">{post.author.role}</p>
          </div>
        </div>

        {/* Content blocks */}
        <div className="space-y-5">
          {contentBlocks.map((block, idx) => renderBlock(block, idx))}
        </div>

        {/* Recommended Escape CTA Card */}
        {recommendedEscape && (
          <div className="mt-12 rounded-3xl overflow-hidden border border-[#e5dacb] bg-white shadow-xl">
            <div className="relative h-44 overflow-hidden">
              <img
                src={recommendedEscape.image}
                alt={recommendedEscape.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#f4c36b]">
                  📦 Recommended Escape Package
                </p>
                <h3 className="text-xl font-serif font-bold">{recommendedEscape.title}</h3>
              </div>
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#4e5e57] leading-relaxed max-w-md">
                  {recommendedEscape.summary}
                </p>
                <p className="text-lg font-serif font-black text-[#123b34] mt-1">
                  From €{recommendedEscape.priceFromEur}
                  <span className="text-xs font-normal text-[#4e5e57]"> / person</span>
                </p>
              </div>
              <Link
                href="/#escapes"
                className="shrink-0 px-6 py-3 rounded-2xl bg-[#c95e3d] hover:bg-[#aa4a2c] text-white text-xs font-black tracking-wide shadow-lg transition-all"
              >
                View This Escape →
              </Link>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-10 border-t border-[#e5dacb]">
          <Link
            href="/blog"
            className="text-xs font-bold text-[#4e5e57] hover:text-[#123b34] transition-colors"
          >
            ← All Articles
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-[#123b34] text-[#f4c36b] text-xs font-black tracking-widest hover:bg-[#0b110f] transition-all shadow-md"
          >
            Plan My Journey →
          </Link>
        </div>
      </div>
    </div>
  );
}
