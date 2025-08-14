import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function AuthGate() {
  const nav = useNavigate();
  const { loginAsBuyer, loginAsSeller } = useAuth();
  const { activeBuyerId, activeSellerId } = useData();

  const goBuyer = () => {
    loginAsBuyer();
    nav(activeBuyerId ? "/buyer/dashboard" : "/buyer-onboarding");
  };
  const goSeller = () => {
    loginAsSeller();
    nav(activeSellerId ? "/seller/dashboard" : "/seller-onboarding");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white border rounded-2xl p-8 space-y-6 text-center">
        <h1 className="text-2xl font-bold">Choose your role</h1>
        <p className="text-slate-600">This is a frontend-only demo with role-based UI.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <button onClick={goBuyer} className="btn-brand cursor-pointer">Continue as Buyer</button>
          <button onClick={goSeller} className="btn-subtle cursor-pointer">Continue as Seller</button>
        </div>
      </div>
    </div>
  );
}
