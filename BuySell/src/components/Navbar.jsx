import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const nav = useNavigate();
  const { user, isBuyer, isSeller, switchRole, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600" />
          <button onClick={() => nav("/")} className="font-semibold cursor-pointer">
            AcquireFlow
          </button>
          {user?.role && (
            <span className="ml-3 text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
              {isBuyer ? "Buyer" : "Seller"} mode
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user?.role && (
            <button onClick={switchRole} className="btn-subtle cursor-pointer hidden sm:inline-flex">
              Switch Role
            </button>
          )}
          <button onClick={() => nav("/settings")} className="btn-subtle cursor-pointer">Settings</button>
          {user?.role ? (
            <button onClick={logout} className="btn-brand cursor-pointer">Logout</button>
          ) : (
            <button onClick={() => nav("/auth")} className="btn-brand cursor-pointer">Login</button>
          )}
        </div>
      </div>
    </header>
  );
}
