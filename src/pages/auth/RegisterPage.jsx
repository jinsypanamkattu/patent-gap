// Register Page
import React, { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import HeroCarousel from '../../components/common/HeroCarousel';
import { User, Mail, Lock, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });

  const { register, setPage } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    register(formData.name, formData.email, formData.password, formData.company);
  };

  return (
    <div className="bg-[#EDEADC] min-h-screen">
      <HeroCarousel />

      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#191970] mb-2">
            Create your account
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Start protecting your ideas today 🚀
          </p>

          {/* Glass Card */}
          <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl p-8 transition hover:shadow-3xl">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company (optional)
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company"
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group w-full bg-linear-to-br from-slate-950 via-blue-950 to-blue-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-xl transition-all"
              >
                Register
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              {/* Login */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-sm text-blue-700 hover:underline"
                >
                  Already have an account? Login
                </button>
              </div>

            </form>
          </div>

          {/* Footer hint */}
          <p className="text-xs text-gray-400 text-center mt-6">
            By signing up, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
