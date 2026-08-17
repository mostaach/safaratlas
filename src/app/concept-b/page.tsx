"use client";

import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Heart, MapPin, Search, Star, Users } from "lucide-react";
import { FormEvent, useState } from "react";

const nearby = [
  ["Villa, Kemah Tinggi", "/concept-b/figma-01.jpeg", "$ 990"],
  ["Villa, Kemah Tinggi", "/concept-b/figma-06.jpeg", "$ 990"],
  ["Villa, Kuta Premiere", "/concept-b/figma-17.jpeg", "$ 920"],
  ["Villa, Kuta Premiere", "/concept-b/figma-11.jpeg", "$ 920"],
  ["Villa, Kemah Tinggi", "/concept-b/figma-19.jpeg", "$ 990"],
];

const propertyTypes = [
  ["Hotels", "/concept-b/gallery-2.jpeg"],
  ["Apartments", "/concept-b/gallery-1.jpeg"],
  ["Resorts", "/concept-b/gallery-3.jpeg"],
  ["Villas", "/concept-b/gallery-4.jpeg"],
  ["Cottages", "/concept-b/figma-11.jpeg"],
];

function Arrow({ direction }: { direction: "left" | "right" }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return <button aria-label={`Show ${direction === "left" ? "previous" : "next"} items`} className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#c8c5c0] text-white transition hover:bg-[#c49c74]"><Icon className="size-4" /></button>;
}

