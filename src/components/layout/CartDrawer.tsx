import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as XIcon, Trash as TrashIcon, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, isOpen, close, removeItem, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-full max-w-md z-60"
        >
          <div className="h-full bg-card border-l border-border p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Your Cart</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={clearCart} className="text-muted-foreground">
                  <TrashIcon className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={close} className="text-muted-foreground">
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {items.length === 0 ? (
                <div className="text-muted-foreground">Your cart is empty</div>
              ) : (
                items.map((it, i) => (
                  <div key={`${it.productId}-${it.selectedPlan}-${i}`} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{it.productName}</div>
                      <div className="text-xs text-muted-foreground">{it.selectedPlan} · Qty {it.quantity || 1}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-medium">£{(it.price * (it.quantity || 1)).toFixed(2)}</div>
                      <Button variant="ghost" size="icon" onClick={() => {
                        // remove item, show toast and close drawer if last
                        const wasLast = items.length <= 1;
                        removeItem(it.productId, it.selectedPlan);
                        toast.success(`${it.productName} removed from cart`);
                        if (wasLast) close();
                      }} aria-label={`Remove ${it.productName}`}>
                        <XIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="text-xl font-bold">£{totalPrice().toFixed(2)}</div>
              </div>
              <div className="flex gap-2">
                <Link to="/checkout" onClick={close} className="w-full">
                  <Button className="w-full gradient-primary border-0 text-primary-foreground">
                    <CreditCard className="w-4 h-4 mr-2" /> Checkout
                  </Button>
                </Link>
                <Button variant="outline" onClick={close} className="w-full">Continue</Button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
