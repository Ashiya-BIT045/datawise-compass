import { motion } from "framer-motion";
import {
  Shield, Lock, FileCheck, Eye, Server, Database, Key,
  CheckCircle, Award, Globe, AlertTriangle, BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const complianceFrameworks = [
  { name: "GDPR", icon: Shield, status: "Certified", desc: "Full EU General Data Protection Regulation compliance. All data processing has lawful basis. Data subject rights fully supported.", color: "text-emerald" },
  { name: "HIPAA", icon: Lock, status: "Compliant", desc: "Health Insurance Portability and Accountability Act compliance for healthcare data. Encrypted PHI handling with BAA support.", color: "text-primary" },
  { name: "CCPA", icon: Eye, status: "Certified", desc: "California Consumer Privacy Act compliance. Consumer data rights, opt-out mechanisms, and transparency reports.", color: "text-violet" },
  { name: "ISO 27001", icon: Award, status: "Certified", desc: "International information security management standard. Annual third-party audits and continuous monitoring.", color: "text-amber" },
];

const securityFeatures = [
  { icon: Lock, label: "AES-256 Encryption", desc: "All data encrypted at rest and in transit" },
  { icon: Key, label: "OAuth 2.0 / API Keys", desc: "Secure authentication for all access" },
  { icon: Server, label: "SOC 2 Type II", desc: "Audited security controls and processes" },
  { icon: Database, label: "Geo-Redundant Storage", desc: "Multi-region data replication" },
  { icon: Shield, label: "DDoS Protection", desc: "Enterprise-grade network protection" },
  { icon: AlertTriangle, label: "24/7 Monitoring", desc: "Real-time threat detection and response" },
];

const auditLogs = [
  { date: "2026-02-10", action: "Security audit completed", status: "Passed", user: "System" },
  { date: "2026-02-05", action: "Data retention policy updated", status: "Applied", user: "Compliance Team" },
  { date: "2026-01-28", action: "Penetration test conducted", status: "Passed", user: "External Auditor" },
  { date: "2026-01-15", action: "ISO 27001 re-certification", status: "Certified", user: "BSI Group" },
  { date: "2026-01-08", action: "GDPR DPIA review", status: "Approved", user: "DPO" },
];

const TrustCenter = () => (
  <main className="pt-20 pb-12">
    <div className="container mx-auto px-4">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 text-emerald text-sm mb-6">
          <Shield className="w-3.5 h-3.5" /> Enterprise Security
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
          Trust & <span className="text-gradient">Compliance</span> Center
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Every data product meets the highest standards of security, privacy, and regulatory compliance
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: "Compliance Checks", value: 12847, suffix: "+" },
          { label: "Uptime", value: 99, suffix: ".99%" },
          { label: "Security Audits", value: 48, suffix: "" },
          { label: "Data Breaches", value: 0, suffix: "" },
        ].map((s) => (
          <div key={s.label} className="p-6 rounded-2xl bg-card border border-border text-center">
            <div className="text-3xl font-display font-bold text-primary mb-1">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Compliance Frameworks */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
        <h2 className="text-2xl font-display font-bold mb-6">Compliance Frameworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complianceFrameworks.map((fw, i) => (
            <motion.div key={fw.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center ${fw.color}`}>
                  <fw.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">{fw.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald/10 text-emerald">{fw.status}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{fw.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Security Architecture */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
        <h2 className="text-2xl font-display font-bold mb-6">Security Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityFeatures.map((sf, i) => (
            <motion.div key={sf.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
              className="p-5 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <sf.icon className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{sf.label}</h4>
              <p className="text-xs text-muted-foreground">{sf.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Lineage */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
        <h2 className="text-2xl font-display font-bold mb-6">Data Lineage & Processing</h2>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {["Source Collection", "Validation", "Consent Check", "Encryption", "Quality Score", "Delivery"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i === 5 ? "gradient-primary text-white" : "bg-primary/10 text-primary"}`}>
                    {i + 1}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1.5 text-center max-w-[80px]">{step}</span>
                </div>
                {i < 5 && <div className="hidden md:block w-8 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Audit Logs */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="text-2xl font-display font-bold mb-6">Recent Audit Activity</h2>
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Action</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Performed By</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-3 text-muted-foreground">{log.date}</td>
                  <td className="px-6 py-3 font-medium">{log.action}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald/10 text-emerald text-xs">{log.status}</span>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{log.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  </main>
);

export default TrustCenter;
