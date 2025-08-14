import { useParams } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { DataContext } from "../context/DataContext";
import BuyerProfile from "../components/BuyerProfile";
import SellerProfile from "../components/SellerProfile";

const Profile = () => {
  const { id, type } = useParams();
  const { buyers, sellers } = useContext(DataContext);

  let profileData;
  if (type === "buyer") {
    profileData = buyers.find((b) => String(b.id) === id);
  } else if (type === "seller") {
    profileData = sellers.find((s) => String(s.id) === id);
  }

  if (!profileData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[60vh]"
      >
        <div className="text-center p-8 max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h3>
          <p className="text-gray-500">
            The profile you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className={`h-24 ${type === 'buyer' ? 'bg-indigo-600' : 'bg-purple-600'}`}></div>
            
            <div className="px-6 pb-6 -mt-12 relative">
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                  <img
                    src={profileData.avatar || `https://randomuser.me/api/portraits/${type === 'buyer' ? 'men' : 'women'}/${id}.jpg`}
                    alt={`${profileData.name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-500">{profileData.title || (type === 'buyer' ? 'Business Buyer' : 'Business Seller')}</p>
                
                <div className="mt-4 flex justify-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    type === 'buyer' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {type === 'buyer' ? 'Buyer' : 'Seller'}
                  </span>
                  {profileData.verified && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {profileData.email || 'Not provided'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {profileData.phone || 'Not provided'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {profileData.location || 'Location not specified'}
                  </div>
                </div>
              </div>
              
              {profileData.bio && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">About</h3>
                  <p className="mt-2 text-sm text-gray-600">{profileData.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-2/3">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {type === "buyer" ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                    </svg>
                    Buyer Profile
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Seller Profile
                  </>
                )}
              </h2>
            </div>
            
            <div className="p-6">
              {type === "buyer" ? (
                <BuyerProfile buyer={profileData} />
              ) : (
                <SellerProfile seller={profileData} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;