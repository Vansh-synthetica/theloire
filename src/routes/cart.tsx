import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Théloire Crochet" },
      { name: "description", content: "Review your selected handmade pieces before sending your order inquiry." },
      { property: "og:title", content: "Your Cart — Théloire Crochet" },
      { property: "og:description", content: "Review your selected handmade pieces." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, total, setQuantity, remove, clear, hydrated } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40 pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <Reveal>
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">Atelier</p>
          <h1 className="mt-4 font-serif text-5xl md:text-6xl tracking-tight">Your cart</h1>
        </Reveal>

        {!hydrated ? (
          <div className="mt-16 space-y-6">
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-6 animate-pulse">
                <div className="h-32 w-28 rounded-sm bg-linen" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-4 w-1/3 rounded bg-linen" />
                  <div className="h-3 w-1/4 rounded bg-linen" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <Reveal delay={150}>
            <div className="mt-20 rounded-md border border-border/70 bg-card px-8 py-20 text-center shadow-[var(--shadow-soft)]">
              <ShoppingBag className="mx-auto h-6 w-6 text-muted-foreground" />
              <h2 className="mt-6 font-serif text-3xl">Your cart is quiet</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Discover pieces slowly made, one stitch at a time.
              </p>
              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-luxe luxe-underline"
              >
                Explore the collection <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-[1.6fr_1fr]">
            <div className="divide-y divide-border/70">
              {items.map((item) => (
                <div key={item.id} className="flex gap-5 py-8 md:gap-8">
                  <Link
                    to="/product/$id"
                    params={{ id: item.id }}
                    className="relative block h-36 w-28 shrink-0 overflow-hidden rounded-sm bg-linen md:h-44 md:w-36"
                  >
                    <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">
                          {item.category}
                        </p>
                        <Link to="/product/$id" params={{ id: item.id }} className="mt-1 block font-serif text-2xl md:text-3xl">
                          {item.name}
                        </Link>
                        <p className="mt-2 text-sm tabular-nums text-foreground/80">€{item.price}</p>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        aria-label="Remove"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="grid h-10 w-10 place-items-center text-foreground/70 hover:text-foreground"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-10 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="grid h-10 w-10 place-items-center text-foreground/70 hover:text-foreground"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-serif text-lg tabular-nums">€{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-8">
                <button
                  onClick={clear}
                  className="text-[11px] uppercase tracking-luxe text-muted-foreground luxe-underline"
                >
                  Clear cart
                </button>
                <Link to="/shop" className="text-[11px] uppercase tracking-luxe luxe-underline">
                  Continue browsing
                </Link>
              </div>
            </div>

            <aside className="h-fit rounded-sm border border-border/70 bg-card p-8 shadow-[var(--shadow-soft)] lg:sticky lg:top-32">
              <h2 className="font-serif text-2xl">Summary</h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Pieces</span>
                  <span className="tabular-nums">{items.reduce((s, i) => s + i.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated by email</span>
                </div>
                <div className="h-px bg-border/70" />
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] uppercase tracking-luxe text-muted-foreground">Estimated total</span>
                  <span className="font-serif text-3xl tabular-nums">€{total}</span>
                </div>
              </div>

              <button
                onClick={() => navigate({ to: "/checkout" })}
                className="mt-8 flex w-full items-center justify-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all duration-500 hover:bg-foreground/85"
              >
                Proceed to checkout <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
                An inquiry-based atelier. We respond personally to confirm availability, shipping, and care.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
