import { SiTripadvisor } from "react-icons/si";

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
      className="relative w-full overflow-hidden bg-[#07192d] py-28 md:py-40 border-t border-[#C4A258]/15"
    >
      <div className="container-editorial">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-[#C4A258]">
            <span className="h-px w-8 bg-[#C4A258]" />
            Traveller Stories
            <span className="h-px w-8 bg-[#C4A258]" />
          </p>
          <h2
            className="mt-6 font-serif font-medium leading-tight tracking-tight text-[#f6f2ec]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            What they say{" "}
            <span className="italic text-[#C4A258]">after the journey.</span>
          </h2>
        </div>

        {/* Quote grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="group relative border border-[#C4A258]/15 bg-[#0a1e34]/70 p-8 md:p-12 transition-all duration-700 hover:border-[#C4A258]/40"
            >
              {/* Decorative quotation watermark */}
              <span className="absolute -top-6 -left-3 pointer-events-none font-serif text-[8rem] leading-none text-[#C4A258]/5 opacity-20 transition-all duration-700 group-hover:opacity-40 select-none">
                &ldquo;
              </span>

              <blockquote className="relative z-10 font-serif italic text-lg leading-relaxed text-[#f6f2ec]/90 md:text-xl">
                {q.quote}
              </blockquote>

              <div className="mt-10 flex items-center gap-5">
                <div className="h-px w-10 bg-[#C4A258]/40" />
                <div>
                  <cite className="block font-serif text-base not-italic text-[#C4A258]">
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
            className="group inline-flex items-center gap-3.5 border border-[#f6f2ec]/15 px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-[#f6f2ec]/60 transition-all duration-300 hover:border-[#C4A258]/50 hover:text-[#C4A258]"
          >
            <SiTripadvisor className="w-4 h-4 text-[#C4A258] shrink-0 transition-transform duration-300 group-hover:scale-110" />
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
