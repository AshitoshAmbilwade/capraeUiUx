import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import ProgressTracker from "../components/ProgressTracker";
import DocumentUpload from "../components/DocumentUpload";
import ChatBox from "../components/ChatBox";
import AIAnalyzer from "../components/AIAnalyzer";
import TaskList from "../components/TaskList";
import BuyerProfile from "../components/BuyerProfile";
import SellerProfile from "../components/SellerProfile";
import { useAuth } from "../context/AuthContext";

export default function DealRoom() {
  const { matchId } = useParams(); // get matchId from URL
  const { matches, buyers, sellers } = useContext(DataContext);
  const { user } = useAuth(); 

  // find only the selected match
  const match = matches.find((m) => m.matchId === matchId);

  if (!match) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Deal Room</h2>
        <p className="mt-2 text-slate-600">No active deal found.</p>
      </div>
    );
  }

  const buyer = buyers.find((b) => b.id === match.buyerId);
  const seller = sellers.find((s) => s.id === match.sellerId);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-indigo-600">
          Deal: {buyer?.name} ↔ {seller?.name}
        </h2>

        {/* Role-specific views */}
        {user.role === "buyer" && seller && <SellerProfile seller={seller} />}
        {user.role === "seller" && buyer && <BuyerProfile buyer={buyer} />}

        {/* Shared tools */}
        <ProgressTracker match={match} />
        <DocumentUpload match={match} />
        <ChatBox match={match} />

        {/* Role-specific tools */}
        {user.role === "buyer" && <AIAnalyzer match={match} />}
        {user.role === "seller" && <TaskList match={match} />}
      </div>
    </div>
  );
}
