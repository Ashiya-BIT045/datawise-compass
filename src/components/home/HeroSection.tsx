import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Shield, Database, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const typingTexts = [
  "Find B2B email contacts in London tech sector...",
  "Healthcare professionals in NHS trusts...",
  "New business registrations this month...",
  "TPS-screened telemarketing data for finance...",
];

const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const current = typingTexts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCharIndex((c) => c + 1);
          if (charIndex >= current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCharIndex((c) => c - 1);
          if (charIndex <= 0) {
            setIsDeleting(false);
            setTextIndex((t) => (t + 1) % typingTexts.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const displayText = typingTexts[textIndex].slice(0, charIndex);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-primary-foreground/90 mb-8">
            <Shield className="w-3.5 h-3.5" />
            Enterprise-Grade Data Intelligence
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Unlock Deep Insights.
            <br />
            <span className="text-gradient">Make Confident Comparisons.</span>
            <br />
            Acquire with Precision.
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10">
            Access 200M+ verified B2B data records across 8 categories. AI-powered discovery for modern enterprises.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="glass-strong rounded-2xl p-2 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-primary-foreground/50 shrink-0" />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${encodeURIComponent(query)}`)}
                  className="w-full bg-transparent border-0 outline-none text-primary-foreground placeholder:text-primary-foreground/30 py-3 text-sm"
                  placeholder=""
                />
                {!query && (
                  <div className="absolute inset-0 flex items-center text-primary-foreground/40 text-sm pointer-events-none">
                    {displayText}
                    <span className="animate-pulse ml-0.5">|</span>
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
              className="gradient-primary border-0 text-primary-foreground rounded-xl px-6"
            >
              Search <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 text-primary-foreground/60"
        >
          {[
            { icon: Database, label: "200M+ Records" },
            { icon: Shield, label: "GDPR Compliant" },
            { icon: BarChart3, label: "97% Accuracy" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <Icon className="w-4 h-4" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
