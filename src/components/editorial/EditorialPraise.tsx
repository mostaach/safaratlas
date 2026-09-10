"use client";

const quotes = [
  {
    quote:
      "We arrived exhausted after the flight. By sunset we were in the Sahara. It felt impossible — and SafarAtlas made it effortless.",
    name: "Laura M.",
    detail: "Amsterdam · Sahara 3-Day Journey",
  },
  {
    quote:
      "No forms, no waiting. One WhatsApp message and everything was arranged. The riad, the camel, the driver — all perfect.",
    name: "James & Sophie",
    detail: "London · Agafay Escape",
  },
  {
    quote:
      "The guide in Imlil was extraordinary. We walked through villages that felt completely untouched. Our best travel memory of the year.",
    name: "Marc D.",
    detail: "Lyon · High Atlas Day Escape",
  },
  {
    quote:
      "I was nervous about Morocco solo. SafarAtlas removed every concern before I even asked. Completely trustworthy.",
    name: "Nora K.",
    detail: "Berlin · Taghazout Coastal Escape",
  },
];

export default function EditorialPraise() {
  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#080c10] py-28 md:py-40"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#d6b78a]">
            <span className="h-px w-8 bg-[#d6b78a]" />
            Traveller Stories
            <span className="h-px w-8 bg-[#d6b78a]" />
          </p>
          <h2
            className="mt-6 font-serif font-medium leading-tight tracking-tight text-[#f6f2ec]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            What they say{" "}
            <span className="italic text-[#d6b78a]">after the journey.</span>
          </h2>
        </div>

        {/* Quote grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="group relative border border-[#f6f2ec]/10 bg-[#f6f2ec]/[0.01] p-8 md:p-12 transition-all duration-700 hover:border-[#d6b78a]/30"
            >
              {/* Decorative quotation watermark */}
              <span className="absolute -top-6 -left-3 pointer-events-none font-serif text-[8rem] leading-none text-[#d6b78a]/5 opacity-20 transition-all duration-700 group-hover:opacity-40 select-none">
                &ldquo;
              </span>

              <blockquote className="relative z-10 font-serif italic text-lg leading-relaxed text-[#f6f2ec]/90 md:text-xl">
                {q.quote}
              </blockquote>

              <div className="mt-10 flex items-center gap-5">
                <div className="h-px w-10 bg-[#d6b78a]/40" />
                <div>
                  <cite className="block font-serif text-base not-italic text-[#d6b78a]">
                    {q.name}
                  </cite>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-[#f6f2ec]/40">
                    {q.detail}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TripAdvisor link */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g293734-d34660267-Reviews-Safaratlas-Marrakech_Marrakech_Safi.html"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 border border-[#f6f2ec]/15 px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-[#f6f2ec]/50 transition-all duration-300 hover:border-[#d6b78a]/50 hover:text-[#d6b78a]"
          >
            <span>Read all reviews on TripAdvisor</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
