import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";

export type Plan = "basic" | "premium" | "enterprise";

export interface CartItem {
  productId: string;
  productName: string;
  selectedPlan: Plan;
  price: number;
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, plan?: Plan) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalCount: () => number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CART_KEY = "dataiq-cart";

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.productId === item.productId && p.selectedPlan === item.selectedPlan);
      if (existing) {
        return prev.map((p) => p === existing ? { ...p, quantity: (p.quantity || 1) + (item.quantity || 1) } : p);
      }
      toast.success(`${item.productName} added to cart`);
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, plan?: Plan) => {
    setItems((prev) => prev.filter((p) => !(p.productId === productId && (!plan || p.selectedPlan === plan))));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = () => items.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const totalCount = () => items.reduce((s, i) => s + (i.quantity || 1), 0);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalPrice, totalCount, isOpen, open, close, toggle }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
