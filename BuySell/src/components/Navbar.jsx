import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const nav = useNavigate();
  const { user, isBuyer, isSeller, switchRole, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and navigation */}
          <div className="flex items-center">
            <button 
              onClick={() => nav("/")}
              className="flex items-center"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-8 h-8 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">AcquireFlow</span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <nav className="flex space-x-4">
                {isBuyer && (
                  <>
                    <button 
                      onClick={() => nav("/buyer/discover")}
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Discover
                    </button>
                    <button 
                      onClick={() => nav("/buyer/matches")}
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Matches
                    </button>
                  </>
                )}
                {isSeller && (
                  <>
                    <button 
                      onClick={() => nav("/seller/listing")}
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Listing
                    </button>
                    <button 
                      onClick={() => nav("/seller/matches")}
                      className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      My Matches
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>

          {/* Right side - User controls */}
          <div className="flex items-center">
            {user?.role && (
              <div className="hidden sm:flex items-center mr-4">
                <div className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
                  <span className="mr-2">●</span>
                  <span className="capitalize">{user.role} Mode</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              {user?.role && (
                <button 
                  onClick={switchRole}
                  className="hidden sm:flex items-center text-gray-600 hover:text-indigo-600 mr-4 text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Switch Role
                </button>
              )}
              
              <button 
                onClick={() => nav("/settings")}
                className="text-gray-600 hover:text-indigo-600 mr-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              {user?.role ? (
                <button 
                  onClick={logout}
                  className="flex items-center text-gray-600 hover:text-indigo-600 text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              ) : (
                <button 
                  onClick={() => nav("/auth")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}