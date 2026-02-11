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
          { title: "Products", links: ["Postal Data", "Telemarketing", "Email Data", "Healthcare"] },
          { title: "Resources", links: ["Documentation", "API Reference", "Compliance", "Blog"] },
          { title: "Company", links: ["About", "Careers", "Contact", "Privacy Policy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 DataIQ. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer">GDPR Compliant</span>
          <span className="hover:text-foreground cursor-pointer">ISO 27001</span>
          <span className="hover:text-foreground cursor-pointer">TPS Screened</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
