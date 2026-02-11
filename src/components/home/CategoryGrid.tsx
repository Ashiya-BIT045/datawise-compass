import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, AtSign, Heart, Rocket, Home, MapPin, Layers } from "lucide-react";
import { categories } from "@/data/products";

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail className="w-6 h-6" />,
  Phone: <Phone className="w-6 h-6" />,
  AtSign: <AtSign className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Explore <span className="text-gradient">8 Data Categories</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enterprise-grade datasets covering every B2B data need
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/catalog?category=${cat.id}`)}
              className="group cursor-pointer p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
              >
                {iconMap[cat.icon]}
              </div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{cat.description}</p>
              <div className="text-xs font-mono font-bold text-primary">{cat.volume}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
