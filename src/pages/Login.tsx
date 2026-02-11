import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ArrowRight, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, UserRole } from "@/contexts/AuthContext";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("trial");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, name || "User");
    navigate("/");
  };

  const handleGuest = () => {
    login("guest");
    navigate("/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-strong rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-primary-foreground mb-2">Welcome to DataIQ</h1>
            <p className="text-sm text-primary-foreground/60">Start your data intelligence journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-primary-foreground placeholder:text-primary-foreground/30"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
                <Input
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-primary-foreground placeholder:text-primary-foreground/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-primary-foreground/50 font-medium">Select your plan</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { role: "trial" as UserRole, label: "Free Trial", desc: "7 days full access", highlight: true },
                  { role: "paid" as UserRole, label: "Premium", desc: "Unlimited access", highlight: false },
                ].map((opt) => (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => setSelectedRole(opt.role)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedRole === opt.role
                        ? "border-primary bg-primary/20 text-primary-foreground"
                        : "border-white/10 text-primary-foreground/60 hover:border-white/20"
                    }`}
                  >
                    <div className="text-sm font-medium flex items-center gap-1.5">
                      {opt.highlight && <Zap className="w-3 h-3 text-amber" />}
                      {opt.label}
                    </div>
                    <div className="text-xs opacity-60 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground rounded-xl h-11">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={handleGuest} className="text-sm text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors">
              Continue as Guest →
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
