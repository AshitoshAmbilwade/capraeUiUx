import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const SellerProfile = ({ seller }) => {
  const { user } = useAuth();
  if (!seller) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-800">Seller not found</h3>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{seller.name}</h2>
        <p className="text-lg text-purple-600 font-medium">{seller.company}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-lg text-gray-800">Business Details</h4>
          </div>
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-500">Industry</p>
              <p>{seller.industry || <span className="text-gray-400">Not specified</span>}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <p>${seller.revenue}M</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h4 className="font-semibold text-lg text-gray-800">Business Vision</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {seller.vision || "No vision provided"}
          </p>
        </motion.div>
      </div>

      {user.role === "buyer" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-purple-900">Why This Business?</h3>
          </div>
          <p className="text-purple-800">
            {seller.pitch || "Seller has not added a pitch yet."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SellerProfile;