import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const featured = products.slice(0, 4);

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Most popular data products this month</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/catalog")} className="hidden md:flex">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/product/${p.id}`)}
              className="group cursor-pointer rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                    {p.category.replace("-", " ")}
                  </span>
                  <div className="flex items-center gap-1 text-emerald text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    +{Math.round(Math.random() * 15 + 5)}%
                  </div>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Volume</div>
                    <div className="font-mono font-bold text-sm">{(p.volume / 1000000).toFixed(1)}M</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Confidence</div>
                    <div className="font-mono font-bold text-sm text-primary">{p.confidenceScore}%</div>
                  </div>
                </div>
              </div>
              <div className="h-1 w-full gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
