import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { BLOG_POSTS } from "../../../data/blogData";
import { ESCAPES_PACKAGES } from "../../../data/mockData";
import { Header } from "../../../components/brand/Header";
import ArticleActions from "./ArticleActions";

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

  const url = `https://safaratlas.com/blog/${post.slug}`;
  const ogImage = post.coverImage.startsWith("http")
    ? post.coverImage
    : `https://safaratlas.com${post.coverImage}`;

  return {
    title: `${post.title} | SafarAtlas Journal`,
    description: post.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | SafarAtlas Journal`,
      description: post.summary,
      url,
      siteName: "SafarAtlas",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const recommendedEscape = post.recommendedEscapeSlug
    ? ESCAPES_PACKAGES.find((e) => e.slug === post.recommendedEscapeSlug)
    : null;

  // Related posts: same category, excluding current
  const related = BLOG_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 2);

  const contentBlocks = post.contentMarkdown
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);

  // Extract headings for table of contents
  const headings = contentBlocks
    .filter((b) => b.startsWith("## "))
    .map((b) => ({
      text: b.replace("## ", ""),
      id: b.replace("## ", "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));

  const renderBlock = (block: string, idx: number) => {
    if (block.startsWith("# ")) {
      return (
        <h1 key={idx} className="text-3xl sm:text-4xl font-serif font-black text-[#121a17] leading-tight mt-10 mb-4">
          {block.replace("# ", "")}
        </h1>
      );
    }
    if (block.startsWith("## ")) {
      const text = block.replace("## ", "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return (
        <h2 key={idx} id={id} className="text-xl sm:text-2xl font-serif font-bold text-[#121a17] mt-8 mb-3 scroll-mt-24">
          {text}
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
    // Handle markdown table (starts with |)
    if (block.startsWith("|")) {
      const rows = block.split("\n").filter((r) => r.trim() && !r.match(/^\|[-\s|]+\|$/));
      return (
        <div key={idx} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            {rows.map((row, ri) => {
              const cells = row.split("|").filter(Boolean).map((c) => c.trim());
              return ri === 0 ? (
                <thead key={ri}>
                  <tr className="bg-[#123b34] text-white">
                    {cells.map((c, ci) => (
                      <th key={ci} className="px-4 py-2.5 text-left text-[11px] font-extrabold uppercase tracking-wider">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
              ) : (
                <tbody key={ri}>
                  <tr className={ri % 2 === 0 ? "bg-white" : "bg-[#faf6f0]"}>
                    {cells.map((c, ci) => {
                      const rendered = c.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                      return (
                        <td
                          key={ci}
                          className="px-4 py-2.5 text-[#4e5e57] border-b border-[#e5dacb]"
                          dangerouslySetInnerHTML={{ __html: rendered }}
                        />
                      );
                    })}
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      );
    }
    // Bullet list
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={idx} className="space-y-1.5 my-3 ml-4">
          {items.map((item, ii) => {
            const rendered = item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            return (
              <li key={ii} className="text-sm text-[#4e5e57] leading-relaxed flex gap-2">
                <span className="text-[#c95e3d] mt-0.5 shrink-0">▸</span>
                <span dangerouslySetInnerHTML={{ __html: rendered }} />
              </li>
            );
          })}
        </ul>
      );
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

  const articleUrl = `https://safaratlas.com/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-[#faf6f0]">
      {/* Structured Data */}
      <Script
        id={`schema-blog-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${articleUrl}#article`,
                headline: post.title,
                description: post.summary,
                image: post.coverImage.startsWith("http")
                  ? post.coverImage
                  : `https://safaratlas.com${post.coverImage}`,
                datePublished: post.publishedAt,
                author: {
                  "@type": "Person",
                  name: post.author.name,
                  jobTitle: post.author.role,
                },
                publisher: {
                  "@type": "Organization",
                  name: "SafarAtlas",
                  url: "https://safaratlas.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://safaratlas.com/safar-atlas-logo.svg",
                  },
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": articleUrl,
                },
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${articleUrl}#breadcrumbs`,
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://safaratlas.com" },
                  { "@type": "ListItem", position: 2, name: "Journal", item: "https://safaratlas.com/blog" },
                  { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
                ],
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <Header variant="dark" />

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
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] text-white/50 font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Journal</Link>
              <span>/</span>
              <span className="text-white/70 truncate max-w-[200px]">{post.category}</span>
            </div>
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

      {/* Article layout: content + sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-12 items-start">

          {/* Main Content */}
          <article className="flex-1 min-w-0 space-y-4">

            {/* Author + share row */}
            <div className="flex items-center justify-between pb-6 border-b border-[#e5dacb]">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#e5dacb]"
                />
                <div>
                  <p className="text-xs font-bold text-[#121a17]">{post.author.name}</p>
                  <p className="text-[10px] text-[#4e5e57]">{post.author.role}</p>
                </div>
              </div>
              {/* Share buttons — client component */}
              <ArticleActions url={articleUrl} title={post.title} />
            </div>

            {/* Content blocks */}
            <div className="space-y-5">
              {contentBlocks.map((block, idx) => renderBlock(block, idx))}
            </div>

            {/* Recommended Escape CTA */}
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
                    <a
                      href={`https://wa.me/212698017323?text=Hi%20SafarAtlas%2C%20I%20read%20your%20article%20and%20I%27m%20interested%20in%20the%20${encodeURIComponent(recommendedEscape.title)}%20package.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#25D366]"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      Pricing via WhatsApp
                    </a>
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

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="mt-14">
                <h2 className="text-lg font-serif font-bold text-[#121a17] mb-6">
                  More {post.category} Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {related.map((rp) => (
                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="block group">
                      <div className="rounded-2xl overflow-hidden border border-[#e5dacb] bg-white shadow hover:shadow-lg transition-all">
                        <div className="relative h-36 overflow-hidden">
                          <img
                            src={rp.coverImage}
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-serif font-bold text-[#121a17] leading-snug group-hover:text-[#c95e3d] transition-colors line-clamp-2">
                            {rp.title}
                          </h3>
                          <p className="text-[11px] text-[#4e5e57] mt-1">
                            {rp.readTime} · Read →
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-10 border-t border-[#e5dacb] mt-8">
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
          </article>

          {/* Sticky Sidebar: Table of Contents */}
          {headings.length > 2 && (
            <aside className="hidden lg:block w-60 shrink-0 sticky top-24 self-start">
              <div className="rounded-2xl border border-[#e5dacb] bg-white p-5 shadow-sm">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#4e5e57] mb-4">
                  In This Article
                </p>
                <nav className="space-y-2">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="block text-xs text-[#4e5e57] hover:text-[#c95e3d] transition-colors leading-relaxed line-clamp-2 pl-2 border-l-2 border-transparent hover:border-[#c95e3d]"
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 pt-4 border-t border-[#e5dacb]">
                  <a
                    href={`https://wa.me/212698017323?text=Hi%20SafarAtlas%2C%20I%20was%20reading%20your%20article%20about%20${encodeURIComponent(post.title)}%20and%20I%27d%20like%20to%20plan%20a%20trip.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1da851] px-3 py-2 rounded-xl transition-colors w-full justify-center"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Plan My Trip
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
