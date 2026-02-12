import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Shield, TrendingUp, Download, Plus, Check, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, categories } from "@/data/products";
import { useCompare } from "@/contexts/CompareContext";
import GatedContent from "@/components/shared/GatedContent";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import UpgradeModal from "@/components/shared/UpgradeModal";
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from "recharts";

const COLORS = ["hsl(221,83%,53%)", "hsl(262,83%,58%)", "hsl(160,84%,39%)", "hsl(43,96%,56%)", "hsl(0,84%,60%)", "hsl(200,80%,50%)"];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addToCompare, isInCompare, isMaxed } = useCompare();

  if (!product) {
    return (
      <main className="pt-24 pb-12 container mx-auto px-4 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Button variant="ghost" onClick={() => navigate("/catalog")} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
        </Button>
      </main>
    );
  }

  const inCompare = isInCompare(product.id);
  const { addItem, items, removeItem } = useCart();
  const { role } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "premium" | "enterprise">((product.recommendedPlan as any) || "basic");
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <main className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/catalog")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                  {product.category.replace("-", " ")}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Updated {product.lastUpdated}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground max-w-2xl">{product.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant={inCompare ? "default" : "outline"}
                className={inCompare ? "gradient-primary border-0 text-primary-foreground" : ""}
                onClick={() => {
                  if (inCompare) return;
                  if (isMaxed) { toast.error("Maximum 3 products"); return; }
                  addToCompare(product);
                  toast.success("Added to compare");
                }}
              >
                {inCompare ? <><Check className="w-4 h-4 mr-1" /> In Compare</> : <><Plus className="w-4 h-4 mr-1" /> Compare</>}
              </Button>
              <Button variant="outline">Request Sample</Button>
              <Button className="gradient-primary border-0 text-primary-foreground">
                <Download className="w-4 h-4 mr-1" /> Get Data
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="volumes">Volumes & Samples</TabsTrigger>
            <TabsTrigger value="sample">Sample Data</TabsTrigger>
            <TabsTrigger value="dictionary">Data Dictionary</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Volume", value: `${(product.volume / 1000000).toFixed(1)}M`, sub: "records" },
                { label: "Confidence", value: `${product.confidenceScore}%`, sub: "accuracy" },
                { label: "Match Rate", value: `${product.matchRate}%`, sub: "coverage" },
                { label: "Price", value: product.priceRange, sub: "per record" },
              ].map((kpi) => (
                <div key={kpi.label} className="p-5 rounded-2xl bg-card border border-border">
                  <div className="text-xs text-muted-foreground mb-1">{kpi.label}</div>
                  <div className="text-2xl font-display font-bold text-primary">{kpi.value}</div>
                  <div className="text-xs text-muted-foreground">{kpi.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-4">Confidence Score</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="42" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
                      <circle cx="50" cy="50" r="42" stroke="url(#confGrad)" strokeWidth="8" fill="none" strokeLinecap="round"
                        strokeDasharray={`${product.confidenceScore * 2.64} ${264 - product.confidenceScore * 2.64}`} />
                      <defs>
                        <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(221,83%,53%)" />
                          <stop offset="100%" stopColor="hsl(262,83%,58%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-display font-bold">{product.confidenceScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-4">Industry Breakdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={product.industries} dataKey="percentage" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                      {product.industries.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.compliance.map((c) => (
                <span key={c} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-emerald/10 text-emerald">
                  <Shield className="w-3 h-3" /> {c}
                </span>
              ))}
              {product.geography.map((g) => (
                <span key={g} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                  <MapPin className="w-3 h-3" /> {g}
                </span>
              ))}
            </div>

            {/* Purchase Section */}
            <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold mb-3">Purchase Dataset</h3>
              <p className="text-sm text-muted-foreground mb-4">Choose a plan — prices shown are per dataset bundle.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {(["basic", "premium", "enterprise"] as const).map((plan) => {
                  const price = plan === "basic" ? product.price?.basic ?? 0 : plan === "premium" ? product.price?.premium ?? 0 : product.price?.enterprise ?? 0;
                  const recommended = product.recommendedPlan === plan;
                  const disabled = role === "guest";
                  const inCart = items.some((it) => it.productId === product.id && it.selectedPlan === plan);
                  return (
                    <div key={plan} className={`p-4 rounded-xl border ${selectedPlan === plan ? "border-primary/40 shadow-lg" : "border-border"} hover-lift`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium capitalize">{plan}</div>
                        {recommended && <div className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Recommended</div>}
                      </div>
                      <div className="text-2xl font-display font-bold mb-2">£{price}</div>
                      <div className="text-xs text-muted-foreground mb-3">Includes up to {product.availableRecords?.toLocaleString() ?? "N/A"} records</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant={selectedPlan === plan ? "default" : "outline"} onClick={() => setSelectedPlan(plan)} className="flex-1">
                          Select
                        </Button>
                        {inCart ? (
                          <Button size="sm" variant="ghost" onClick={() => removeItem(product.id, plan)} className="border border-border">
                            <XIcon className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button size="sm" disabled={disabled} onClick={() => {
                            if (disabled) { setShowUpgrade(true); return; }
                            addItem({ productId: product.id, productName: product.name, selectedPlan: plan, price });
                          }} className="gradient-primary border-0 text-primary-foreground">Add to Cart</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={() => {
                  if (role === "guest") { setShowUpgrade(true); return; }
                  // buy now -> add and go to checkout
                  const price = selectedPlan === "basic" ? product.price?.basic ?? 0 : selectedPlan === "premium" ? product.price?.premium ?? 0 : product.price?.enterprise ?? 0;
                  addItem({ productId: product.id, productName: product.name, selectedPlan, price });
                  window.location.href = "/checkout";
                }} className="gradient-primary border-0 text-primary-foreground">Buy Now</Button>
                {role === "trial" && <div className="text-sm text-muted-foreground">Trial User — purchases allowed</div>}
                {role === "guest" && <div className="text-sm text-muted-foreground">Login to view full pricing and purchase</div>}
              </div>
            </div>

            <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
          </TabsContent>

          {/* Volumes */}
          <TabsContent value="volumes">
            <GatedContent feature="fullAnalytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-semibold mb-4">Volume by Region</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={product.volumeByRegion}>
                      <defs>
                        <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(221,83%,53%)" stopOpacity={1} />
                          <stop offset="100%" stopColor="hsl(221,83%,53%)" stopOpacity={0.5} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                      <Bar dataKey="volume" fill="url(#volGrad)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald" /> Growth Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={product.growthTrend}>
                      <defs>
                        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
                      <Area type="monotone" dataKey="volume" stroke="hsl(160,84%,39%)" fill="url(#growthGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </GatedContent>
          </TabsContent>

          {/* Sample Data */}
          <TabsContent value="sample">
            <GatedContent feature="sampleData">
              <div className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        {product.sampleFields.map((f) => (
                          <th key={f} className="px-4 py-3 text-left font-medium text-muted-foreground">{f}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }).map((_, row) => (
                        <tr key={row} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                          {product.sampleFields.map((f, col) => (
                            <td key={col} className="px-4 py-3 text-muted-foreground">
                              {row < 2 ? `Sample ${f} ${row + 1}` : "••••••••"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </GatedContent>
          </TabsContent>

          {/* Data Dictionary */}
          <TabsContent value="dictionary">
            <GatedContent feature="dataDictionary">
              <div className="space-y-3">
                {product.dataDictionary.map((field) => (
                  <div key={field.field} className="p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-sm font-mono font-bold text-primary">{field.field}</code>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{field.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{field.description}</p>
                    <p className="text-xs text-muted-foreground">Example: <code className="text-foreground">{field.example}</code></p>
                  </div>
                ))}
              </div>
            </GatedContent>
          </TabsContent>

          {/* Related */}
          <TabsContent value="related">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products
                .filter((p) => p.id !== product.id)
                .slice(0, 3)
                .map((p) => (
                  <div key={p.id} onClick={() => navigate(`/product/${p.id}`)}
                    className="cursor-pointer p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover-lift">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{p.category.replace("-", " ")}</span>
                    <h3 className="font-semibold mt-2 mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.shortDescription}</p>
                    <div className="mt-3 text-xs text-muted-foreground">{(p.volume / 1000000).toFixed(1)}M records · {p.confidenceScore}% confidence</div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProductDetail;
