import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Target, Sparkles, TrendingUp, ArrowRight, DollarSign, Globe, Shield, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, categories, Category } from "@/data/products";

const industries = ["Technology", "Finance", "Healthcare", "Retail", "Manufacturing", "Professional Services", "Construction", "Creative"];
const goals = ["Lead Generation", "Market Expansion", "Customer Enrichment", "Compliance Audit", "Direct Outreach", "Location Intelligence"];
const geos = ["UK Wide", "London", "Europe", "Global"];
const budgets = ["< £1,000", "£1,000 - £5,000", "£5,000 - £20,000", "£20,000+"];

const UseCaseNavigator = () => {
  const navigate = useNavigate();
  const [industry, setIndustry] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [geo, setGeo] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  const recommendations = useMemo(() => {
    return products.map((p) => {
      let score = 50;
      if (industry && p.industries.some((ind) => ind.name.toLowerCase().includes(industry.toLowerCase()))) score += 20;
      if (geo && p.geography.some((g) => g.toLowerCase().includes(geo.toLowerCase()))) score += 15;
      if (goal) score += Math.floor(Math.random() * 15) + 5;
      if (budget) score += 5;
      score = Math.min(99, score + Math.floor(Math.random() * 10));
      const reasons = [];
      if (industry) reasons.push(`Strong ${industry} coverage with ${p.industries[0]?.percentage || 20}% industry share`);
      if (geo) reasons.push(`Available in ${p.geography.join(", ")}`);
      reasons.push(`${p.confidenceScore}% confidence score ensures data quality`);
      const roi = Math.floor(Math.random() * 300) + 150;
      return { ...p, matchScore: score, reasons, estimatedROI: roi };
    })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);
  }, [industry, goal, geo, budget]);

  const hasFilters = industry || goal || geo || budget;

  const FilterChip = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(value === opt ? "" : opt)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              value === opt
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold">Use Case Navigator</h1>
          </div>
          <p className="text-muted-foreground">Tell us your needs — our AI recommends the perfect data products</p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border mb-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Filter className="w-4 h-4 text-primary" /> Configure Your Requirements
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FilterChip label="Industry" value={industry} options={industries} onChange={setIndustry} />
            <FilterChip label="Business Goal" value={goal} options={goals} onChange={setGoal} />
            <FilterChip label="Geography" value={geo} options={geos} onChange={setGeo} />
            <FilterChip label="Budget Tier" value={budget} options={budgets} onChange={setBudget} />
          </div>
        </motion.div>

        {/* Results */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold">
              {hasFilters ? "AI Recommendations" : "Top Products"}
            </h2>
            {hasFilters && (
              <button onClick={() => { setIndustry(""); setGoal(""); setGeo(""); setBudget(""); }}
                className="text-xs text-primary hover:underline">Clear all filters</button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {recommendations.map((rec, i) => (
                <motion.div
                  key={rec.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${rec.id}`)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                        {rec.category.replace("-", " ")}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-primary" />
                        <span className="text-sm font-bold text-primary">{rec.matchScore}% match</span>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{rec.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{rec.shortDescription}</p>

                    {/* Why it matches */}
                    <div className="space-y-1.5 mb-4">
                      {rec.reasons.slice(0, 2).map((r, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{(rec.volume / 1000000).toFixed(1)}M records</span>
                        <span>{rec.priceRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* ROI Preview */}
                  <div className="px-6 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <DollarSign className="w-3 h-3" />
                      Estimated ROI: <span className="font-bold text-emerald">{rec.estimatedROI}%</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs h-7">
                      View Details <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default UseCaseNavigator;
