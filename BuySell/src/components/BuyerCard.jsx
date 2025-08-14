import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BuyerCard = ({ buyer }) => {
  const { addMatch, rejectMatch } = useContext(DataContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/buyer/${buyer.id}`);
  };

  const handleConnect = () => {
    // Always create a new match and navigate
    const matchId = addMatch(buyer.id, "seller");
    if (matchId) navigate(`/deal-room/${matchId}`);
  };

  return (
    <div className="bg-white shadow rounded-2xl p-4 flex justify-between items-center mb-4 border hover:shadow-md transition">
      <div onClick={handleViewProfile} className="cursor-pointer">
        <h3 className="text-lg font-semibold">{buyer.name}</h3>
        <p className="text-sm text-gray-500">{buyer.company}</p>
        <p className="text-sm text-gray-400">
          Interested: {buyer.industryInterest?.join(", ")}
        </p>
        <p className="text-xs text-gray-400">Budget: {buyer.budget || "N/A"}</p>
      </div>

      <div className="flex gap-2">
        {user.role === "seller" && (
          <button
            onClick={handleConnect}
            className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Connect
          </button>
        )}
        <button
          onClick={() => rejectMatch(buyer.id, "seller")}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 cursor-pointer"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default BuyerCard;
