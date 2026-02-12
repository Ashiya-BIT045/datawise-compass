import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl shadow-2xl"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Compare ({compareList.length}/3)</span>
          </div>
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {compareList.map((p) => (
              <div key={p.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-sm shrink-0">
                <span className="font-medium truncate max-w-[140px]">{p.name}</span>
                <button onClick={() => removeFromCompare(p.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={clearCompare}>Clear</Button>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => navigate("/compare")} disabled={compareList.length < 2}>
              Compare <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareBar;
