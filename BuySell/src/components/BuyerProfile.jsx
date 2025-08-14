import React from "react";
import { useAuth } from "../context/AuthContext";

export default function BuyerProfile({ buyer }) {
  const { user } = useAuth();
  if (!buyer) return <p>Buyer not found</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-2">{buyer.name}</h2>
      <p className="text-gray-600 mb-2">{buyer.company}</p>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded-xl bg-gray-50 border">
          <h4 className="font-semibold mb-2">Preferences</h4>
          <p><span className="font-medium">Industries:</span> {buyer.industryInterest?.join(", ") || "—"}</p>
          <p><span className="font-medium">Regions:</span> {buyer.preferredRegion || "—"}</p>
          <p><span className="font-medium">Timeline:</span> {buyer.acquisitionTimeline || "—"}</p>
          <p><span className="font-medium">Budget:</span> {buyer.budget || "—"}</p>
        </div>

        <div className="p-3 rounded-xl bg-gray-50 border">
          <h4 className="font-semibold mb-2">About Buyer</h4>
          <p><span className="font-medium">Experience:</span> {buyer.experience || "—"}</p>
          <p><span className="font-medium">Contact:</span> {buyer.contactPreference || "—"}</p>
        </div>
      </div>

      {buyer.bio && (
        <div className="mt-4 p-3 rounded-xl bg-gray-50 border">
          <h4 className="font-semibold mb-2">Bio</h4>
          <p className="text-slate-700">{buyer.bio}</p>
        </div>
      )}

      {user.role === "seller" && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <h3 className="font-semibold mb-1">Acquisition Intent</h3>
          <p className="text-sm text-indigo-700">
            {buyer.intent || "Buyer has not shared intent."}
          </p>
        </div>
      )}
    </div>
  );
}
