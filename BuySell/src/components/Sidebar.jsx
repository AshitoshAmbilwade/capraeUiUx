import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { isBuyer, isSeller, user } = useAuth();

  const buyerMenu = [
    { to: "/buyer/dashboard", label: "Dashboard" },
    { to: "/settings", label: "Settings" },
  ];

  const sellerMenu = [
    { to: "/seller/dashboard", label: "Dashboard" },
    { to: "/settings", label: "Settings" },
  ];

  const menu = isBuyer ? buyerMenu : isSeller ? sellerMenu : [];

  return (
    <aside className="w-56 shrink-0 border-r bg-white min-h-[calc(100vh-57px)] hidden md:block">
      <nav className="p-4 space-y-2">
        {user?.role ? (
          menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl cursor-pointer ${isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-50"}`
              }
            >
              {m.label}
            </NavLink>
          ))
        ) : (
          <div className="text-sm text-slate-500 p-3">
            Log in to see navigation.
          </div>
        )}
      </nav>
    </aside>
  );
}
