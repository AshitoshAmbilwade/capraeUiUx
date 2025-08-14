import React from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function BuyerProfile({ buyer }) {
  const { user } = useAuth();
  if (!buyer) return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-800">Buyer not found</h3>
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
        <h2 className="text-3xl font-bold text-gray-900">{buyer.name}</h2>
        <p className="text-lg text-indigo-600 font-medium">{buyer.company}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-lg text-gray-800">Preferences</h4>
          </div>
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-500">Industries</p>
              <p>{buyer.industryInterest?.join(", ") || <span className="text-gray-400">Not specified</span>}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Regions</p>
              <p>{buyer.preferredRegion || <span className="text-gray-400">Not specified</span>}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Timeline</p>
              <p>{buyer.acquisitionTimeline || <span className="text-gray-400">Not specified</span>}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Budget</p>
              <p>{buyer.budget || <span className="text-gray-400">Not specified</span>}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-lg text-gray-800">About Buyer</h4>
          </div>
          <div className="space-y-3 text-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-500">Experience</p>
              <p>{buyer.experience || <span className="text-gray-400">Not specified</span>}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact Preference</p>
              <p>{buyer.contactPreference || <span className="text-gray-400">Not specified</span>}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {buyer.bio && (
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h4 className="font-semibold text-lg text-gray-800">Bio</h4>
          </div>
          <p className="text-gray-700 leading-relaxed">{buyer.bio}</p>
        </motion.div>
      )}

      {user.role === "seller" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-200 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-indigo-900">Acquisition Intent</h3>
          </div>
          <p className="text-indigo-800">
            {buyer.intent || "Buyer has not shared intent."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}