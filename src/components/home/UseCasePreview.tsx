import { motion } from "framer-motion";
import { Target, Globe, Heart, Mail, Rocket, MapPin } from "lucide-react";
import { useCases } from "@/data/products";

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
};

const UseCasePreview = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Built for Your <span className="text-gradient">Use Case</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Discover the right data products for your specific business objectives
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {useCases.map((uc, i) => (
          <motion.div
            key={uc.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {iconMap[uc.icon]}
              </div>
              <div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{uc.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{uc.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {uc.categories.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
                      {c.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasePreview;
