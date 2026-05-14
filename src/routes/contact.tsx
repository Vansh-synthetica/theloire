import { createFileRoute } from "@tanstack/react-router";
import { Mail, Instagram, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Théloire Crochet" },
      { name: "description", content: "Reach the Théloire atelier — for orders, custom pieces, and quiet conversations." },
      { property: "og:title", content: "Contact — Théloire Crochet" },
      { property: "og:description", content: "Get in touch with the atelier." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative grain bg-gradient-to-b from-ivory to-cream px-6 pb-20 pt-40 md:px-12 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Atelier</p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.95] tracking-tight text-foreground md:text-8xl">
            <span className="italic">Bonjour.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            For custom commissions, press, or simply to say hello — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-16 px-6 py-24 md:grid-cols-5 md:px-12">
        <Reveal className="md:col-span-2 space-y-8">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Write to us</p>
            <a href="mailto:hello@theloire.com" className="mt-3 flex items-center gap-3 font-serif text-2xl text-foreground luxe-underline">
              <Mail className="h-4 w-4" /> hello@theloire.com
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Find us</p>
            <p className="mt-3 flex items-center gap-3 font-serif text-2xl text-foreground">
              <MapPin className="h-4 w-4" /> Atelier Théloire, Paris
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Follow</p>
            <a href="#" className="mt-3 flex items-center gap-3 font-serif text-2xl text-foreground luxe-underline">
              <Instagram className="h-4 w-4" /> @theloire
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="md:col-span-3">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6 rounded-sm border border-border/70 bg-ivory p-10 shadow-[var(--shadow-soft)]"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Name" type="text" placeholder="Your name" />
              <Field label="Email" type="email" placeholder="you@example.com" />
            </div>
            <Field label="Subject" type="text" placeholder="A custom piece, perhaps" />
            <div>
              <label className="text-[11px] uppercase tracking-luxe text-muted-foreground">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us a little about what you have in mind…"
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all duration-500 hover:bg-foreground/85"
            >
              Send message
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-luxe text-muted-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
      />
    </div>
  );
}
