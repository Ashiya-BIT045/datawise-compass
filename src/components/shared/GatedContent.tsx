import { ReactNode } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface GatedContentProps {
  feature: string;
  children: ReactNode;
  fallbackMessage?: string;
}

const GatedContent = ({ feature, children, fallbackMessage = "Sign up for full access" }: GatedContentProps) => {
  const { canAccess } = useAuth();
  const navigate = useNavigate();

  if (canAccess(feature)) return <>{children}</>;

  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-lg">
        <div className="text-center p-6">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium mb-1">Premium Feature</p>
          <p className="text-xs text-muted-foreground mb-4">{fallbackMessage}</p>
          <Button size="sm" onClick={() => navigate("/login")} className="gradient-primary border-0 text-primary-foreground">
            Unlock Access
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GatedContent;
