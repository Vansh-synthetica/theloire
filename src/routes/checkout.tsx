import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";

const WEB3FORMS_ACCESS_KEY = "4593c4ad-c34a-444f-b9bf-d31f339a0037";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Théloire Crochet" },
      { name: "description", content: "Complete your handmade order with care and confidence." },
      { property: "og:title", content: "Checkout — Théloire Crochet" },
      { property: "og:description", content: "Complete your handmade order." },
    ],
  }),
  component: CheckoutPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(5, "Please enter a phone number").max(40),
  address: z.string().trim().min(5, "Please enter your shipping address").max(500),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

function CheckoutPage() {
  const { items, total, clear, hydrated } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[issue.path[0] as string] = issue.message;
      setErrors(next);
      return;
    }
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      const summaryLines = items.map(
        (i) => `• ${i.name} (${i.category}) — Qty ${i.quantity} × €${i.price} = €${i.price * i.quantity}`,
      );
      const product_summary = summaryLines.join("\n");
      const total_quantity = items.reduce((s, i) => s + i.quantity, 0);

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Order — Théloire (${items.length} piece${items.length > 1 ? "s" : ""})`,
        from_name: "Théloire Crochet — Order",
        full_name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        shipping_address: result.data.address,
        product_summary,
        total_quantity,
        estimated_total: `€${total}`,
        notes: result.data.notes || "—",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Submission failed");

      clear();
      navigate({ to: "/thank-you" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <Link to="/cart" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-muted-foreground luxe-underline">
          <ArrowLeft className="h-3 w-3" /> Back to cart
        </Link>

        <Reveal>
          <p className="mt-10 text-[11px] uppercase tracking-luxe text-muted-foreground">Checkout</p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl tracking-tight">Complete your order</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Each piece is handwoven on request. Share your details and we'll write back personally to confirm
            availability, shipping, and care.
          </p>
        </Reveal>

        {hydrated && items.length === 0 ? (
          <Reveal delay={150}>
            <div className="mt-16 rounded-md border border-border/70 bg-card p-12 text-center shadow-[var(--shadow-soft)]">
              <h2 className="font-serif text-3xl">Your cart is empty</h2>
              <p className="mt-3 text-sm text-muted-foreground">Add a piece to begin your order.</p>
              <Link to="/shop" className="mt-6 inline-block luxe-underline text-[11px] uppercase tracking-luxe">
                Explore the collection
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <aside className="rounded-sm border border-border/70 bg-card p-7 shadow-[var(--shadow-soft)] lg:sticky lg:top-32 h-fit">
                <h2 className="font-serif text-2xl">Order summary</h2>
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
                  <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} required />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} required />
                  <Field label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} required />
                </div>

                <div className="mt-5">
                  <label className="text-[10px] uppercase tracking-luxe text-muted-foreground">Shipping Address</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={3}
                    maxLength={500}
                    required
                    placeholder="Street, city, postal code, country"
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
                  />
                  {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                </div>

                <div className="mt-5">
                  <label className="text-[10px] uppercase tracking-luxe text-muted-foreground">Notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={4}
                    maxLength={1000}
                    placeholder="Color preferences, gift wrapping, monogram…"
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-9 flex w-full items-center justify-center gap-3 bg-foreground px-8 py-5 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all duration-500 hover:bg-foreground/85 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending order…
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" /> Place order
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
                  Your order will be sent directly to our atelier. We respond personally within 24 hours.
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
