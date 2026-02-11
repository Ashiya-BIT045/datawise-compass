import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Moon, Sun, LogIn, User, LogOut, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDark, toggleTheme }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role, isLoggedIn, userName, trialDaysLeft, logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/search", label: "AI Search" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">DataIQ</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === l.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {role === "trial" && trialDaysLeft > 0 && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Zap className="w-3 h-3" />
              {trialDaysLeft}d trial left
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-sm">
                <User className="w-3.5 h-3.5" />
                {userName}
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="text-muted-foreground">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="hidden md:flex gradient-primary border-0 text-primary-foreground">
                <LogIn className="w-4 h-4 mr-1" /> Sign In
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border"
          >
            <div className="p-4 flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gradient-primary border-0 text-primary-foreground mt-2">Sign In</Button>
                </Link>
              )}
              {isLoggedIn && (
                <Button variant="ghost" onClick={() => { logout(); setMobileOpen(false); }} className="justify-start">
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
