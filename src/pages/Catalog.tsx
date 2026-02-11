import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, TrendingUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products, categories, Category } from "@/data/products";

type SortKey = "name" | "volume" | "confidence";

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    (searchParams.get("category") as Category) || "all"
  );
  const [sortBy, setSortBy] = useState<SortKey>("confidence");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== "all") result = result.filter((p) => p.category === selectedCategory);
    if (query) result = result.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.shortDescription.toLowerCase().includes(query.toLowerCase()));
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "volume") return b.volume - a.volume;
      return b.confidenceScore - a.confidenceScore;
    });
    return result;
  }, [query, selectedCategory, sortBy]);

  return (
    <main className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Product Catalog</h1>
          <p className="text-muted-foreground">Browse {products.length} data products across {categories.length} categories</p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-1 flex-wrap">
                <Button
                  size="sm"
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="rounded-full text-xs"
                >
                  All
                </Button>
                {categories.map((c) => (
                  <Button
                    key={c.id}
                    size="sm"
                    variant={selectedCategory === c.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(c.id)}
                    className="rounded-full text-xs"
                  >
                    {c.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort:
            {(["confidence", "volume", "name"] as SortKey[]).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`capitalize text-xs px-2 py-1 rounded-md transition-colors ${
                  sortBy === s ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/product/${p.id}`)}
              className="group cursor-pointer rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                    {p.category.replace("-", " ")}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald">
                    <TrendingUp className="w-3 h-3" />
                    {p.matchRate}% match
                  </div>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.shortDescription}</p>

                {/* Confidence bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-mono font-bold text-primary">{p.confidenceScore}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full gradient-primary" style={{ width: `${p.confidenceScore}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{(p.volume / 1000000).toFixed(1)}M records</span>
                  <span>{p.priceRange}</span>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {p.compliance.slice(0, 3).map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-muted">{c}</span>
                  ))}
                </div>
              </div>
              <div className="h-1 w-full gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg mb-2">No products found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Catalog;
