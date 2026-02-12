import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const { state } = useLocation() as any;
  const total = state?.total ?? 0;

  return (
    <main className="pt-24 pb-12 container mx-auto px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-4">Order Confirmed</h1>
        <p className="text-muted-foreground mb-6">Thank you — your order of £{total.toFixed(2)} was processed (simulated).</p>
        <div className="flex gap-3 justify-center">
          <Link to="/catalog"><Button className="gradient-primary border-0 text-primary-foreground">Browse More Datasets</Button></Link>
          <Link to="/profile"><Button variant="outline">View Orders</Button></Link>
        </div>
      </motion.div>
    </main>
  );
};

export default OrderSuccess;
