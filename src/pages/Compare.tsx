import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Check, X as XIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { toast } from "sonner";

const COLORS = ["hsl(221,83%,53%)", "hsl(262,83%,58%)", "hsl(160,84%,39%)"];

const features = [
  "GDPR Compliant", "TPS Screened", "Real-time Updates", "API Access",
  "Bulk Download", "Custom Filters", "Geocoding", "Consent Verified",
];

const Compare = () => {
  const { compareList, clearCompare } = useCompare();
  const navigate = useNavigate();

  const handleExport = () => {
    // Create CSV content
    const headers = ["Metric", ...compareList.map(p => p.name)];
    const rows = [
      { label: "Category", values: compareList.map((p) => p.category.replace("-", " ")) },
      { label: "Volume", values: compareList.map((p) => `${(p.volume / 1000000).toFixed(1)}M`) },
      { label: "Confidence Score", values: compareList.map((p) => `${p.confidenceScore}%`) },
      { label: "Match Rate", values: compareList.map((p) => `${p.matchRate}%`) },
      { label: "Price Range", values: compareList.map((p) => p.priceRange) },
      { label: "Geography", values: compareList.map((p) => p.geography.join("; ")) },
      { label: "Last Updated", values: compareList.map((p) => p.lastUpdated) },
      { label: "Compliance", values: compareList.map((p) => p.compliance.join("; ")) },
    ];

    // Build CSV
    const csvContent = [
      headers.map(h => `"${h}"`).join(","),
      ...rows.map(row => [row.label, ...row.values].map(v => `"${v}"`).join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `product-comparison-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Comparison exported successfully!");
  };

  if (compareList.length < 2) {
    return (
      <main className="pt-24 pb-12 container mx-auto px-4 text-center">
        <p className="text-muted-foreground mb-4">Add at least 2 products to compare</p>
        <Button variant="ghost" onClick={() => navigate("/catalog")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Go to Catalog
        </Button>
      </main>
    );
  }

  const volumeData = compareList.map((p, i) => ({
    name: p.name.length > 20 ? p.name.slice(0, 20) + "…" : p.name,
    volume: p.volume,
    fill: COLORS[i],
  }));

  const confidenceData = compareList.map((p, i) => ({
    name: p.name,
    value: p.confidenceScore,
    fill: COLORS[i],
  }));

  return (
    <main className="pt-20 pb-24">
      <div className="container mx-auto px-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Product Comparison</h1>
            <p className="text-muted-foreground">Comparing {compareList.length} data products side by side</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearCompare}>Clear All</Button>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={handleExport}>
              <Download className="w-4 h-4 mr-1" /> Export
            </Button>
          </div>
        </motion.div>

        {/* KPI Table */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card border border-border overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left font-semibold text-muted-foreground">Metric</th>
                  {compareList.map((p, i) => (
                    <th key={p.id} className="px-6 py-4 text-left font-semibold" style={{ color: COLORS[i] }}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Category", values: compareList.map((p) => p.category.replace("-", " ")) },
                  { label: "Volume", values: compareList.map((p) => `${(p.volume / 1000000).toFixed(1)}M`) },
                  { label: "Confidence Score", values: compareList.map((p) => `${p.confidenceScore}%`) },
                  { label: "Match Rate", values: compareList.map((p) => `${p.matchRate}%`) },
                  { label: "Price Range", values: compareList.map((p) => p.priceRange) },
                  { label: "Geography", values: compareList.map((p) => p.geography.join(", ")) },
                  { label: "Last Updated", values: compareList.map((p) => p.lastUpdated) },
                  { label: "Compliance", values: compareList.map((p) => p.compliance.join(", ")) },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-muted-foreground">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-6 py-3.5 capitalize">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Volume Comparison */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Volume Comparison
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={volumeData}>
                <defs>
                  {COLORS.map((color, i) => (
                    <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={1} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip formatter={(v: number) => `${(v / 1000000).toFixed(1)}M records`} />
                <Bar dataKey="volume" radius={[6, 6, 0, 0]}>
                  {volumeData.map((_, i) => (
                    <Cell key={i} fill={`url(#barGrad${i})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Confidence Radial */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold mb-4">Confidence Score Comparison</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={confidenceData} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "hsl(var(--muted))" }}>
                  {confidenceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </RadialBar>
                <Legend iconSize={10} formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>} />
                <Tooltip formatter={(v: number) => `${v}%`} />
              </RadialBarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Industry Split */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {compareList.map((p, idx) => (
            <div key={p.id} className="p-6 rounded-2xl bg-card border border-border">
              <h4 className="font-semibold text-sm mb-3" style={{ color: COLORS[idx] }}>{p.name}</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={p.industries} dataKey="percentage" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                    {p.industries.map((_, i) => (
                      <Cell key={i} fill={COLORS[(i + idx) % COLORS.length]} opacity={1 - i * 0.15} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ))}
        </motion.div>

        {/* Feature Matrix */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold">Feature Matrix</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Feature</th>
                  {compareList.map((p, i) => (
                    <th key={p.id} className="px-6 py-3 text-center font-medium" style={{ color: COLORS[i] }}>{p.name.split(" ").slice(0, 2).join(" ")}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-3 text-muted-foreground">{f}</td>
                    {compareList.map((p) => {
                      const has = p.compliance.includes(f) || Math.random() > 0.3;
                      return (
                        <td key={p.id} className="px-6 py-3 text-center">
                          {has ? <Check className="w-4 h-4 text-emerald mx-auto" /> : <XIcon className="w-4 h-4 text-muted mx-auto" />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Compare;
