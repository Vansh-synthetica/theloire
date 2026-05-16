import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export const OWNER_EMAIL = "orders@theloire.com";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clear: () => void;
  hydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "theloire.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const total = items.reduce((s, i) => s + i.quantity * i.price, 0);
    return {
      items,
      count,
      total,
      hydrated,
      add: (p, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.id === p.id);
          if (existing) {
            return prev.map((i) =>
              i.id === p.id ? { ...i, quantity: i.quantity + qty } : i,
            );
          }
          return [
            ...prev,
            { id: p.id, name: p.name, price: p.price, image: p.image, category: p.category, quantity: qty },
          ];
        }),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      setQuantity: (id, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => i.id !== id)
            : prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
        ),
      clear: () => setItems([]),
    };
  }, [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function buildOrderMailto(opts: {
  items: CartItem[];
  name: string;
  email: string;
  phone?: string;
  country?: string;
  notes?: string;
  subjectOverride?: string;
}) {
  const { items, name, email, phone, country, notes, subjectOverride } = opts;
  const subject =
    subjectOverride ??
    (items.length === 1
      ? `Order Request — ${items[0].name}`
      : `Order Request — Théloire (${items.length} pieces)`);

  const lines: string[] = ["Hello,", "", "I would like to order:", ""];
  for (const i of items) {
    lines.push(`• ${i.name} (${i.category})`);
    lines.push(`  Price: €${i.price}`);
    lines.push(`  Quantity: ${i.quantity}`);
    lines.push("");
  }
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  lines.push(`Estimated total: €${total}`, "");
  lines.push("— My details —");
  lines.push(`Name: ${name}`);
  lines.push(`Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (country) lines.push(`Shipping country: ${country}`);
  lines.push("");
  lines.push("Additional notes:");
  lines.push(notes?.trim() || "—");
  lines.push("");
  lines.push("Thank you,");
  lines.push(name);

  const body = lines.join("\n");
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
