import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SellerCard = ({ seller }) => {
  const { addMatch, rejectMatch } = useContext(DataContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/seller/${seller.id}`);
  };

  const handleConnect = () => {
    const matchId = addMatch(seller.id, "buyer");
    if (matchId) navigate(`/deal-room/${matchId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 
                  onClick={handleViewProfile}
                  className="text-xl font-bold text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors"
                >
                  {seller.name}
                </h3>
                <p className="text-sm font-medium text-indigo-600">{seller.company}</p>
              </div>
              <div className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                Revenue: ${seller.revenue}M
              </div>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {seller.industry}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {seller.location}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Business Type: {seller.businessType || "Private"}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Location: {seller.location || "N/A"}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between items-center">
        {user.role === "buyer" ? (
          <>
            <button
              onClick={() => rejectMatch(seller.id, "buyer")}
              className="text-gray-600 hover:text-gray-900 flex items-center text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Not interested
            </button>
            
            <button
              onClick={handleConnect}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Connect
            </button>
          </>
        ) : (
          <button
            onClick={handleViewProfile}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View full profile
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SellerCard;