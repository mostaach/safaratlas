import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../../components/brand/Header";
import { Footer } from "../../../components/brand/Footer";
import { MOROCCO_FAQ, getFaqEntry } from "../../../data/faqData";

const BASE_URL = "https://safaratlas.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOROCCO_FAQ.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getFaqEntry(slug);
  if (!entry) return { title: "Question Not Found" };

  const url = `${BASE_URL}/morocco-faq/${entry.slug}`;
  return {
    title: entry.metaTitle,
    description: entry.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: entry.metaTitle,
      description: entry.metaDescription,
      url,
      siteName: "SafarAtlas",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: `${BASE_URL}/safaratlas_hero_typography.jpg`,
          width: 1200,
          height: 630,
          alt: entry.question,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.metaTitle,
      description: entry.metaDescription,
    },
  };
}

export default async function FaqQuestionPage({ params }: Props) {
  const { slug } = await params;
  const entry = getFaqEntry(slug);
  if (!entry) notFound();

  const url = `${BASE_URL}/morocco-faq/${entry.slug}`;
  const related = entry.related
    .map((relatedSlug) => getFaqEntry(relatedSlug))
    .filter((relatedEntry): relatedEntry is NonNullable<typeof relatedEntry> =>
      Boolean(relatedEntry)
    );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: entry.question,
        description: entry.metaDescription,
        mainEntityOfPage: url,
        inLanguage: "en",
        author: { "@type": "Organization", name: "SafarAtlas", url: BASE_URL },
        publisher: { "@type": "Organization", name: "SafarAtlas", url: BASE_URL },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Morocco Travel FAQ",
            item: `${BASE_URL}/morocco-faq`,
          },
          { "@type": "ListItem", position: 3, name: entry.question, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: entry.question,
            acceptedAnswer: { "@type": "Answer", text: entry.answer },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07192d] text-[#f6f2ec] font-sans">
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] font-mono uppercase tracking-widest text-[#f6f2ec]/50 mb-6 flex flex-wrap items-center gap-2"
          >
            <Link href="/" className="hover:text-[#C4A258] transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/morocco-faq" className="hover:text-[#C4A258] transition-colors">
              Morocco FAQ
            </Link>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
            {entry.question}
          </h1>

          <div className="mt-6 border-l-2 border-[#C4A258] bg-[#C4A258]/5 px-5 py-4">
            <p className="text-sm sm:text-base text-[#f6f2ec]/90 leading-relaxed">{entry.answer}</p>
          </div>

          <div className="mt-10 space-y-8">
            {entry.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f6f2ec] mb-3">
                  {section.heading}
                </h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm sm:text-base text-[#f6f2ec]/75 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 border border-[#C4A258]/30 bg-[#C4A258]/5 p-6">
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#C4A258]">
              Next step
            </p>
            <p className="mt-2 text-sm text-[#f6f2ec]/75 leading-relaxed">{entry.cta.note}</p>
            <Link
              href={entry.cta.href}
              className="mt-4 inline-flex items-center gap-2 bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] text-xs font-bold uppercase tracking-widest px-5 py-3 transition-colors"
            >
              {entry.cta.label}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="text-[11px] font-mono uppercase tracking-widest text-[#C4A258] mb-4">
                Related questions
              </h2>
              <ul className="space-y-3">
                {related.map((relatedEntry) => (
                  <li key={relatedEntry.slug}>
                    <Link
                      href={`/morocco-faq/${relatedEntry.slug}`}
                      className="text-sm text-[#f6f2ec]/75 hover:text-[#C4A258] transition-colors"
                    >
                      {relatedEntry.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Footer />
    </div>
  );
}
