import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User, Settings, BarChart3, Heart, Download, Key, CreditCard,
  Zap, Crown, Clock, TrendingUp, ArrowRight, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
} from "recharts";

const usageData = [
  { month: "Sep", searches: 45, downloads: 12 },
  { month: "Oct", searches: 62, downloads: 18 },
  { month: "Nov", searches: 78, downloads: 24 },
  { month: "Dec", searches: 91, downloads: 31 },
  { month: "Jan", searches: 110, downloads: 42 },
  { month: "Feb", searches: 134, downloads: 55 },
];

const savedProducts = [
  { name: "UK Business Postal Database", category: "postal", confidence: 94 },
  { name: "B2B Verified Email Database", category: "email", confidence: 97 },
  { name: "Healthcare Professional Database", category: "healthcare", confidence: 93 },
];

const downloadHistory = [
  { name: "UK Business Postal - London Subset", date: "2026-02-10", records: 15000, format: "CSV" },
  { name: "Email Database - Tech Sector", date: "2026-02-08", records: 8500, format: "JSON" },
  { name: "New Business Registrations - Jan 2026", date: "2026-01-28", records: 4200, format: "CSV" },
];

const Profile = () => {
  const { role, userName, trialDaysLeft, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <main className="pt-24 pb-12 container mx-auto px-4 text-center">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Sign in to access your profile</h2>
        <p className="text-muted-foreground mb-6">Track usage, manage saved products, and more</p>
        <Button onClick={() => navigate("/login")} className="gradient-primary border-0 text-primary-foreground">
          Sign In <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </main>
    );
  }

  const isPaid = role === "paid";
  const isTrial = role === "trial";

  return (
    <main className="pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold ${isPaid ? "gradient-primary" : isTrial ? "bg-amber" : "bg-muted"}`}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-bold">{userName}</h1>
                {isPaid && <Crown className="w-5 h-5 text-amber" />}
                {isTrial && <Zap className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-muted-foreground text-sm capitalize">{role} Account</p>
            </div>
          </div>

          {isTrial && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Trial Period: {trialDaysLeft} days remaining</p>
                  <p className="text-xs text-muted-foreground">Upgrade to keep full access</p>
                </div>
              </div>
              <Button size="sm" className="gradient-primary border-0 text-primary-foreground">Upgrade Now</Button>
            </div>
          )}
        </motion.div>

        {/* KPI Row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Searches", value: "520", icon: BarChart3, change: "+23%" },
            { label: "Downloads", value: "182", icon: Download, change: "+15%" },
            { label: "Saved Products", value: "12", icon: Heart, change: "+3" },
            { label: "API Calls", value: isPaid ? "2,847" : "0", icon: Key, change: isPaid ? "+42%" : "N/A" },
          ].map((kpi) => (
            <div key={kpi.label} className="p-5 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-emerald font-medium">{kpi.change}</span>
              </div>
              <div className="text-2xl font-display font-bold">{kpi.value}</div>
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
            </div>
          ))}
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plan">Subscription</TabsTrigger>
            <TabsTrigger value="saved">Saved Products</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Usage Trend
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={usageData}>
                    <defs>
                      <linearGradient id="searchGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(221,83%,53%)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(221,83%,53%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="searches" stroke="hsl(221,83%,53%)" fill="url(#searchGrad)" strokeWidth={2} />
                    <Area type="monotone" dataKey="downloads" stroke="hsl(262,83%,58%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {downloadHistory.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="text-sm font-medium">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.date} · {d.records.toLocaleString()} records</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{d.format}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Subscription */}
          <TabsContent value="plan">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Free", price: "£0", features: ["5 searches/day", "Basic filters", "Limited previews"], current: role === "guest" },
                { name: "Professional", price: "£199/mo", features: ["Unlimited searches", "Full analytics", "API access", "Priority support", "Bulk downloads"], current: isTrial || isPaid, highlight: true },
                { name: "Enterprise", price: "Custom", features: ["Dedicated account manager", "Custom data feeds", "SLA guarantee", "White-label options", "Volume discounts"], current: false },
              ].map((plan) => (
                <div key={plan.name} className={`p-6 rounded-2xl border ${plan.highlight ? "border-primary bg-primary/5" : "border-border bg-card"} ${plan.current ? "ring-2 ring-primary" : ""}`}>
                  {plan.current && <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground mb-3 inline-block">Current Plan</span>}
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-2xl font-display font-bold text-primary mb-4">{plan.price}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="w-3.5 h-3.5 text-emerald" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.current ? "outline" : "default"} className={`w-full ${!plan.current && plan.highlight ? "gradient-primary border-0 text-primary-foreground" : ""}`} disabled={plan.current}>
                    {plan.current ? "Current" : "Upgrade"}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Saved */}
          <TabsContent value="saved">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedProducts.map((p) => (
                <div key={p.name} className="p-5 rounded-2xl bg-card border border-border hover-lift cursor-pointer" onClick={() => navigate("/catalog")}>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{p.category}</span>
                  <h3 className="font-semibold mt-2 mb-1">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.confidence}% confidence</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Downloads */}
          <TabsContent value="downloads">
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Dataset</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Records</th>
                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Format</th>
                  </tr>
                </thead>
                <tbody>
                  {downloadHistory.map((d, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                      <td className="px-6 py-3 font-medium">{d.name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{d.date}</td>
                      <td className="px-6 py-3">{d.records.toLocaleString()}</td>
                      <td className="px-6 py-3"><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{d.format}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* API Keys */}
          <TabsContent value="api">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Key className="w-4 h-4 text-primary" /> API Keys</h3>
              {isPaid ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">Production Key</p>
                      <p className="text-xs font-mono text-muted-foreground">dk_live_••••••••••••••••••••</p>
                    </div>
                    <Button size="sm" variant="outline">Reveal</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">Test Key</p>
                      <p className="text-xs font-mono text-muted-foreground">dk_test_••••••••••••••••••••</p>
                    </div>
                    <Button size="sm" variant="outline">Reveal</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Key className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">API access requires a paid plan</p>
                  <Button size="sm" className="gradient-primary border-0 text-primary-foreground">Upgrade to Access</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Profile;
