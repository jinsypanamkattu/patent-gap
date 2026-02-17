import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, User, LogOut, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { useStore } from '../../hooks/useStore';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [particles, setParticles] = useState([]);
  const { state, logout, setPage } = useStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2,
      }))
    );
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const handleNavClick = (path) => {
    const fullPath = path.startsWith('/') ? path : `/${path}`;
    navigate(fullPath);
    setIsOpen(false);
  };

  const isActive = (path) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return location.pathname === normalizedPath;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#001a14]/95 backdrop-blur-2xl shadow-2xl shadow-emerald-500/10' 
            : 'bg-[#001a14]/80 backdrop-blur-xl'
        }`}
      >
        {/* Animated gradient border top with green glow */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <div 
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, #10b981 0%, #34d399 25%, #6ee7b7 50%, #34d399 75%, #10b981 100%)',
              backgroundSize: '200% 100%',
              animation: 'gradientFlow 4s linear infinite',
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-40 animate-shimmer"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: '-10px',
                animation: `particleFall ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
                boxShadow: '0 0 6px rgba(16, 185, 129, 0.8)',
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo with enhanced AI glow effect */}
            <div 
              className="flex items-center cursor-pointer group relative" 
              onClick={() => handleNavClick('/')}
            >
              <div className="relative">
                {/* Multi-layer green glow effect */}
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <img
                    src="/logo-white.png"
                    alt="Logo"
                    className="h-10 w-10 mr-3 object-contain relative z-10
                              transform group-hover:rotate-12 group-hover:scale-110
                              transition-all duration-500"
                    style={{ filter: "drop-shadow(0 0 8px rgba(16,185,129,0.8))" }}
                  />
                  {/* Orbiting ring */}
                  <div className="absolute inset-0 border-2 border-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
                </div>
              </div>
              
              <div className="relative">
                <span 
                  className="font-black text-2xl transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))',
                  }}
                >
                  Patent Gap AI
                </span>
                
                {/* Sparkles */}
                <Sparkles className="absolute -top-1 -right-6 h-4 w-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          style={{ animation: 'twinkle 1.5s ease-in-out infinite', filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 1))' }} />
                <Zap className="absolute -bottom-1 -left-2 h-3 w-3 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ animation: 'twinkle 1.5s ease-in-out infinite 0.3s', filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 1))' }} />
              </div>
            </div>

            {/* Desktop Navigation - Minimalist Pills */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={() => setActiveHover(item.path)}
                  onMouseLeave={() => setActiveHover(null)}
                  className="relative px-6 py-2.5 rounded-full font-semibold transition-all duration-300 group overflow-hidden"
                >
                  {/* Active/Hover background */}
                  <div 
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive(item.path) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                      boxShadow: isActive(item.path) 
                        ? '0 0 30px rgba(16, 185, 129, 0.5), inset 0 0 20px rgba(16, 185, 129, 0.2)' 
                        : '0 0 20px rgba(16, 185, 129, 0.3)',
                    }}
                  ></div>
                  
                  {/* Animated shine effect */}
                  <div 
                    className={`absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${
                      isActive(item.path) ? 'opacity-30' : 'opacity-0 group-hover:opacity-30'
                    }`}
                  ></div>

                  <span className={`relative z-10 transition-colors duration-300 ${
                    isActive(item.path) 
                      ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                      : 'text-emerald-300 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                </button>
              ))}
              
              {state.isAuthenticated ? (
                <>
                  <button 
                    onClick={() => handleNavClick('/dashboard')} 
                    className={`relative px-6 py-2.5 rounded-full font-semibold transition-all duration-300 group overflow-hidden ml-2 ${
                      isActive('/dashboard') ? '' : ''
                    }`}
                  >
                    <div 
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        isActive('/dashboard') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)',
                      }}
                    ></div>
                    <span className={`relative z-10 transition-colors duration-300 ${
                      isActive('/dashboard') ? 'text-white' : 'text-emerald-300 group-hover:text-white'
                    }`}>
                      Dashboard
                    </span>
                  </button>

                  <button 
                    onClick={() => handleNavClick('/profile')} 
                    className="relative flex items-center px-6 py-2.5 rounded-full font-semibold transition-all duration-300 group overflow-hidden ml-2 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                      boxShadow: '0 0 20px rgba(52, 211, 153, 0.4)',
                    }}
                  >
                    <User className="h-5 w-5 mr-2 text-white group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-white">Profile</span>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-20"></div>
                  </button>

                  <button 
                    onClick={handleLogout} 
                    className="relative flex items-center text-white px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-all duration-300 ml-2 group overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                    Logout
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 opacity-20"></div>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => handleNavClick('/login')} 
                  className="relative ml-2 px-8 py-2.5 rounded-full font-bold transition-all duration-300 group overflow-hidden hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                    boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)',
                  }}
                >
                  <span className="relative z-10 text-white">Login</span>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-30"></div>
                </button>
              )}
            </div>

            {/* Modern Hamburger Toggle */}
            <button 
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group z-50" 
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: isOpen ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' : 'transparent',
              }}
            >
              <div className="relative w-6 h-5 flex flex-col justify-center items-center">
                {/* Top line */}
                <span 
                  className={`absolute w-6 h-0.5 rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-white rotate-45 translate-y-0' : 'bg-emerald-400 -translate-y-2'
                  }`}
                  style={{
                    boxShadow: isOpen ? '0 0 10px rgba(255,255,255,0.8)' : '0 0 8px rgba(16, 185, 129, 0.8)',
                  }}
                ></span>
                
                {/* Middle line */}
                <span 
                  className={`absolute w-6 h-0.5 rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-white opacity-0 scale-0' : 'bg-emerald-400 opacity-100 scale-100'
                  }`}
                  style={{
                    boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)',
                  }}
                ></span>
                
                {/* Bottom line */}
                <span 
                  className={`absolute w-6 h-0.5 rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-white -rotate-45 translate-y-0' : 'bg-emerald-400 translate-y-2'
                  }`}
                  style={{
                    boxShadow: isOpen ? '0 0 10px rgba(255,255,255,0.8)' : '0 0 8px rgba(16, 185, 129, 0.8)',
                  }}
                ></span>
              </div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-xl bg-emerald-400 blur-lg transition-all duration-300 ${
                isOpen ? 'opacity-40 scale-110' : 'opacity-0 group-hover:opacity-30 scale-100'
              }`}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, #001a14 0%, #002920 50%, #003d2e 100%)',
        }}
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated circuit pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="mobileCircuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="2" fill="#10b981" opacity="0.6"/>
                  <line x1="40" y1="40" x2="80" y2="40" stroke="#10b981" strokeWidth="0.5" opacity="0.4"/>
                  <line x1="40" y1="40" x2="40" y2="0" stroke="#10b981" strokeWidth="0.5" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mobileCircuit)" 
                    style={{ animation: 'circuitFlow 30s linear infinite' }}/>
            </svg>
          </div>

          {/* Glowing orbs */}
          <div 
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, #10b981, transparent 70%)',
              top: '10%',
              left: '-10%',
              animation: 'orbFloat1 20s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, #34d399, transparent 70%)',
              bottom: '10%',
              right: '-10%',
              animation: 'orbFloat2 24s ease-in-out infinite',
            }}
          />

          {/* Animated particles */}
          {particles.slice(0, 30).map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.4,
                animation: `floatParticle ${particle.duration + 3}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
              }}
            />
          ))}
        </div>

        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-8 py-24">
          <div className="w-full max-w-md space-y-3">
            {navItems.map((item, index) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full group relative overflow-hidden transition-all duration-500 ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 80 + 100}ms` : '0ms',
                }}
              >
                <div className={`relative px-8 py-5 rounded-2xl transition-all duration-300 ${
                  isActive(item.path) ? 'shadow-lg' : ''
                }`}
                  style={{
                    background: isActive(item.path) 
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(52, 211, 153, 0.2))' 
                      : 'rgba(16, 185, 129, 0.05)',
                    border: isActive(item.path) 
                      ? '2px solid rgba(16, 185, 129, 0.5)' 
                      : '2px solid rgba(16, 185, 129, 0.1)',
                    boxShadow: isActive(item.path) 
                      ? '0 0 30px rgba(16, 185, 129, 0.3), inset 0 0 30px rgba(16, 185, 129, 0.1)' 
                      : 'none',
                  }}
                >
                  {/* Hover effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.1))',
                    }}
                  />
                  
                  {/* Shine effect */}
                  <div 
                    className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />

                  <div className="relative flex items-center justify-between">
                    <span className={`text-2xl font-bold transition-all duration-300 ${
                      isActive(item.path) 
                        ? 'text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]' 
                        : 'text-emerald-300 group-hover:text-white'
                    }`}>
                      {item.label}
                    </span>
                    <ChevronRight 
                      className={`w-6 h-6 transition-all duration-300 ${
                        isActive(item.path) 
                          ? 'text-white translate-x-2' 
                          : 'text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2'
                      }`}
                      style={{
                        filter: isActive(item.path) ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 1))' : 'none',
                      }}
                    />
                  </div>

                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 rounded-r-full"
                      style={{
                        background: 'linear-gradient(to bottom, #10b981, #34d399, #6ee7b7)',
                        boxShadow: '0 0 20px rgba(16, 185, 129, 1)',
                      }}
                    />
                  )}
                </div>
              </button>
            ))}
            
            {state.isAuthenticated ? (
              <>
                <button 
                  onClick={() => handleNavClick('/dashboard')} 
                  className={`w-full group relative overflow-hidden transition-all duration-500 ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${navItems.length * 80 + 100}ms` : '0ms',
                  }}
                >
                  <div className={`relative px-8 py-5 rounded-2xl transition-all duration-300 ${
                    isActive('/dashboard') ? 'shadow-lg' : ''
                  }`}
                    style={{
                      background: isActive('/dashboard') 
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))' 
                        : 'rgba(16, 185, 129, 0.05)',
                      border: isActive('/dashboard') 
                        ? '2px solid rgba(16, 185, 129, 0.5)' 
                        : '2px solid rgba(16, 185, 129, 0.1)',
                      boxShadow: isActive('/dashboard') 
                        ? '0 0 30px rgba(16, 185, 129, 0.3)' 
                        : 'none',
                    }}
                  >
                    <div className="relative flex items-center justify-between">
                      <span className={`text-2xl font-bold ${
                        isActive('/dashboard') ? 'text-white' : 'text-emerald-300'
                      }`}>
                        Dashboard
                      </span>
                      <ChevronRight className="w-6 h-6 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => handleNavClick('/profile')} 
                  className={`w-full group relative overflow-hidden transition-all duration-500 ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${(navItems.length + 1) * 80 + 100}ms` : '0ms',
                  }}
                >
                  <div className={`relative px-8 py-5 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                    isActive('/profile') ? 'shadow-lg' : ''
                  }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.2), rgba(16, 185, 129, 0.1))',
                      border: '2px solid rgba(52, 211, 153, 0.3)',
                      boxShadow: '0 0 25px rgba(52, 211, 153, 0.2)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-6 h-6 text-emerald-300" />
                      <span className="text-2xl font-bold text-white">Profile</span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </button>

                <button 
                  onClick={handleLogout} 
                  className={`w-full group relative overflow-hidden transition-all duration-500 ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${(navItems.length + 2) * 80 + 100}ms` : '0ms',
                  }}
                >
                  <div 
                    className="relative px-8 py-5 rounded-2xl transition-all duration-300 flex items-center justify-between"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.2))',
                      border: '2px solid rgba(239, 68, 68, 0.4)',
                      boxShadow: '0 0 25px rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="w-6 h-6 text-red-300 group-hover:-translate-x-1 transition-transform duration-300" />
                      <span className="text-2xl font-bold text-white">Logout</span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-red-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </button>
              </>
            ) : (
              <button 
                onClick={() => handleNavClick('/login')} 
                className={`w-full group relative overflow-hidden transition-all duration-500 ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `${navItems.length * 80 + 100}ms` : '0ms',
                }}
              >
                <div 
                  className="relative px-8 py-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                    boxShadow: '0 0 40px rgba(16, 185, 129, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-20"></div>
                  <div className="relative flex items-center justify-center">
                    <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      Login
                    </span>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Decorative elements at bottom */}
          <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-700 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
            style={{ transitionDelay: isOpen ? '600ms' : '0ms' }}
          >
            <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-emerald-400 rounded-full"></div>
            <Shield className="w-6 h-6 text-emerald-400" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))' }} />
            <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-emerald-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes particleFall {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100px) translateX(20px); opacity: 0; }
        }
        
        @keyframes floatParticle {
          0%, 100% { 
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% { 
            transform: translate(30px, -30px);
            opacity: 0.6;
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg) scale(1.2); }
          to { transform: rotate(360deg) scale(1.2); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.5; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes circuitFlow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }

        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(100px, 100px); }
        }

        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-100px, -100px); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;