import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "guest" | "trial" | "paid";

interface AuthState {
  role: UserRole;
  trialStartDate: string | null;
  trialDaysLeft: number;
  isLoggedIn: boolean;
  userName: string;
}

interface AuthContextType extends AuthState {
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
  canAccess: (feature: string) => boolean;
}

const TRIAL_DAYS = 7;

const gatedFeatures: Record<string, UserRole[]> = {
  download: ["trial", "paid"],
  fullAnalytics: ["trial", "paid"],
  comparison: ["trial", "paid"],
  dataDictionary: ["trial", "paid"],
  sampleData: ["trial", "paid"],
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(() => {
    const saved = localStorage.getItem("dataiq-auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, trialDaysLeft: calcTrialDays(parsed.trialStartDate) };
    }
    return { role: "guest", trialStartDate: null, trialDaysLeft: 0, isLoggedIn: false, userName: "" };
  });

  useEffect(() => {
    localStorage.setItem("dataiq-auth", JSON.stringify(state));
  }, [state]);

  function calcTrialDays(start: string | null): number {
    if (!start) return 0;
    const diff = TRIAL_DAYS - Math.floor((Date.now() - new Date(start).getTime()) / 86400000);
    return Math.max(0, diff);
  }

  const login = (role: UserRole, name = "User") => {
    const trialStartDate = role === "trial" ? new Date().toISOString() : null;
    setState({
      role,
      trialStartDate,
      trialDaysLeft: role === "trial" ? TRIAL_DAYS : 0,
      isLoggedIn: role !== "guest",
      userName: name,
    });
  };

  const logout = () => {
    setState({ role: "guest", trialStartDate: null, trialDaysLeft: 0, isLoggedIn: false, userName: "" });
  };

  const canAccess = (feature: string) => {
    const allowed = gatedFeatures[feature];
    if (!allowed) return true;
    if (state.role === "trial" && state.trialDaysLeft <= 0) return false;
    return allowed.includes(state.role);
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, canAccess }}>
      {children}
    </AuthContext.Provider>
  );
};
