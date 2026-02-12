import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Search, Grid3X3, BarChart3, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { title: "Welcome to DataIQ", desc: "The intelligent B2B data discovery platform. Let us show you around.", icon: Sparkles, position: "center" },
  { title: "AI-Powered Search", desc: "Use our intelligent search to find the exact data products you need.", icon: Search, position: "top" },
  { title: "8 Data Categories", desc: "Browse Postal, Tele, Email, Healthcare, and more — all enterprise-grade.", icon: Grid3X3, position: "center" },
  { title: "Compare Products", desc: "Add products to compare side by side with detailed KPI analysis.", icon: BarChart3, position: "center" },
  { title: "Your Dashboard", desc: "Track usage, manage downloads, and monitor your data intelligence.", icon: User, position: "center" },
];

const OnboardingWalkthrough = () => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem("dataiq-onboarding-done");
    if (!completed) setShow(true);
  }, []);

  const complete = () => {
    localStorage.setItem("dataiq-onboarding-done", "true");
    setShow(false);
  };

  const next = () => {
    if (step >= steps.length - 1) complete();
    else setStep((s) => s + 1);
  };

  if (!show) return null;

  const current = steps[step];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="relative w-full max-w-md mx-4 p-8 rounded-3xl bg-card border border-border shadow-2xl"
        >
          <button onClick={complete} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <current.icon className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-display font-bold mb-2">{current.title}</h2>
            <p className="text-muted-foreground mb-8">{current.desc}</p>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {steps.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-primary" : "w-1.5 bg-muted"}`} />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button onClick={complete} className="text-sm text-muted-foreground hover:text-foreground">Skip tour</button>
              <Button onClick={next} className="gradient-primary border-0 text-primary-foreground">
                {step === steps.length - 1 ? "Get Started" : "Next"} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingWalkthrough;
