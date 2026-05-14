import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-cream">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-4 md:px-12">
        <div className="md:col-span-2">
          <Link to="/" className="font-serif text-3xl text-foreground">
            Théloire
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Handwoven heirlooms made slowly, by hand, in a quiet atelier. Each piece
            carries the patience of a single artisan.
          </p>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-luxe text-foreground">Maison</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li><Link to="/shop" className="luxe-underline">Collection</Link></li>
            <li><Link to="/about" className="luxe-underline">Our Story</Link></li>
            <li><Link to="/contact" className="luxe-underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-luxe text-foreground">Follow</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="#" className="luxe-underline inline-flex items-center gap-2">
                <Instagram className="h-3.5 w-3.5" /> Instagram
              </a>
            </li>
            <li><a href="#" className="luxe-underline">Pinterest</a></li>
            <li><a href="#" className="luxe-underline">Journal</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-6 text-[11px] uppercase tracking-luxe text-muted-foreground md:flex-row md:items-center md:justify-between md:px-12">
          <span>© {new Date().getFullYear()} Théloire Crochet</span>
          <span>Handwoven with love · Made to last</span>
        </div>
      </div>
    </footer>
  );
}
