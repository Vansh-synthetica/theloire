import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, ArrowLeft } from "lucide-react";
import { useCart, buildOrderMailto } from "@/lib/cart";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/email-order")({
  head: () => ({
    meta: [
      { title: "Email Your Order — Théloire Crochet" },
      { name: "description", content: "Send your handmade order inquiry directly from your email app." },
      { property: "og:title", content: "Email Your Order — Théloire Crochet" },
      { property: "og:description", content: "An inquiry-based atelier — personal, quiet, considered." },
    ],
  }),
  component: EmailOrderPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

function EmailOrderPage() {
  const { items, total, hydrated } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[issue.path[0] as string] = issue.message;
      setErrors(next);
      return;
    }
    if (items.length === 0) return;
    const href = buildOrderMailto({ items, ...result.data });
    window.location.href = href;
    setTimeout(() => navigate({ to: "/thank-you" }), 400);
  };

  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <Link to="/cart" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-muted-foreground luxe-underline">
          <ArrowLeft className="h-3 w-3" /> Back to cart
        </Link>

        <Reveal>
          <p className="mt-10 text-[11px] uppercase tracking-luxe text-muted-foreground">Inquiry</p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl tracking-tight">Email your order</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Each piece is handwoven on request. Share your details and we'll write back personally to confirm
            availability, shipping, and care.
          </p>
        </Reveal>

        {hydrated && items.length === 0 ? (
          <Reveal delay={150}>
            <div className="mt-16 rounded-md border border-border/70 bg-card p-12 text-center shadow-[var(--shadow-soft)]">
              <h2 className="font-serif text-3xl">Your cart is empty</h2>
              <p className="mt-3 text-sm text-muted-foreground">Add a piece to begin your inquiry.</p>
              <Link to="/shop" className="mt-6 inline-block luxe-underline text-[11px] uppercase tracking-luxe">
                Explore the collection
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <aside className="rounded-sm border border-border/70 bg-card p-7 shadow-[var(--shadow-soft)]">
                <h2 className="font-serif text-2xl">Cart summary</h2>
                <div className="mt-6 space-y-5">
                  {items.map((i) => (
                    <div key={i.id} className="flex gap-4">
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-linen">
                        <img src={i.image} alt={i.name} loading="lazy" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">{i.category}</p>
                          <p className="mt-0.5 font-serif text-lg">{i.name}</p>
                          <p className="text-xs text-muted-foreground">Qty {i.quantity}</p>
                        </div>
                        <p className="text-sm tabular-nums">€{i.price * i.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-baseline justify-between border-t border-border/70 pt-5">
                  <span className="text-[11px] uppercase tracking-luxe text-muted-foreground">Estimated total</span>
                  <span className="font-serif text-2xl tabular-nums">€{total}</span>
                </div>
              </aside>
            </Reveal>

            <Reveal delay={150}>
              <form onSubmit={handleSubmit} className="rounded-sm border border-border/70 bg-card p-7 shadow-[var(--shadow-soft)]">
                <h2 className="font-serif text-2xl">Your details</h2>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field
                    label="Name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    error={errors.name}
                    required
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={errors.email}
                    required
                  />
                  <Field
                    label="Phone (optional)"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    error={errors.phone}
                  />
                  <Field
                    label="Shipping country (optional)"
                    value={form.country}
                    onChange={(v) => setForm({ ...form, country: v })}
                    error={errors.country}
                  />
                </div>

                <div className="mt-5">
                  <label className="text-[10px] uppercase tracking-luxe text-muted-foreground">
                    Notes / custom requests
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={5}
                    maxLength={1000}
                    placeholder="Color preferences, gift wrapping, monogram…"
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
                  />
                  {errors.notes && <p className="mt-1 text-xs text-destructive">{errors.notes}</p>}
                </div>

                <button
                  type="submit"
                  className="mt-9 flex w-full items-center justify-center gap-3 bg-foreground px-8 py-5 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all duration-500 hover:bg-foreground/85"
                >
                  <Mail className="h-3.5 w-3.5" /> Send order via email
                </button>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
                  This will open your email app with your order pre-filled.
                </p>
              </form>
            </Reveal>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-luxe text-muted-foreground">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
