"use client";

const rows = [
  {
    label: "Experience",
    us: "Managed from start to finish",
    typical: "DIY: book, coordinate, troubleshoot.",
    highlight: true,
  },
  {
    label: "Transport",
    us: "Private pickup, confirmed driver",
    typical: "Rental car, shared taxi, confusion.",
  },
  {
    label: "Accommodation",
    us: "Vetted riads & desert camps",
    typical: "TripAdvisor lottery.",
  },
  {
    label: "Booking",
    us: "Human. Direct WhatsApp. No forms.",
    typical: "Forms, deposits, waiting.",
  },
];

export default function EditorialComparison() {
  return (
    <section
      id="compare"
      className="relative w-full overflow-hidden bg-[#07192d] py-28 md:py-40 border-t border-[#C4A258]/15"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          {/* Left header col */}
          <header className="col-span-12 md:col-span-4">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#C4A258]">
              <span className="h-px w-8 bg-[#C4A258]" />
              The Alternative
            </p>
            <h2
              className="mt-8 font-serif font-medium leading-[1.02] tracking-tight text-[#f6f2ec] text-balance"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
            >
              Same Morocco.{" "}
              <br className="hidden md:block" />
              <span className="italic text-[#f6f2ec]/70">
                Better way to live it.
              </span>
            </h2>
            <p className="mt-8 max-w-sm font-sans text-base font-light leading-relaxed text-[#f6f2ec]/70">
              SafarAtlas is for travelers who value time and peace of mind. We keep it personal,
              focused, and stress-free — no bus tours, no logistics fog.
            </p>
          </header>

          {/* Right table col */}
          <div className="col-span-12 md:col-span-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-5 pr-4 text-[10px] font-normal uppercase tracking-[0.3em] text-[#f6f2ec]/50 w-1/3">
                      &nbsp;
                    </th>
                    <th className="py-5 pr-4 align-bottom w-1/3">
                      <span className="block font-serif text-xl italic text-[#C4A258] md:text-2xl">
                        SafarAtlas
                      </span>
                      <span className="mt-1 block text-[9px] uppercase tracking-[0.3em] text-[#C4A258]/70">
                        Managed escape
                      </span>
                    </th>
                    <th className="py-5 pr-4 align-bottom w-1/3">
                      <span className="block font-serif text-xl text-[#f6f2ec]/60 md:text-2xl">
                        Typical
                      </span>
                      <span className="mt-1 block text-[9px] uppercase tracking-[0.3em] text-[#f6f2ec]/40">
                        Solo planning
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.label}
                      className="group border-b border-white/5 transition-colors duration-300 hover:bg-white/[0.02]"
                    >
                      <td className="py-6 pr-4 align-top text-[10px] uppercase tracking-[0.3em] text-[#f6f2ec]/60">
                        {row.label}
                      </td>
                      <td
                        className={`py-6 pr-4 align-top font-serif text-base leading-snug md:text-lg ${
                          row.highlight ? "text-[#C4A258]" : "text-[#f6f2ec]"
                        }`}
                      >
                        {row.us}
                      </td>
                      <td className="py-6 pr-4 align-top font-sans text-sm font-light leading-snug text-[#f6f2ec]/50">
                        {row.typical}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
