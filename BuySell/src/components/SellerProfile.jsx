import React from "react";
import { useAuth } from "../context/AuthContext";

const SellerProfile = ({ seller }) => {
  const { user } = useAuth();
  if (!seller) return <p>Seller not found</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-2">{seller.name}</h2>
      <p className="text-gray-600 mb-2">{seller.company}</p>
      <p className="text-gray-500 mb-2">Industry: {seller.industry}</p>
      <p className="text-gray-500 mb-2">Revenue: ${seller.revenue}M</p>

      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-1">Business Vision</h3>
        <p className="text-sm text-gray-600">
          {seller.vision || "No vision provided"}
        </p>
      </div>

      {user.role === "buyer" && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <h3 className="font-semibold mb-1">Why This Business?</h3>
          <p className="text-sm text-indigo-700">
            {seller.pitch || "Seller has not added a pitch yet."}
          </p>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
