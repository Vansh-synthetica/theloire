import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Hand, Sparkles, Clock } from "lucide-react";
import heroBag from "@/assets/colors/pattern-red-blue.jpg";
import bagIvory from "@/assets/colors/white.jpg";
import bagSand from "@/assets/colors/taupe.jpg";
import bagBucket from "@/assets/colors/green.jpg";
import tote from "@/assets/colors/dark-red.jpg";
import mini from "@/assets/colors/blue.jpg";
import pouch from "@/assets/colors/gray.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Théloire Crochet — Handwoven Stories, Crafted with Love" },
      {
        name: "description",
        content:
          "Théloire Crochet — a quiet luxury house of handmade crochet bags, slowly woven by hand.",
      },
      { property: "og:title", content: "Théloire Crochet" },
      { property: "og:description", content: "Handwoven stories, crafted with love." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroBag },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const featured = products;
const bestSellers = [...products, ...products, ...products];

const values = [
  { icon: Hand, title: "Handmade with care", text: "Each piece woven by a single pair of hands." },
  { icon: Leaf, title: "Sustainable materials", text: "Natural cottons and undyed yarns." },
  { icon: Clock, title: "Slow fashion", text: "No collections rushed. No corners cut." },
  { icon: Sparkles, title: "One of a kind", text: "Small batches, signed by the artisan." },
];


const galleryBags = [heroBag, bagIvory, bagSand, bagBucket, tote, mini, pouch, bagIvory];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative grain min-h-screen overflow-hidden bg-gradient-to-b from-ivory via-cream to-linen">
        <div className="pointer-events-none absolute -left-40 top-20 h-[600px] w-[600px] rounded-full bg-champagne/40 blur-3xl animate-float" />
        <div
          className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-mocha/30 blur-3xl animate-float"
          style={{ animationDelay: "-7s" }}
        />

        <div className="relative mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-24 pt-40 md:grid-cols-12 md:gap-16 md:px-12 md:pt-44">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="animate-fade-up text-[11px] uppercase tracking-luxe text-muted-foreground" style={{ animationDelay: "0.1s" }}>
              Atelier · Est. 2025
            </p>
            <h1
              className="animate-fade-up mt-6 font-serif text-[3.5rem] leading-[0.95] tracking-tight text-foreground sm:text-[5rem] md:text-[5.5rem] lg:text-[6.5rem]"
              style={{ animationDelay: "0.25s" }}
            >
              Théloire<br />
              <span className="italic text-foreground/85">Crochet</span>
            </h1>
            <p
              className="animate-fade-up mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
              style={{ animationDelay: "0.45s" }}
            >
              Handwoven stories, crafted with love. A quiet collection of heirloom
              bags — made slowly, by hand.
            </p>
            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center gap-6"
              style={{ animationDelay: "0.6s" }}
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all duration-500 hover:bg-foreground/85"
              >
                Explore Collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="text-[11px] uppercase tracking-luxe text-foreground luxe-underline"
              >
                The Atelier
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-6 lg:col-span-7">
            <div className="relative">
              <div
                className="animate-fade-up relative aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-luxe)]"
                style={{ animationDelay: "0.4s" }}
              >
                <img src={heroBag} alt="Atelier crochet tote" className="h-full w-full object-cover" />
              </div>
              <div
                className="animate-fade-up absolute -bottom-10 -left-6 hidden h-44 w-36 overflow-hidden rounded-sm shadow-[var(--shadow-soft)] sm:block md:-left-12 md:h-56 md:w-44"
                style={{ animationDelay: "0.7s" }}
              >
                <img src={bagBucket} alt="Crochet bucket bag" className="h-full w-full object-cover" />
              </div>
              <p
                className="animate-fade-up absolute -right-2 top-6 hidden rotate-90 text-[10px] uppercase tracking-luxe text-muted-foreground md:block"
                style={{ animationDelay: "0.9s" }}
              >
                N° 001 — Heirloom Edition
              </p>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden border-y border-border/60 bg-background/50 backdrop-blur-sm py-5">
          <div className="marquee flex w-max gap-16 whitespace-nowrap font-serif text-2xl italic text-foreground/60">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-16">
                Handwoven slowly
                <span className="text-accent">✦</span>
                One stitch at a time
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-40">
        <Reveal className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Featured</p>
            <h2 className="mt-4 font-serif text-5xl tracking-tight text-foreground md:text-6xl">
              The <span className="italic">Collection</span>
            </h2>
          </div>
          <Link to="/shop" className="text-[11px] uppercase tracking-luxe luxe-underline">
            View all pieces →
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-40">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Craftsmanship</p>
          <h2 className="mt-5 font-serif text-5xl tracking-tight text-foreground md:text-6xl">
            A philosophy of <span className="italic">slowness</span>.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100} className="group text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-border bg-ivory text-foreground/70 transition-all duration-700 group-hover:border-accent group-hover:text-accent">
                <v.icon className="h-5 w-5" strokeWidth={1.2} />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-foreground">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEST SELLERS CAROUSEL */}
      <section className="relative overflow-hidden bg-linen py-32 md:py-40">
        <Reveal className="mx-auto mb-16 max-w-[1400px] px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Most Loved</p>
          <h2 className="mt-4 font-serif text-5xl tracking-tight text-foreground md:text-6xl">
            Best <span className="italic">sellers</span>
          </h2>
        </Reveal>

        <div
          className="group relative overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
        >
          <div className="marquee flex w-max gap-8 px-6 [animation-play-state:running] group-hover:[animation-play-state:paused]">
            {bestSellers.map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                to="/product/$id"
                params={{ id: p.id }}
                className="group/card block w-[280px] flex-shrink-0 md:w-[320px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-background">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-110"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
                  <span className="text-sm tabular-nums text-foreground/70">₱{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* GALLERY */}
      <section className="mx-auto max-w-[1400px] px-6 pb-32 md:px-12 md:pb-40">
        <Reveal className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">@theloire</p>
            <h2 className="mt-4 font-serif text-5xl tracking-tight text-foreground md:text-6xl">
              From the <span className="italic">atelier</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {galleryBags.map((src, i) => (
            <Reveal
              key={i}
              delay={i * 60}
              className={`group relative overflow-hidden rounded-sm bg-linen ${
                i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/5]"
              }`}
            >
              <img
                src={src}
                alt="Théloire crochet bag"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative grain overflow-hidden bg-gradient-to-b from-cream to-champagne/60">
        <div className="mx-auto max-w-3xl px-6 py-32 text-center md:py-40">
          <Reveal>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Newsletter</p>
            <h2 className="mt-5 font-serif text-5xl tracking-tight text-foreground md:text-6xl">
              Join the <span className="italic">Théloire</span> world.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base text-muted-foreground">
              Quiet letters about new pieces and small thoughts on slow living.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-10 flex max-w-lg overflow-hidden rounded-full border border-border bg-background/80 backdrop-blur-sm shadow-[var(--shadow-soft)]"
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email"
                className="flex-1 bg-transparent px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="bg-foreground px-7 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all duration-500 hover:bg-foreground/85"
              >
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
