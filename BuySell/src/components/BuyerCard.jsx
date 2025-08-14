import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BuyerCard = ({ buyer }) => {
  const { matches, addMatch, rejectMatch, activeSellerId } = useContext(DataContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isMatched = matches.some((m) => m.buyerId === buyer.id && m.sellerId === activeSellerId);

  const handleViewProfile = () => {
    navigate(`/profile/buyer/${buyer.id}`);
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
        {!isMatched ? (
          <>
            {user.role === "seller" && (
              <button
                onClick={() => {
                  const matchId = addMatch(buyer.id, "seller");
                  if (matchId) navigate(`/deal-room/${matchId}`);
                }}
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
          </>
        ) : (
          <button
            onClick={() => {
              const match = matches.find(
                (m) => m.buyerId === buyer.id && m.sellerId === activeSellerId
              );
              if (match) navigate(`/deal-room/${match.matchId}`);
              else alert("No active deal found");
            }}
            className="bg-emerald-600 text-white px-3 py-1 rounded-md hover:bg-emerald-700 cursor-pointer"
          >
            Connect to chat
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyerCard;
