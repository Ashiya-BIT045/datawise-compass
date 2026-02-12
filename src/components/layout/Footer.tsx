import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">DataIQ</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The intelligent B2B data discovery platform. Enterprise-grade data products for modern businesses.
          </p>
        </div>
        {[
          { title: "Products", links: [
            { label: "Catalog", to: "/catalog" },
            { label: "AI Search", to: "/search" },
            { label: "Use Cases", to: "/use-cases" },
            { label: "Compare", to: "/compare" },
          ]},
          { title: "Resources", links: [
            { label: "Trust Center", to: "/trust-center" },
            { label: "Documentation", to: "#" },
            { label: "API Reference", to: "#" },
            { label: "Blog", to: "#" },
          ]},
          { title: "Company", links: [
            { label: "About", to: "#" },
            { label: "Careers", to: "#" },
            { label: "Contact", to: "#" },
            { label: "Privacy Policy", to: "#" },
          ]},
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 DataIQ. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Link to="/trust-center" className="hover:text-foreground">GDPR Compliant</Link>
          <Link to="/trust-center" className="hover:text-foreground">ISO 27001</Link>
          <Link to="/trust-center" className="hover:text-foreground">TPS Screened</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
