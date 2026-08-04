import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Number of vials in a combo kit and the discount applied to it. */
export const KIT_VIALS = 10;
export const KIT_DISCOUNT = 0.4;

/** Discounted price for a 10-vial kit of a single product/strength. */
export function kitPrice(unitPriceUSD: number) {
  return Math.round(unitPriceUSD * KIT_VIALS * (1 - KIT_DISCOUNT));
}
export function kitListPrice(unitPriceUSD: number) {
  return unitPriceUSD * KIT_VIALS;
}

export type CartLine = {
  slug: string;
  name: string;
  size: string;
  /** Price of one unit of this line (a single vial, or the whole kit). */
  priceUSD: number;
  qty: number;
  /** True when this line is a 10-vial combo kit. */
  kit?: boolean;
};

export function lineId(line: Pick<CartLine, "slug" | "size" | "kit">) {
  return `${line.slug}|${line.size}|${line.kit ? "kit" : "single"}`;
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "biohackers_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    setLines((prev) => {
      const id = lineId(line);
      const i = prev.findIndex((l) => lineId(l) === id);
      if (i === -1) return [...prev, { ...line, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (lineId(l) === id ? { ...l, qty: Math.max(0, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => lineId(l) !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.priceUSD, 0);
    const savings = lines.reduce((n, l) => {
      if (!l.kit) return n;
      const list = l.priceUSD / (1 - KIT_DISCOUNT);
      return n + l.qty * (list - l.priceUSD);
    }, 0);
    return { lines, count, subtotal, savings: Math.round(savings), add, setQty, remove, clear };
  }, [lines, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
