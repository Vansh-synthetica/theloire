import { createFileRoute } from "@tanstack/react-router";
import bagIvory from "@/assets/colors/white.jpg";
import bagSand from "@/assets/colors/taupe.jpg";
import bagBucket from "@/assets/colors/green.jpg";
import hero from "@/assets/colors/pattern-red-blue.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Atelier — Théloire Crochet" },
      { name: "description", content: "A quiet luxury atelier of handwoven crochet bags." },
      { property: "og:title", content: "The Atelier — Théloire Crochet" },
      { property: "og:description", content: "Handwoven crochet bags, made slowly." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative grain bg-gradient-to-b from-ivory to-cream px-6 pb-24 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">The Atelier</p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.95] tracking-tight text-foreground md:text-8xl">
            Quiet luxury,<br /><span className="italic">handwoven.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Théloire is a small house of crochet bags — heirloom pieces made slowly, by hand,
            in cream cottons and warm neutral threads.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-luxe)]">
            <img src={bagIvory} alt="Théloire ivory bag" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <Reveal delay={150} className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <h2 className="font-serif text-4xl text-foreground md:text-5xl">A philosophy of slowness</h2>
          <p>
            Every Théloire bag is shaped one stitch at a time. There are no machines, no shortcuts,
            no rushed collections — only careful hands and natural cotton.
          </p>
          <p>
            Some bags take three days. Some take three weeks. Each one is made to last for years.
          </p>
        </Reveal>
      </section>

      <section className="relative grain bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <Reveal>
            <p className="font-serif text-3xl italic leading-snug text-foreground md:text-5xl">
              "Made slowly, to be carried for a lifetime."
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal className="aspect-[4/5] overflow-hidden rounded-sm">
            <img src={bagSand} alt="Sand crochet bag" className="h-full w-full object-cover" loading="lazy" />
          </Reveal>
          <Reveal delay={100} className="aspect-[4/5] overflow-hidden rounded-sm">
            <img src={hero} alt="Cream crochet tote" className="h-full w-full object-cover" loading="lazy" />
          </Reveal>
          <Reveal delay={200} className="aspect-[4/5] overflow-hidden rounded-sm">
            <img src={bagBucket} alt="Champagne bucket bag" className="h-full w-full object-cover" loading="lazy" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
