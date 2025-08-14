import { createContext, useContext, useMemo, useState, useEffect } from "react";

const AuthContext = createContext(null);

function useLocalState(key, initialValue) {
  const [state, setState] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initialValue; }
    catch { return initialValue; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} }, [key, state]);
  return [state, setState];
}

export function AuthProvider({ children }) {
  // user: { role: "buyer" | "seller" | null, name?: string }
  const [user, setUser] = useLocalState("auth:user", { role: null, name: null });

  const loginAsBuyer = (name = "Buyer User") => setUser({ role: "buyer", name });
  const loginAsSeller = (name = "Seller User") => setUser({ role: "seller", name });
  const switchRole = () =>
    setUser((u) => ({ ...u, role: u.role === "buyer" ? "seller" : "buyer" }));
  const logout = () => setUser({ role: null, name: null });

  const value = useMemo(
    () => ({ user, isBuyer: user.role === "buyer", isSeller: user.role === "seller", loginAsBuyer, loginAsSeller, switchRole, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
