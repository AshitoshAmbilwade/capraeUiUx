import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import BuyerCard from "../components/BuyerCard";

export default function SellerDashboard() {
  const { buyers } = useContext(DataContext);
  const { isSeller } = useAuth();

  if (!isSeller) return <p className="p-6 text-slate-500">Restricted to sellers.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buyer Discovery</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buyers.length === 0 ? (
          <p>No buyers available yet. Complete onboarding to see matches.</p>
        ) : (
          buyers.map((buyer) => <BuyerCard key={buyer.id} buyer={buyer} />)
        )}
      </div>
    </div>
  );
}
