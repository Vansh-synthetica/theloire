import tote from "@/assets/product-tote.jpg";
import pouch from "@/assets/product-pouch.jpg";
import mini from "@/assets/product-mini.jpg";
import decor from "@/assets/product-decor.jpg";
import hero from "@/assets/hero-bag.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  story?: string;
};

export const products: Product[] = [
  {
    id: "maison-tote",
    name: "Maison Tote",
    category: "Bags",
    description: "An everyday heirloom in soft taupe cotton.",
    price: 248,
    image: tote,
    story: "Handwoven over four days in a sunlit atelier, the Maison Tote carries the quiet weight of patience.",
  },
  {
    id: "rosée-pouch",
    name: "Rosée Pouch",
    category: "Pouches",
    description: "A delicate drawstring pouch in champagne.",
    price: 128,
    image: pouch,
    story: "A soft companion for keepsakes — earrings, letters, secrets best kept close.",
  },
  {
    id: "petite-lune",
    name: "Petite Lune",
    category: "Mini Bags",
    description: "A crescent crossbody in warm caramel.",
    price: 198,
    image: mini,
    story: "Compact, considered, and entirely hand-stitched.",
  },
  {
    id: "atelier-basket",
    name: "Atelier Basket",
    category: "Home",
    description: "A sculptural ivory basket for living spaces.",
    price: 168,
    image: decor,
    story: "Quiet utility, made to soften any room it enters.",
  },
  {
    id: "héritage-tote",
    name: "Héritage Tote",
    category: "Limited",
    description: "A limited edition cream tote — only twelve made.",
    price: 348,
    image: hero,
    story: "Twelve pieces, each signed by the artisan's hand.",
  },
  {
    id: "lin-pouch",
    name: "Lin Pouch",
    category: "Pouches",
    description: "Linen-soft pouch for evening essentials.",
    price: 118,
    image: pouch,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
