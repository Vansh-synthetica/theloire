import tote from "@/assets/product-tote.jpg";
import pouch from "@/assets/product-pouch.jpg";
import mini from "@/assets/product-mini.jpg";
import bagIvory from "@/assets/bag-ivory.jpg";
import bagSand from "@/assets/bag-sand.jpg";
import bagBucket from "@/assets/bag-bucket.jpg";
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
  },
  {
    id: "rosée-pouch",
    name: "Rosée Pouch",
    category: "Pouches",
    description: "A delicate drawstring pouch in champagne.",
    price: 128,
    image: pouch,
  },
  {
    id: "petite-lune",
    name: "Petite Lune",
    category: "Mini Bags",
    description: "A crescent crossbody in warm caramel.",
    price: 198,
    image: mini,
  },
  {
    id: "ivoire-shoulder",
    name: "Ivoire Shoulder",
    category: "Bags",
    description: "A soft ivory shoulder bag, woven with airy stitches.",
    price: 218,
    image: bagIvory,
  },
  {
    id: "héritage-tote",
    name: "Héritage Tote",
    category: "Limited",
    description: "A limited edition cream tote — only twelve made.",
    price: 348,
    image: hero,
  },
  {
    id: "sable-hobo",
    name: "Sable Hobo",
    category: "Bags",
    description: "A relaxed hobo bag in warm sand.",
    price: 228,
    image: bagSand,
  },
  {
    id: "lin-pouch",
    name: "Lin Pouch",
    category: "Pouches",
    description: "Linen-soft pouch for evening essentials.",
    price: 118,
    image: pouch,
  },
  {
    id: "champagne-bucket",
    name: "Champagne Bucket",
    category: "Mini Bags",
    description: "A drawstring bucket bag in champagne nude.",
    price: 188,
    image: bagBucket,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