export default function ConceptBPage() {
  const [place, setPlace] = useState("Stavanger, Norway");
  const [subscribed, setSubscribed] = useState(false);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("nearby")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f0efef] font-sans text-[#252525]">
      <section className="relative isolate min-h-[620px] overflow-hidden text-white sm:min-h-[700px] lg:min-h-[760px]">
        <img src="/concept-b/figma-02.jpeg" alt="Mountain lodge at sunset" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(30,30,30,.28),rgba(0,0,0,.64))]" />

        <nav className="relative mx-auto flex max-w-[1320px] items-start justify-between px-5 pt-5 sm:px-8 sm:pt-7">
          <a href="/" className="pt-0.5 text-lg font-medium tracking-tight sm:text-2xl">Bookme.<span className="text-[.48em]">com</span></a>
          <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 items-center gap-12 rounded-b-[2rem] bg-[#f0efef] px-14 py-5 text-[11px] font-semibold text-[#252525] shadow-sm lg:flex">
            <a href="#footer" className="hover:text-[#c49c74]">List your property</a>
            <a href="#benefits" className="hover:text-[#c49c74]">Support</a>
            <a href="#nearby" className="hover:text-[#c49c74]">Trips</a>
            <a href="#footer" className="hover:text-[#c49c74]">Sing in</a>
          </div>
          <button className="flex items-center gap-1 rounded-full border border-white/80 px-3 py-1.5 text-[10px] font-medium transition hover:bg-white hover:text-[#252525] sm:px-4 sm:text-xs">Get the app <span className="text-base leading-none">↓</span></button>
        </nav>

        <div className="mx-auto max-w-[1320px] px-5 pt-20 sm:px-8 sm:pt-28 lg:pt-36">
          <h1 className="max-w-2xl text-5xl font-medium leading-[.93] tracking-[-.05em] drop-shadow sm:text-7xl lg:text-[88px]">Explore your place<br />to stay</h1>
          <form onSubmit={submitSearch} className="mt-8 flex max-w-[900px] flex-col gap-2 rounded-[24px] bg-[#1d1d1d]/80 p-3 shadow-xl backdrop-blur-sm sm:flex-row sm:items-center sm:rounded-[25px]">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-[#252525] px-4 py-3 text-[#ccc] shadow-inner">
              <Search className="size-4 shrink-0" />
              <input value={place} onChange={(event) => setPlace(event.target.value)} aria-label="Destination" className="min-w-0 flex-1 bg-transparent text-xs outline-none" />
            </label>
            <div className="flex items-center rounded-xl bg-[#252525] px-4 py-3 text-xs text-[#ccc] shadow-inner sm:w-56"><CalendarDays className="mr-2 size-4" /><span>Check in</span><span className="mx-3 h-5 border-l border-white/15" /><span>Checkout</span></div>
            <div className="flex items-center gap-2 rounded-xl bg-[#252525] px-4 py-3 text-xs text-[#ccc] shadow-inner sm:w-40"><Users className="size-4" /><span className="flex-1">Guests</span><ChevronDown className="size-4" /></div>
            <button type="submit" className="rounded-xl bg-[#c49c74] px-7 py-3 text-xs font-bold text-[#252525] shadow-[inset_1px_1px_2px_rgba(255,255,255,.35),inset_-1px_-2px_2px_rgba(0,0,0,.25)] transition hover:bg-[#d8b48b]">Checkout</button>
          </form>
          <div className="ml-auto mt-12 max-w-[390px] border-l-2 border-[#f0efef] pl-4 sm:mt-16">
            <h2 className="text-xl font-bold leading-[1.08] sm:text-2xl">We provide a variety of the best lodging accommodations for those of you who need it.</h2>
            <p className="mt-2 text-[11px] text-white/80">Don&apos;t worry about the quality of the service.</p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-5 rounded-t-[50%] bg-[#f0efef] sm:h-7" />
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1"><i className="h-1 w-4 rounded-full bg-[#d1d0cd]" /><i className="h-1 w-7 rounded-full bg-[#252525]" /><i className="h-1 w-4 rounded-full bg-[#d1d0cd]" /></div>
      </section>

      <section id="nearby" className="mx-auto max-w-[1320px] px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-18">
        <h2 className="text-center text-xl font-bold sm:text-2xl">Hotels in your area</h2>
        <div className="mt-8 flex items-center justify-center gap-3 sm:mt-12 sm:gap-5">
          <Arrow direction="left" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-5">
            {nearby.map(([name, image, price]) => <article key={image} className="w-[130px] sm:w-[160px]">
              <div className="group relative h-40 overflow-hidden rounded-2xl bg-[#ddd] shadow-[0_3px_8px_rgba(0,0,0,.18)] sm:h-48">
                <img src={image} alt={name} className="size-full object-cover" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2"><span className="flex items-center gap-1 rounded-full bg-white/30 px-2 py-1 text-[8px] text-white backdrop-blur"><Star className="size-2.5 fill-white" />4.95</span><Heart className="size-3.5 text-white" /></div>
              </div>
              <div className="mt-2 flex items-center justify-between gap-1 text-[9px] font-bold"><span className="truncate">{name}</span><span className="text-[#c49c74]">{price}</span></div>
              <div className="mt-1 flex gap-2 text-[7px] text-[#999]"><span>▰ 3 bedrooms</span><span>♟ 2 guests</span></div>
            </article>)}
          </div>
          <Arrow direction="right" />
        </div>
      </section>

      <section id="benefits" className="bg-[#1d1d1d] text-white">
        <div className="mx-auto grid max-w-[1160px] gap-8 px-8 py-14 text-center sm:grid-cols-3 sm:py-16">
          {[["See it all", "From local hotels to global brands, discover millions of rooms all around the world."], ["Compare right here", "No need to search anywhere else. The biggest names in travel are right here."], ["Get exclusive rates", "We&apos;ve special deals with the world&apos;s leading hotels and the savings with you."]].map(([title, copy]) => <div key={title}><h3 className="text-base font-bold">{title}</h3><p className="mx-auto mt-4 max-w-[240px] text-[10px] leading-relaxed text-white/70">{copy}</p></div>)}
        </div>
      </section>

      <section className="relative mx-auto max-w-[1320px] overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="relative z-10 max-w-[690px]">
          <h2 className="text-3xl font-bold tracking-[-.04em] sm:text-5xl">Browse by property type</h2>
          <p className="mt-5 max-w-[660px] text-sm font-medium leading-relaxed sm:text-base">you can easily browse and filter your search by property type. This feature allows you to select hotels or alternative options, such as hostels, vacation rentals, or bed and breakfasts, based on your preferences and specific needs for your stay.</p>
        </div>
        <p className="absolute right-8 top-[220px] text-4xl font-bold tracking-wider text-black/20 sm:text-6xl">2018–2024</p>
        <div className="mt-14 flex items-center justify-center gap-3 sm:mt-20 sm:gap-5"><Arrow direction="left" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">{propertyTypes.map(([title, image]) => <article key={title} className="w-[135px] text-center sm:w-[172px]"><h3 className="mb-3 text-xs font-bold">{title}</h3><img src={image} alt={title} className="h-48 w-full rounded-xl object-cover shadow-sm sm:h-72" /></article>)}</div><Arrow direction="right" /></div>
        <div className="mt-7 flex justify-center gap-1"><i className="h-1 w-4 rounded-full bg-[#ccc]" /><i className="h-1 w-7 rounded-full bg-[#252525]" /><i className="h-1 w-4 rounded-full bg-[#ccc]" /></div>
      </section>

      <section className="bg-[#252525] text-white">
        <div className="mx-auto grid max-w-[1120px] gap-12 px-8 py-20 sm:grid-cols-[1.1fr_.9fr] sm:py-24">
          <div><h2 className="text-2xl font-bold">Stay in the know</h2><p className="mt-4 max-w-md text-sm leading-[1.2] text-white/70">Sign up to get marketing emails from Bookme.com, including promotions, rewards, travel experiences, and information about Bookme.com Transport Limited&apos;s products and services.</p><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }} className="mt-8 flex max-w-sm"><input required type="email" placeholder="Your email address" className="min-w-0 flex-1 rounded-l-md px-3 py-3 text-xs text-[#252525] outline-none" /><button className="rounded-r-md bg-[#c49c74] px-5 text-xs font-bold text-[#252525]">{subscribed ? "Thanks" : "Subscribe"}</button></form><p className="mt-2 text-[8px] text-white/45">You can opt out anytime. See our <u>privacy statement</u>.</p></div>
          <div className="border-l border-white/20 pl-8"><h2 className="text-xl font-bold">Trending destinations</h2><p className="mb-5 text-[9px] text-white/55">Most popular choices for travelers from Iran</p><div className="grid grid-cols-2 gap-2">{[["Dubai", "/concept-b/figma-01.jpeg"], ["Paris", "/concept-b/gallery-4.jpeg"], ["Tbilisi", "/concept-b/figma-19.jpeg"], ["Taiwan", "/concept-b/figma-17.jpeg"], ["Istanbul", "/concept-b/gallery-1.jpeg"], ["Seoul", "/concept-b/gallery-3.jpeg"]].map(([city, image]) => <div key={city} className="relative h-20 overflow-hidden rounded-lg"><img src={image} alt={city} className="size-full object-cover" /><div className="absolute inset-0 bg-black/35" /><span className="absolute bottom-2 left-2 text-sm font-bold">{city}</span></div>)}</div></div>
        </div>
      </section>

      <footer id="footer" className="bg-[#1d1d1d] text-white">
        <div className="mx-auto max-w-[1160px] px-8 py-10"><div className="flex items-center justify-between border-b border-white/10 pb-8"><p className="text-2xl font-medium">Bookme.<span className="text-[.5em]">com</span></p><div className="flex items-center gap-5 text-xs text-white/70"><span>Ready to get started?</span><button className="rounded-md bg-[#c49c74] px-6 py-3 font-bold text-[#252525]">Get started</button></div></div><div className="grid gap-8 py-10 text-[9px] text-white/65 sm:grid-cols-5"><div className="font-medium text-white">Subscribe to our<br />newsletter</div><div>Email address <span className="ml-4 inline-flex size-8 items-center justify-center bg-[#c49c74] text-base text-[#252525]">›</span></div><div><b className="text-[#c49c74]">Services</b><br />Email Marketing<br />Campaigns<br />Branding<br />Offline</div><div><b className="text-[#c49c74]">About</b><br />Our Story<br />Benefits<br />Team<br />Careers</div><div><b className="text-[#c49c74]">Help</b><br />FAQs<br />Contact Us</div></div><div className="flex justify-between border-t border-white/10 pt-7 text-[9px] text-white/45"><span>Terms &amp; Conditions &nbsp;&nbsp;&nbsp;&nbsp; Privacy Policy</span><span className="text-base text-white">f &nbsp; ♥ &nbsp; ◎</span></div></div>
      </footer>
    </main>
  );
}
