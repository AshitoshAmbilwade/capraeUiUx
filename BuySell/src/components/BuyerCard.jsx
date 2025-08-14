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
    const matchId = addMatch(buyer.id, "seller");
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
                  {buyer.name}
                </h3>
                <p className="text-sm font-medium text-indigo-600">{buyer.company}</p>
              </div>
              <div className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                Budget: {buyer.budget || "N/A"}
              </div>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {buyer.industryInterest?.slice(0, 3).map((industry, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {industry}
                </span>
              ))}
              {buyer.industryInterest?.length > 3 && (
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  +{buyer.industryInterest.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Acquisition Focus: {buyer.acquisitionFocus || "Growth"}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Preferred Regions: {buyer.preferredRegions?.join(", ") || "Global"}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between items-center">
        {user.role === "seller" ? (
          <>
            <button
              onClick={() => rejectMatch(buyer.id, "seller")}
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

export default BuyerCard;