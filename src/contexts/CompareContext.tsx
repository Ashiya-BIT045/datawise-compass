import React, { createContext, useContext, useState, ReactNode } from "react";
import { DataProduct } from "@/data/products";

interface CompareContextType {
  compareList: DataProduct[];
  addToCompare: (product: DataProduct) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isMaxed: boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
};

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<DataProduct[]>([]);

  const addToCompare = (product: DataProduct): boolean => {
    if (compareList.length >= 3 || compareList.find((p) => p.id === product.id)) return false;
    setCompareList((prev) => [...prev, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (productId: string) => compareList.some((p) => p.id === productId);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare, isMaxed: compareList.length >= 3 }}>
      {children}
    </CompareContext.Provider>
  );
};
