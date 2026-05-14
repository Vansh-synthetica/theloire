import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Collection — Théloire Crochet" },
      { name: "description", content: "Browse the full Théloire Crochet collection of handwoven bags, pouches, and home pieces." },
      { property: "og:title", content: "Collection — Théloire Crochet" },
      { property: "og:description", content: "Handwoven bags, pouches, and home pieces." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const categories = ["All", "Bags", "Pouches", "Mini Bags", "Home", "Limited"];

function ShopPage() {
  const [filter, setFilter] = useState<string>("All");
  const filtered = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="relative grain border-b border-border/60 bg-gradient-to-b from-ivory to-cream px-6 pb-20 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">The Maison</p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.95] tracking-tight text-foreground md:text-8xl">
            The <span className="italic">Collection</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            A small, considered selection. Each piece made one at a time, in cream cottons and warm neutral threads.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12">
        <div className="mb-16 flex flex-wrap items-center gap-3 border-b border-border/60 pb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2 text-[11px] uppercase tracking-luxe transition-all duration-500 ${
                filter === c
                  ? "bg-foreground text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto text-[11px] uppercase tracking-luxe text-muted-foreground">
            {filtered.length} pieces
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
