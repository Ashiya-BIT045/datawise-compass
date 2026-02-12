import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const FloatingCartButton = () => {
  const { totalCount, toggle, totalPrice } = useCart();
  const count = totalCount();

  if (count === 0) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onClick={toggle}
      className="fixed right-6 bottom-6 z-50 bg-primary text-primary-foreground rounded-full px-4 py-3 shadow-lg flex items-center gap-3"
    >
      <ShoppingCart className="w-5 h-5" />
      <div className="text-sm font-medium">{count} • £{totalPrice().toFixed(2)}</div>
    </motion.button>
  );
};

export default FloatingCartButton;
