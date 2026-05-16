import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you — Théloire Crochet" },
      { name: "description", content: "Thank you for supporting handmade craftsmanship." },
      { property: "og:title", content: "Thank you — Théloire Crochet" },
      { property: "og:description", content: "Thank you for supporting handmade craftsmanship." },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-ivory via-cream to-linen px-6">
      <Reveal>
        <div className="max-w-xl text-center">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Atelier Théloire</p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
            Thank you for supporting handmade craftsmanship.
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
            Your inquiry has opened in your email app. Once sent, we'll write back personally — slowly, with care —
            to confirm your piece.
          </p>
          <Link
            to="/"
            className="mt-10 inline-block border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-luxe text-foreground luxe-underline"
          >
            Return home
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
