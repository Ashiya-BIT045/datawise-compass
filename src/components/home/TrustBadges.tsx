import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle, Award, FileCheck, Eye } from "lucide-react";

const badges = [
  { icon: Shield, label: "GDPR Compliant", desc: "Full EU data protection" },
  { icon: Lock, label: "ISO 27001", desc: "Information security certified" },
  { icon: CheckCircle, label: "TPS Screened", desc: "Telephone preference service" },
  { icon: Award, label: "ICO Registered", desc: "UK data authority registered" },
  { icon: FileCheck, label: "Data Verified", desc: "Multi-source validation" },
  { icon: Eye, label: "Consent Audited", desc: "Lawful basis confirmed" },
];

const TrustBadges = () => (
  <section className="py-20 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Trust & <span className="text-gradient">Compliance</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Every data product meets the highest standards of compliance and data protection
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {badges.map(({ icon: Icon, label, desc }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center p-5 rounded-2xl bg-card border border-border hover-lift"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center mx-auto mb-3">
              <Icon className="w-5 h-5" />
            </div>
            <div className="font-semibold text-xs mb-1">{label}</div>
            <div className="text-xs text-muted-foreground">{desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
