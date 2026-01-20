import React, { useState } from 'react';
import { Menu, X, Shield, User, LogOut } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { useNavigate, useLocation } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, logout, setPage } = useStore();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
  logout();              // clear auth
  navigate('/login');    // redirect explicitly
  setIsOpen(false);      // close mobile menu (nice UX)
};


  const handleNavClick = (path) => {
    // Ensure path starts with /
    const fullPath = path.startsWith('/') ? path : `/${path}`;
    navigate(fullPath);
    setIsOpen(false);
  };

  const isActive = (path) => {
    // Normalize the path to always start with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return location.pathname === normalizedPath;
  };


  return (
    <nav className="bg-[#EDEADC] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => handleNavClick('/')}
          >
            <Shield className="h-8 w-8 mr-2 text-[#191970]" />
            <span className="font-bold text-xl text-[#191970]">Patent Gap AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleNavClick('/')} 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'bg-[#191970] text-white shadow-md' 
                  : 'text-[#191970] hover:bg-[#191970]/5'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('/services')} 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/services') 
                  ? 'bg-[#191970] text-white shadow-md' 
                  : 'text-[#191970] hover:bg-[#191970]/5'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('/about')} 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/about') 
                  ? 'bg-[#191970] text-white shadow-md' 
                  : 'text-[#191970] hover:bg-[#191970]/5'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('/contact')} 
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/contact') 
                  ? 'bg-[#191970] text-white shadow-md' 
                  : 'text-[#191970] hover:bg-[#191970]/5'
              }`}
            >
              Contact
            </button>
            
            {state.isAuthenticated ? (
              <>
                <button 
                  onClick={() => handleNavClick('/dashboard')} 
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive('/dashboard') 
                      ? 'bg-[#191970] text-white shadow-md' 
                      : 'text-[#191970] hover:bg-[#191970]/5'
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => handleNavClick('/profile')} 
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive('/profile') 
                      ? 'bg-[#191970] text-white shadow-md' 
                      : 'text-[#191970] hover:bg-[#191970]/5'
                  }`}
                >
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </button>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition-all"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavClick('/login')} 
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/login') 
                    ? 'bg-[#191970] text-white shadow-md' 
                    : 'text-[#191970] hover:bg-[#191970]/5'
                }`}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#191970] p-2" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <button 
              onClick={() => handleNavClick('/')} 
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'bg-[#191970] text-white' 
                  : 'text-[#191970] hover:bg-[#191970]/5'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('/services')} 
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                isActive('/services') 
                  ? 'bg-[#191970] text-white' 
                  : 'text-[#191970] hover:bg-[#191970]/5'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('/about')} 
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                isActive('/about') 
                  ? 'bg-[#191970] text-white' 
                  : 'text-[#191970] hover:bg-[#191970]/5'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('/contact')} 
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                isActive('/contact') 
                  ? 'bg-[#191970] text-white' 
                  : 'text-[#191970] hover:bg-[#191970]/5'
              }`}
            >
              Contact
            </button>
            
            {state.isAuthenticated ? (
              <>
                <button 
                  onClick={() => handleNavClick('/dashboard')} 
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive('/dashboard') 
                      ? 'bg-[#191970] text-white' 
                      : 'text-[#191970] hover:bg-[#191970]/5'
                  }`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => handleNavClick('/profile')} 
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive('/profile') 
                      ? 'bg-[#191970] text-white' 
                      : 'text-[#191970] hover:bg-[#191970]/5'
                  }`}
                >
                  Profile
                </button>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavClick('/login')} 
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/login') 
                    ? 'bg-[#191970] text-white' 
                    : 'text-[#191970] hover:bg-[#191970]/5'
                }`}
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;