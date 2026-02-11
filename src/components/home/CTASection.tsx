import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 gradient-primary opacity-90" />
          <div className="absolute inset-0 gradient-mesh opacity-30" />
          <div className="relative z-10 px-8 py-16 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm mb-6">
              <Zap className="w-3.5 h-3.5" />
              Start your 7-day free trial
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Ready to Transform Your Data Strategy?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
              Join 2,000+ enterprises discovering smarter data. Full access, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 border-0 rounded-xl px-8"
              >
                Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => navigate("/catalog")}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8"
              >
                Browse Catalog
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
