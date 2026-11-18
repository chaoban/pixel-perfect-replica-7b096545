import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, CalendarCheck, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/Wordmark";
import { BarberCard, type Barber } from "@/components/BarberCard";
import heroLeft from "@/assets/hero-left.jpg";
import heroRight from "@/assets/hero-right.jpg";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";
import barber4 from "@/assets/barber-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barberly — Style with Confident Hair" },
      { name: "description", content: "Discover verified barbers and stylists near you and book a slot in a few taps." },
      { property: "og:title", content: "Barberly — Style with Confident Hair" },
      { property: "og:description", content: "Discover verified barbers and stylists and book online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FILTERS = ["All", "Cut", "Color", "Perm", "Beard"];
const LOGOS = ["Maison Coupe", "THE FADE CO.", "Oak & Razor", "LUMIÈRE", "Gentry", "Studio Nord"];
const FEATURES = [
  { icon: BadgeCheck, label: "Verified Barbers" },
  { icon: CalendarCheck, label: "Instant Booking" },
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: Sparkles, label: "Top-Rated Styles" },
];
const BARBERS: Barber[] = [
  { name: "Marcus Hale", shop: "Oak & Razor · Da'an", image: barber1, services: ["Cut", "Beard"], rating: 4.9, reviews: 212, from: 35 },
  { name: "Lena Chou", shop: "Maison Coupe · Xinyi", image: barber2, services: ["Cut", "Color", "Perm"], rating: 4.8, reviews: 168, from: 48 },
  { name: "Arthur Wells", shop: "Gentry Barbers · Zhongshan", image: barber3, services: ["Cut", "Beard"], rating: 5.0, reviews: 94, from: 40 },
  { name: "Diego Ruiz", shop: "The Fade Co. · Songshan", image: barber4, services: ["Cut", "Color"], rating: 4.7, reviews: 131, from: 30 },
];

function Index() {
  const [filter, setFilter] = useState("All");
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5 md:px-8">
        <Wordmark />
        <div className="mx-auto hidden w-full max-w-sm items-center gap-2 rounded-full border border-border bg-card px-4 py-2 md:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input aria-label="Search" placeholder="Search barbers" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </div>
        <Button asChild variant="pill" className="ml-auto px-6 md:ml-0">
          <Link to="/login">Login</Link>
        </Button>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-6 md:px-8">
        <div className="grid items-center gap-6 rounded-[2rem] bg-cream p-6 md:grid-cols-[1fr_1.4fr_1fr] md:p-10">
          <img src={heroLeft} alt="Man with a textured crop haircut" width={768} height={1024} className="hidden aspect-[3/4] w-full rounded-2xl object-cover md:block animate-fade-up" />
          <div className="py-8 text-center animate-fade-up [animation-delay:120ms]">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">New Look</p>
            <h1 className="mt-4 text-5xl font-medium leading-[1.02] md:text-7xl">
              Style with <em className="italic">Confident</em> Hair
            </h1>
            <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full bg-card p-1.5 pl-5 shadow-card">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input aria-label="Find your stylist" placeholder="Find your stylist or search a style" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              <Button variant="pill" size="sm" className="h-9 px-5">Search</Button>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {FILTERS.map((f) => (
                <Button key={f} size="sm" variant={filter === f ? "pill" : "pillOutline"} onClick={() => setFilter(f)} className="px-4">
                  {f}
                </Button>
              ))}
            </div>
          </div>
          <img src={heroRight} alt="Woman with glossy wavy hair" width={768} height={1024} className="hidden aspect-[3/4] w-full rounded-2xl object-cover md:block animate-fade-up [animation-delay:240ms]" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-muted-foreground">
          {LOGOS.map((l) => (
            <span key={l} className="font-serif text-xl tracking-wide opacity-70">{l}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="text-center text-4xl font-medium md:text-5xl">Best booking experience</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-4 rounded-2xl bg-muted px-4 py-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-card">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <h2 className="text-4xl font-medium md:text-5xl">Popular</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BARBERS.map((b) => <BarberCard key={b.name} barber={b} />)}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">© 2026 Barberly</footer>
    </div>
  );
}
