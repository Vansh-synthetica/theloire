import patternRedBlue from "@/assets/colors/pattern-red-blue.jpg";
import green from "@/assets/colors/green.jpg";
import darkRed from "@/assets/colors/dark-red.jpg";
import lightRed from "@/assets/colors/light-red.jpg";
import white from "@/assets/colors/white.jpg";
import blue from "@/assets/colors/blue.jpg";
import gray from "@/assets/colors/gray.jpg";
import taupe from "@/assets/colors/taupe.jpg";

export type ColorVariant = { name: string; image: string };

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  colors: readonly ColorVariant[];
  story?: string;
};

export const formatPHP = (n: number) => `₱${n.toLocaleString("en-PH")}`;

const COLORS: ColorVariant[] = [
  { name: "Pattern Red/Blue", image: patternRedBlue },
  { name: "Green", image: green },
  { name: "Dark Red", image: darkRed },
  { name: "Light Red", image: lightRed },
  { name: "White", image: white },
  { name: "Blue", image: blue },
  { name: "Gray", image: gray },
  { name: "Taupe", image: taupe },
];

export const products: Product[] = [
  {
    id: "petite",
    name: "Petite Crochet Bag",
    category: "Small",
    description: "A small handwoven crochet bag — perfect for essentials.",
    price: 400,
    image: patternRedBlue,
    colors: COLORS,
  },
  {
    id: "grande",
    name: "Grande Crochet Bag",
    category: "Large",
    description: "A large handwoven crochet bag — generous and graceful.",
    price: 500,
    image: green,
    colors: COLORS,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
