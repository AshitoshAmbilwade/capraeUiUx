import { createContext, useContext, useMemo, useState, useEffect } from "react";

const AuthContext = createContext(null);

// LocalStorage-backed state
function useLocalState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

export function AuthProvider({ children }) {
  // user: { id, role: "buyer" | "seller" | null, name, avatar }
  const [user, setUser] = useLocalState("auth:user", { id: null, role: null, name: null, avatar: null });

  const loginAsBuyer = (name = "Buyer User") =>
    setUser({
      id: crypto.randomUUID(),
      role: "buyer",
      name,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
    });

  const loginAsSeller = (name = "Seller User") =>
    setUser({
      id: crypto.randomUUID(),
      role: "seller",
      name,
      avatar: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`,
    });

  const switchRole = () =>
    setUser((u) => ({
      ...u,
      role: u.role === "buyer" ? "seller" : "buyer",
    }));

  const logout = () => setUser({ id: null, role: null, name: null, avatar: null });

  const value = useMemo(
    () => ({
      user,
      isBuyer: user.role === "buyer",
      isSeller: user.role === "seller",
      loginAsBuyer,
      loginAsSeller,
      switchRole,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
