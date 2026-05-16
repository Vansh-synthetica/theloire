import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft, Mail } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — Théloire Crochet` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "Théloire" },
      { property: "og:description", content: loaderData?.product.description ?? "" },
      { property: "og:type", content: "product" },
      { property: "og:image", content: loaderData?.product.image },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center">
      <div className="text-center">
        <h1 className="font-serif text-4xl">Piece not found</h1>
        <Link to="/shop" className="mt-6 inline-block luxe-underline text-[11px] uppercase tracking-luxe">
          Back to collection
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-muted-foreground luxe-underline">
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-linen shadow-[var(--shadow-luxe)]">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">{product.category}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-6 text-2xl tabular-nums font-serif text-foreground/85">€{product.price}</p>

            <div className="mt-8 h-px bg-border/70" />

            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              {product.story ?? product.description}
            </p>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center text-foreground/70 hover:text-foreground">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center text-foreground/70 hover:text-foreground">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button className="group flex flex-1 items-center justify-center gap-3 bg-foreground px-8 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-all duration-500 hover:bg-foreground/85">
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to bag
              </button>
              <button aria-label="Wishlist" className="grid h-12 w-12 place-items-center border border-border text-foreground/70 transition-colors hover:text-accent">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-12 space-y-4 border-t border-border/70 pt-10 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Materials</span><span>100% natural cotton</span></div>
              <div className="flex justify-between"><span>Made in</span><span>Atelier Théloire</span></div>
              <div className="flex justify-between"><span>Time to make</span><span>~ 4 days</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Worldwide</span></div>
            </div>
          </Reveal>
        </div>

        <section className="mt-32">
          <h2 className="mb-12 font-serif text-3xl text-foreground md:text-4xl">You may also love</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
