import React, { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import HeroCarousel from '../../components/common/HeroCarousel';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
   const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { setPage } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#EDEADC] min-h-screen">
      <HeroCarousel />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#191970] mb-3">
            Forgot your password?
          </h2>
          <p className="text-center text-gray-600 mb-10">
            No worries — we’ll help you get back in.
          </p>

          {/* Card */}
          <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-gray-100 p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                
                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-linear-to-br from-slate-950 via-blue-950 to-blue-900 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
                >
                  Send reset link
                </button>

                {/* Back */}
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-2 text-sm text-blue-700 hover:underline"
                  >
                    <ArrowLeft size={16} />
                    Back to login
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <CheckCircle className="mx-auto text-green-500 w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Email sent successfully
                </h3>
                <p className="text-gray-600 mb-6">
                  We’ve sent a password reset link to <br />
                  <span className="font-medium text-gray-900">{email}</span>
                </p>

                <button
                   onClick={() => navigate('/login')}
                  className="inline-flex items-center gap-2 text-blue-700 hover:underline"
                >
                  <ArrowLeft size={16} />
                  Back to login
                </button>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <p className="text-xs text-gray-400 text-center mt-6">
            If you don’t see the email, check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
