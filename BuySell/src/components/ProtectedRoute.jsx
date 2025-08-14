import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowed = [], children }) {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user?.role) return <Navigate to="/auth" state={{ from: loc }} replace />;
  if (allowed.length && !allowed.includes(user.role)) return <Navigate to="/auth" replace />;

  return children;
}
