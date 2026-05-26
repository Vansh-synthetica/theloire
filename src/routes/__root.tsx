import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";
import { PageTransition } from "@/components/PageTransition";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">404</p>
        <h1 className="mt-4 font-serif text-5xl text-foreground">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for has wandered off the loom.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-luxe text-foreground luxe-underline"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-foreground">Something didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 border-b border-foreground/40 pb-1 text-[11px] uppercase tracking-luxe luxe-underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Théloire Crochet — Handwoven Stories, Crafted with Love" },
      {
        name: "description",
        content:
          "Théloire Crochet is a quiet luxury house of handmade crochet bags, pouches and home pieces — slowly woven by a single artisan.",
      },
      { name: "author", content: "Théloire Crochet" },
      { property: "og:title", content: "Théloire Crochet — Handwoven Stories, Crafted with Love" },
      { property: "og:description", content: "An elegant ecommerce website for Théloire Crochet, showcasing premium handmade luxury crochet goods." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Théloire Crochet" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Théloire Crochet — Handwoven Stories, Crafted with Love" },
      { name: "description", content: "An elegant ecommerce website for Théloire Crochet, showcasing premium handmade luxury crochet goods." },
      { name: "twitter:description", content: "An elegant ecommerce website for Théloire Crochet, showcasing premium handmade luxury crochet goods." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b83f1d3-82f9-4dde-9c76-04b862c66e72/id-preview-e5024136--4a80d997-5075-4c83-add1-005e3862e363.lovable.app-1778731097396.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b83f1d3-82f9-4dde-9c76-04b862c66e72/id-preview-e5024136--4a80d997-5075-4c83-add1-005e3862e363.lovable.app-1778731097396.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="relative min-h-screen bg-background">
          <Navbar />
          <main className="pt-0">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>
          <Footer />
        </div>
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}
