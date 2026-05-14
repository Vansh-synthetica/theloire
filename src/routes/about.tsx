import { createFileRoute } from "@tanstack/react-router";
import artisan from "@/assets/artisan.jpg";
import texture from "@/assets/texture-detail.jpg";
import lifestyle from "@/assets/lifestyle-1.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Théloire Crochet" },
      { name: "description", content: "The story of Théloire Crochet — a grandmother, a kitchen table, and forty years of patience." },
      { property: "og:title", content: "Our Story — Théloire Crochet" },
      { property: "og:description", content: "Handwoven by a single artisan." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: artisan },
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
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Our Story</p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.95] tracking-tight text-foreground md:text-8xl">
            A grandmother,<br /><span className="italic">a quiet loom.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Théloire is a small house of crochet, made entirely by one pair of hands.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-luxe)]">
            <img src={artisan} alt="The artisan" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <Reveal delay={150} className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <h2 className="font-serif text-4xl text-foreground md:text-5xl">Forty years of patience</h2>
          <p>
            Before Théloire had a name, there was a kitchen table, an early light, and a
            grandmother who had been crocheting since she was nine. She made blankets for
            new mothers, scarves for cold winters, and small pouches for friends.
          </p>
          <p>
            One day, her granddaughter asked her to make a bag — a real one, the kind you
            could carry into the world. That bag became the first piece of Théloire.
          </p>
          <p>
            Every piece since has been made the same way: by her, on her own time, in her
            own quiet rhythm. Some take three days. Some take three weeks.
          </p>
        </Reveal>
      </section>

      <section className="relative grain bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <Reveal>
            <p className="font-serif text-3xl italic leading-snug text-foreground md:text-5xl">
              "I don't count the hours. I just keep making, until it's right."
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-luxe text-muted-foreground">
              — The Artisan
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal className="aspect-[4/5] overflow-hidden rounded-sm">
            <img src={texture} alt="Crochet texture" className="h-full w-full object-cover" loading="lazy" />
          </Reveal>
          <Reveal delay={150} className="aspect-[4/5] overflow-hidden rounded-sm">
            <img src={lifestyle} alt="Lifestyle" className="h-full w-full object-cover" loading="lazy" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
