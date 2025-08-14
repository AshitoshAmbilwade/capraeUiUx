import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import SellerCard from "../components/SellerCard";

export default function BuyerDashboard() {
  const { sellers } = useContext(DataContext);
  const { isBuyer } = useAuth();

  if (!isBuyer) return <p className="p-6 text-slate-500">Restricted to buyers.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sellers for you</h2>
      <div className="space-y-3">
        {sellers.length === 0 ? (
          <p>No sellers yet. Come back later.</p>
        ) : (
          sellers.map((s) => <SellerCard key={s.id} seller={s} />)
        )}
      </div>
    </div>
  );
}
