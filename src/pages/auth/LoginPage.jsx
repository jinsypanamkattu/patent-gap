import React, { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import HeroCarousel from '../../components/common/HeroCarousel';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/login.png';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, setPage } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.error || 'Login failed. Please try again.');
      } else {
      navigate('/dashboard'); // ✅ THIS is the missing piece
    }
  
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#EDEADC] min-h-screen">
      <HeroCarousel />
      
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Main Login Card */}
          <div className="bg-white/60 border-[1.5px] border-[#dcdab4]/45 rounded-3xl shadow-[0_12px_40px_rgba(25,25,112,0.15),0_4px_12px_rgba(25,25,112,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.40)] backdrop-blur-md backdrop-saturate-120 overflow-hidden">
            
            {/* Decorative Header Background */}
            <div 
              className="relative px-8 pt-10 pb-8 text-center"
              style={{
                background: 'linear-gradient(135deg, #051146 0%, #191970 50%, #2e3a8c 100%)'
              }}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A94D] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#4a5fa8] rounded-full blur-2xl"></div>
              </div>
              
              <div className="relative z-10">
                {/* Logo */}
                <div className="mb-4">
                  <img 
                    src={logo} 
                    alt="Patent Gap AI Logo" 
                    className="max-w-30 h-auto mx-auto"
                  />
                </div>
                
                {/* Welcome Text */}
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-white/80">Sign in to your Patent Gap AI account</p>
              </div>
            </div>

            {/* Form Content */}
            <div className="px-8 py-8">
              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3 animate-shake">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1F14] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/80 border-2 border-[#dcdab4]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970] focus:border-transparent transition-all duration-300 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#0A1F14] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 bg-white/80 border-2 border-[#dcdab4]/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191970] focus:border-transparent transition-all duration-300 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <button 
                    type="button"
                    onClick={() => navigate('/forgot')}
                    className="text-sm text-[#191970] hover:text-[#2e3a8c] font-semibold transition-colors"
                    disabled={loading}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="group w-full relative bg-[#C9A94D] text-[#0A1F14] px-8 py-3.5 rounded-xl font-bold uppercase tracking-wide text-sm shadow-[0_4px_18px_2px_rgba(201,169,77,0.3),0_2px_12px_2px_rgba(201,169,77,0.2),inset_0_0.5px_0.5px_0_rgba(255,255,220,0.19)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_4px_rgba(201,169,77,0.4),0_4px_20px_4px_rgba(201,169,77,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, #FFF8E2 0%, #C9A94D 38%, #B2923E 100%)'
                  }}
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? 'Logging in...' : 'Sign In'}
                    {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />}
                  </span>
                  
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>

                {/* Loading Spinner */}
                {loading && (
                  <div className="flex justify-center">
                    <LoadingSpinner size="sm" message="Authenticating..." />
                  </div>
                )}
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">New to Patent Gap AI?</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => navigate('/register')}
                  className="inline-flex items-center gap-2 text-[#191970] hover:text-[#2e3a8c] font-semibold transition-colors group"
                  disabled={loading}
                >
                  Create an Account
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              Your information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;