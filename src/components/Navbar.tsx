import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Collection" },
  { to: "/about", label: "The Atelier" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <button
          aria-label="Menu"
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-luxe text-foreground/80">
          {links.slice(0, 2).map((l) => (
            <Link key={l.to} to={l.to} className="luxe-underline">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="font-serif text-2xl md:text-[28px] tracking-tight text-foreground"
        >
          Théloire
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-luxe text-foreground/80">
          {links.slice(2).map((l) => (
            <Link key={l.to} to={l.to} className="luxe-underline">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5 text-foreground/80">
          <button aria-label="Search" className="hidden md:block hover:text-foreground transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button aria-label="Wishlist" className="hover:text-foreground transition-colors">
            <Heart className="h-4 w-4" />
          </button>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-foreground transition-colors">
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[9px] font-sans tracking-normal text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-background/95 backdrop-blur-md transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "max-h-96 border-t border-border/60" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-6 px-8 py-10 text-sm uppercase tracking-luxe">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-foreground/80">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
