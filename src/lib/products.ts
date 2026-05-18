import mini from "@/assets/product-mini.jpg";
import bagIvory from "@/assets/bag-ivory.jpg";
import bagSand from "@/assets/bag-sand.jpg";
import bagBucket from "@/assets/bag-bucket.jpg";

export type ColorVariant = { name: string; image: string };

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  colors: ColorVariant[];
  story?: string;
};

export const formatPHP = (n: number) => `₱${n.toLocaleString("en-PH")}`;

const COLORS: ColorVariant[] = [
  { name: "Ivory", image: bagIvory },
  { name: "Sand", image: bagSand },
  { name: "Champagne", image: bagBucket },
  { name: "Caramel", image: mini },
];

export const products: Product[] = [
  {
    id: "petite",
    name: "Petite Crochet Bag",
    category: "Small",
    description: "A small handwoven crochet bag — perfect for essentials.",
    price: 400,
    image: bagIvory,
    colors: COLORS,
  },
  {
    id: "classique",
    name: "Classique Crochet Bag",
    category: "Medium",
    description: "A medium handwoven crochet bag — everyday elegance.",
    price: 450,
    image: bagSand,
    colors: COLORS,
  },
  {
    id: "grande",
    name: "Grande Crochet Bag",
    category: "Large",
    description: "A large handwoven crochet bag — generous and graceful.",
    price: 500,
    image: bagBucket,
    colors: COLORS,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
