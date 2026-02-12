import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UpgradeModal = ({ open, onClose }: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} transition={{ type: "spring" }} className="relative max-w-lg w-full p-6 bg-card border border-border rounded-2xl z-10">
            <h3 className="text-lg font-bold mb-2">Unlock Full Dataset Access</h3>
            <p className="text-muted-foreground mb-4">Login or start a free trial to purchase datasets, download samples and access full analytics.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose}>Later</Button>
              <Button className="gradient-primary border-0 text-primary-foreground" onClick={() => { onClose(); window.location.href = '/login'; }}>Login</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
