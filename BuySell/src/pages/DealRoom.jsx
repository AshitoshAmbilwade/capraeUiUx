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
  const { matchId } = useParams(); // Get matchId from URL
  const { matches, buyers, sellers } = useContext(DataContext);
  const { user } = useAuth();

  // Find the specific match by matchId
  const match = matches.find(m => m.matchId === matchId);
  const buyer = buyers.find(b => b.id === match?.buyerId);
  const seller = sellers.find(s => s.id === match?.sellerId);

  if (!match) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Deal Not Found</h2>
          <p className="text-gray-600 mb-6">The deal you're looking for doesn't exist or has been removed</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Deal Room
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex -space-x-2">
                <div className="bg-gray-200 border-2 border-white rounded-full w-10 h-10" />
                <div className="bg-gray-200 border-2 border-white rounded-full w-10 h-10" />
              </div>
              <p className="ml-3 text-lg font-medium text-gray-700">
                {buyer?.name} ↔ {seller?.name}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-gray-500 text-sm">Status:</span>
              <span className="ml-2 font-medium text-indigo-600">Active</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <span className="text-gray-500 text-sm">Deal ID:</span>
              <span className="ml-2 font-mono text-indigo-600">{matchId.slice(0, 8)}</span>
            </div>
            <button className="flex items-center px-4 py-2 bg-white hover:bg-gray-50 rounded-full shadow-sm border border-gray-200 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Progress */}
          <div className="lg:col-span-1 space-y-6">
            {/* Counterparty Profile */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {user.role === "buyer" ? "Seller Profile" : "Buyer Profile"}
                </h2>
                <button className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium">
                  View full profile
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {user.role === "buyer" && seller && <SellerProfile seller={seller} />}
              {user.role === "seller" && buyer && <BuyerProfile buyer={buyer} />}
            </div>

            {/* Progress Tracker */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Deal Progress</h2>
              <ProgressTracker match={match} />
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Documents</h2>
              </div>
              <DocumentUpload match={match} />
            </div>
          </div>

          {/* Middle Column - Role-specific Tools */}
          <div className="lg:col-span-1 space-y-6">
            {user.role === "buyer" ? (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">AI Analysis</h2>
                </div>
                <AIAnalyzer match={match} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Action Items</h2>
                </div>
                <TaskList match={match} />
              </div>
            )}

            {/* Additional space for more tools */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Timeline</h2>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600 text-center py-8">Timeline visualization will appear here</p>
              </div>
            </div>
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Negotiation Chat</h2>
              </div>
              <ChatBox match={match} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}