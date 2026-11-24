import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/brand/Header";
import { Footer } from "../../components/brand/Footer";
import { MOROCCO_FAQ } from "../../data/faqData";

const BASE_URL = "https://safaratlas.com";
const URL = `${BASE_URL}/morocco-faq`;

export const metadata: Metadata = {
  title: "Morocco Travel FAQ | SafarAtlas",
  description:
    "Straight answers about Morocco travel: Agafay desert prices and drive times, Sahara tour length, Taghazout surfing, Marrakech day trips and the best time to visit.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Morocco Travel FAQ | SafarAtlas",
    description:
      "Straight answers about Agafay, the Sahara, Taghazout and Marrakech, from the team that runs the trips.",
    url: URL,
    siteName: "SafarAtlas",
    type: "website",
    locale: "en_US",
  },
};

export default function MoroccoFaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${URL}#faq`,
    mainEntity: MOROCCO_FAQ.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07192d] text-[#f6f2ec] font-sans">
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C4A258] block">
              Morocco Travel Answers
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight">
              Morocco Travel FAQ
            </h1>
            <p className="text-[#f6f2ec]/70 leading-relaxed">
              Short, honest answers to the questions we get most often. Each answer links to the
              escape or guide that covers it in detail.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOROCCO_FAQ.map((entry) => (
              <Link
                key={entry.slug}
                href={`/morocco-faq/${entry.slug}`}
                className="group block border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:border-[#C4A258]/50 hover:bg-white/[0.05] transition-colors"
              >
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#f6f2ec] group-hover:text-[#C4A258] transition-colors">
                  {entry.question}
                </h2>
                <p className="mt-2 text-sm text-[#f6f2ec]/65 leading-relaxed line-clamp-3">
                  {entry.answer}
                </p>
                <span className="mt-4 inline-block text-[11px] font-mono uppercase tracking-widest text-[#C4A258]">
                  Read the answer &rarr;
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-14 border border-[#C4A258]/30 bg-[#C4A258]/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#f6f2ec]">
                Still deciding what fits your trip?
              </h2>
              <p className="mt-1 text-sm text-[#f6f2ec]/70">
                Build a route in 60 seconds, or message our concierge on WhatsApp.
              </p>
            </div>
            <Link
              href="/journey"
              className="inline-flex items-center justify-center bg-[#C4A258] hover:bg-[#d8bb78] text-[#07192d] text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors shrink-0"
            >
              Plan my journey
            </Link>
          </div>
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Footer />
    </div>
  );
}
