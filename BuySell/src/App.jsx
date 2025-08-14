import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import BuyerOnboarding from "./pages/BuyerOnboarding";
import SellerOnboarding from "./pages/SellerOnboarding";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import DealRoom from "./pages/DealRoom";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AuthGate from "./pages/AuthGate";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyerProfile from "./components/BuyerProfile";
import SellerProfile from "./components/SellerProfile";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<AuthGate />} />

            {/* Onboarding */}
            <Route path="/buyer-onboarding" element={<BuyerOnboarding />} />
            <Route path="/seller-onboarding" element={<SellerOnboarding />} />

            {/* Dashboards */}
            <Route
              path="/buyer/dashboard"
              element={
                <ProtectedRoute allowed={["buyer"]}>
                  <BuyerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seller/dashboard"
              element={
                <ProtectedRoute allowed={["seller"]}>
                  <SellerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Deal room */}
            <Route
              path="/deal-room/:matchId"
              element={
                <ProtectedRoute allowed={["buyer", "seller"]}>
                  <DealRoom />
                </ProtectedRoute>
              }
            />

            {/* Settings */}
            <Route path="/settings" element={<Settings />} />

            {/* Profile Pages */}
            <Route
              path="/profile/buyer/:id"
              element={
                <ProtectedRoute allowed={["seller"]}>
                  <BuyerProfileWrapper />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/seller/:id"
              element={
                <ProtectedRoute allowed={["buyer"]}>
                  <SellerProfileWrapper />
                </ProtectedRoute>
              }
            />

            {/* Redirect dashboard shortcut */}
            <Route
              path="/dashboard"
              element={
                user?.role === "seller" ? (
                  <Navigate to="/seller/dashboard" replace />
                ) : user?.role === "buyer" ? (
                  <Navigate to="/buyer/dashboard" replace />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Wrappers to fetch data by ID from context
import { useParams } from "react-router-dom";
import { useData } from "./context/DataContext";

function BuyerProfileWrapper() {
  const { id } = useParams();
  const { getBuyerById } = useData();
  const buyer = getBuyerById(id);
  return <BuyerProfile buyer={buyer} />;
}

function SellerProfileWrapper() {
  const { id } = useParams();
  const { getSellerById } = useData();
  const seller = getSellerById(id);
  return <SellerProfile seller={seller} />;
}
