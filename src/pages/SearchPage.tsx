import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, TrendingUp, BarChart3, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, categories, Category } from "@/data/products";
import GatedContent from "@/components/shared/GatedContent";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedGeo, setSelectedGeo] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query && selectedCategories.length === 0) return products;
    let r = products;
    if (selectedCategories.length > 0) r = r.filter((p) => selectedCategories.includes(p.category));
    if (query) {
      const q = query.toLowerCase();
      r = r.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.includes(q)
      );
    }
    return r;
  }, [query, selectedCategories]);

  const toggleCategory = (c: Category) =>
    setSelectedCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const drillProduct = results.find((p) => p.id === selectedProduct);

  return (
    <main className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">AI-Powered Search</h1>
          <p className="text-muted-foreground">Discover the right data products with intelligent search</p>
        </motion.div>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword, category, or use case..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-1" /> Filters
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-4 rounded-xl bg-card border border-border space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Categories</p>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((c) => (
                      <Button
                        key={c.id}
                        size="sm"
                        variant={selectedCategories.includes(c.id) ? "default" : "outline"}
                        onClick={() => toggleCategory(c.id)}
                        className="rounded-full text-xs"
                      >
                        {c.name}
                      </Button>
                    ))}
                  </div>
                </div>
                {selectedCategories.length > 0 && (
                  <button onClick={() => setSelectedCategories([])} className="text-xs text-primary flex items-center gap-1">
                    <X className="w-3 h-3" /> Clear filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-sm text-muted-foreground mb-4">{results.length} results found</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {results.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-5 rounded-xl bg-card border cursor-pointer transition-all hover-lift ${
                  selectedProduct === p.id ? "border-primary" : "border-border hover:border-primary/30"
                }`}
                onClick={() => setSelectedProduct(p.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{p.category.replace("-", " ")}</span>
                      <span className="text-xs text-muted-foreground">{p.confidenceScore}% confidence</span>
                    </div>
                    <h3 className="font-semibold mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{p.shortDescription}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{(p.volume / 1000000).toFixed(1)}M records</span>
                      <span className="flex items-center gap-1 text-emerald"><TrendingUp className="w-3 h-3" />{p.matchRate}% match</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate(`/product/${p.id}`); }}>
                      <Eye className="w-3.5 h-3.5 mr-1" /> View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Drill-down Panel */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {drillProduct ? (
                <motion.div
                  key={drillProduct.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="sticky top-24 space-y-4"
                >
                  <div className="p-5 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold mb-1">{drillProduct.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{drillProduct.shortDescription}</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <div className="text-lg font-bold text-primary">{drillProduct.confidenceScore}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <div className="text-lg font-bold">{(drillProduct.volume / 1000000).toFixed(1)}M</div>
                        <div className="text-xs text-muted-foreground">Records</div>
                      </div>
                    </div>
                    <Button size="sm" className="w-full gradient-primary border-0 text-primary-foreground" onClick={() => navigate(`/product/${drillProduct.id}`)}>
                      View Full Details
                    </Button>
                  </div>

                  <GatedContent feature="fullAnalytics">
                    <div className="p-5 rounded-xl bg-card border border-border">
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5 text-primary" /> Volume Preview
                      </h4>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={drillProduct.volumeByRegion.slice(0, 4)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                          <Tooltip />
                          <Bar dataKey="volume" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </GatedContent>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 rounded-xl bg-card border border-border text-center">
                  <BarChart3 className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Select a product to see analytics preview</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
