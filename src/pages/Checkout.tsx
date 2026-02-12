import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    // simulate processing
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    clearCart();
    navigate("/order-success", { state: { total: totalPrice() } });
  };

  return (
    <main className="pt-24 pb-12 container mx-auto px-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-display font-bold mb-4">Checkout</h1>
        <div className="rounded-2xl bg-card border border-border p-4 mb-6">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          {items.length === 0 ? <div className="text-muted-foreground">No items in cart</div> : (
            <div className="space-y-2">
              {items.map((it, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.productName}</div>
                    <div className="text-xs text-muted-foreground">{it.selectedPlan} · Qty {it.quantity || 1}</div>
                  </div>
                  <div className="font-medium">£{(it.price * (it.quantity || 1)).toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-card border border-border p-4 mb-6">
          <h3 className="font-semibold mb-2">Billing Details</h3>
          <form onSubmit={(e) => { e.preventDefault(); handlePay(); }} className="space-y-3">
            <input required placeholder="Full name" className="w-full p-3 rounded-lg bg-background border border-border" />
            <input required placeholder="Email" className="w-full p-3 rounded-lg bg-background border border-border" />
            <input placeholder="Company (optional)" className="w-full p-3 rounded-lg bg-background border border-border" />
            <div className="flex gap-2">
              <Button type="submit" className="gradient-primary border-0 text-primary-foreground" disabled={loading || items.length === 0}>
                {loading ? "Processing..." : `Pay £${totalPrice().toFixed(2)}`}
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
};

export default Checkout;
