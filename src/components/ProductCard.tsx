import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPHP, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-sm bg-linen aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="image-zoom h-full w-full object-cover"
        />
        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground/70 opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 hover:text-accent"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-serif text-xl text-foreground">{product.name}</h3>
        </div>
        <p className="font-sans text-sm tabular-nums text-foreground/80">{formatPHP(product.price)}</p>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
    </Link>
  );
}
