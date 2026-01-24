import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { mockPatents } from '../../utils/mockData';
import {
  Plus,
  FileText,
  Search,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import ProjectCard from '../../components/dashboard/ProjectCard';
import StatCard from '../../components/dashboard/StatCard';
import WeeklySearchCard from '../../components/dashboard/WeeklySearchCard';
import ProjectModal from '../../components/dashboard/ProjectModal';

const DashboardPage = () => {
  const { state, setPage } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activePatents = state.patents.filter(p => p.status === 'active');
  const closedPatents = state.patents.filter(p => p.status === 'closed');

  const newPatent = { title: '', patentNumber: '' };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#EDEADC] via-[#F5F3E8] to-[#EDEADC] px-6 py-8">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(201, 169, 77, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(201, 169, 77, 0.5);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .animate-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-3 { animation-delay: 0.3s; opacity: 0; }
        .animate-delay-4 { animation-delay: 0.4s; opacity: 0; }
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <div className="max-w-400 mx-auto space-y-10">

        {/* Header with gradient text */}
       <div className="animate-fadeInUp relative">
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
    @keyframes grid-scan {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    @keyframes shimmer-slide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .grid-dot-1 { animation: grid-scan 2s ease-in-out 0s infinite; }
    .grid-dot-2 { animation: grid-scan 2s ease-in-out 0.3s infinite; }
    .grid-dot-3 { animation: grid-scan 2s ease-in-out 0.6s infinite; }
    .grid-dot-4 { animation: grid-scan 2s ease-in-out 0.9s infinite; }
    .grid-dot-5 { animation: grid-scan 2s ease-in-out 1.2s infinite; }
    .grid-dot-6 { animation: grid-scan 2s ease-in-out 1.5s infinite; }
  `}</style>
  
  {/* Enhanced gradient orbs */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-linear-to-br from-blue-400/20 via-indigo-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute -top-5 -right-5 w-32 h-32 bg-linear-to-br from-purple-400/20 via-pink-500/20 to-blue-600/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
  
  {/* Main container with glassmorphism */}
  <div className="relative bg-linear-to-br from-white/60 via-white/80 to-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/40 overflow-hidden">
    {/* Shimmer effect */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer-slide 3s ease-in-out infinite' }}></div>
    </div>
    
    <div className="relative flex items-center gap-4 mb-3">
      {/* Animated AI Grid Icon */}
      <div className="relative" style={{ animation: 'float 3s ease-in-out infinite' }}>
        <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl blur-md opacity-50"></div>
        <div className="relative w-14 h-14 bg-linear-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <div className="grid grid-cols-3 gap-0.5 p-1">
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-1"></div>
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-2"></div>
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-3"></div>
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-4"></div>
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-5"></div>
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-6"></div>
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-1"></div>
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-2"></div>
            <div className="w-2 h-2 bg-white/90 rounded-sm grid-dot-3"></div>
          </div>
        </div>
      </div>
      
      {/* Title Section */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-10 bg-linear-to-b from-blue-500 via-indigo-600 to-purple-600 rounded-full shadow-lg"></div>
            <h1 className="text-4xl font-black bg-linear-to-r from-slate-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
               Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
            <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <Sparkles className="h-3 w-3 text-purple-600 animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-3">
          <div className="h-0.5 w-16 bg-linear-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full"></div>
          <p className="text-slate-600 text-sm font-medium">
            Manage your patent analysis projects and view recent activity
          </p>
        </div>
      </div>
    </div>
    
    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-40"></div>
  </div>
</div>

        {/* Start New Analysis - Enhanced */}
        <div className="animate-fadeInUp animate-delay-1 group relative overflow-hidden bg-linear-to-br from-[#191970] via-[#2e3a8c] to-[#191970] rounded-2xl p-8 shadow-2xl border border-white/10">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-r from-[#C9A94D]/0 via-[#C9A94D]/10 to-[#C9A94D]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 flex justify-between items-center flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-6 w-6 text-[#C9A94D]" />
                <h2 className="text-2xl font-bold text-white">Start New Analysis</h2>
              </div>
              <p className="text-white/80 text-sm max-w-md">
                Upload a patent or portfolio to begin comprehensive infringement analysis powered by AI
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group/btn relative bg-linear-to-r from-[#C9A94D] to-[#FFD700] text-[#191970] px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                <Plus size={18} className="relative z-10" />
                <span className="relative z-10">New Single Patent</span>
              </button>

              <button className="group/btn relative border-2 border-white/30 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300">
                <FileText size={18} />
                <span>Upload Portfolio</span>
              </button>

              <button className="group/btn relative border-2 border-white/30 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300">
                <Search size={18} />
                <span>Search by ID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Scans"
            value={activePatents.length}
            subtitle="This week"
            icon={<Search />}
            color="blue"
          />
          <StatCard
            title="Patents Analyzed"
            value={state.patents.length}
            subtitle="Total"
            icon={<FileText />}
            color="purple"
          />
          <StatCard
            title="High Risk Matches"
            value={0}
            subtitle="Requires attention"
            icon={<AlertTriangle />}
            color="yellow"
          />
          <StatCard
            title="Cleared Patents"
            value={closedPatents.length}
            subtitle="No infringement"
            icon={<CheckCircle />}
            color="green"
          />
        </div>
        
        {/* Recent Projects */}
        <div className="animate-fadeInUp animate-delay-3">
          <div className="group relative mb-6">
  {/* Animated gradient background */}
  <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/30 via-indigo-600/30 to-purple-600/30 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
  
  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-blue-200/40 overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-linear-to-tr from-indigo-500/10 to-purple-600/10 rounded-full blur-2xl"></div>
    
    {/* Animated corner accent */}
    <div className="absolute top-0 left-0 w-16 h-16">
      <div className="absolute top-0 left-0 w-1 h-8 bg-linear-to-b from-blue-500 to-transparent rounded-full"></div>
      <div className="absolute top-0 left-0 w-8 h-1 bg-linear-to-r from-blue-500 to-transparent rounded-full"></div>
    </div>
    
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Animated icon badge */}
        <div className="relative">
  <style>{`
    @keyframes rotate-grid { 
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.1); }
      100% { transform: rotate(360deg) scale(1); }
    }
  `}</style>
  <div className="absolute inset-0 bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-xl blur-md opacity-50"></div>
  <div className="relative w-12 h-12 bg-linear-to-br from-sky-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
    <div className="grid grid-cols-3 gap-1 p-1.5" style={{ animation: 'rotate-grid 4s ease-in-out infinite' }}>
      <div className="w-2 h-2 bg-white/90 rounded-full"></div>
      <div className="w-2 h-2 bg-white/70 rounded-full"></div>
      <div className="w-2 h-2 bg-white/90 rounded-full"></div>
      <div className="w-2 h-2 bg-white/70 rounded-full"></div>
      <div className="w-2 h-2 bg-white/90 rounded-full"></div>
      <div className="w-2 h-2 bg-white/70 rounded-full"></div>
      <div className="w-2 h-2 bg-white/90 rounded-full"></div>
      <div className="w-2 h-2 bg-white/70 rounded-full"></div>
      <div className="w-2 h-2 bg-white/90 rounded-full"></div>
    </div>
  </div>
</div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs uppercase tracking-widest font-bold text-slate-600">Portfolio</span>
          </div>
          <h2 className="text-2xl font-black bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Recent Projects
          </h2>
        </div>
      </div>
      
      {/* Premium gradient button */}
      <button className="group/btn relative overflow-hidden">
        {/* Button glow */}
        <div className="absolute -inset-1 bg-linear-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-xl blur-md opacity-50 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        
        {/* Button content */}
        <div className="relative px-6 py-3 bg-linear-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transform group-hover/btn:scale-105 transition-all duration-300">
          <span className="relative z-10">View All</span>
          <ArrowRight className="relative z-10 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
          
          {/* Inner gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        </div>
      </button>
    </div>
    
    {/* Bottom gradient accent */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    
    {/* Shine sweep across entire container */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
  </div>
</div>
          <div className="grid md:grid-cols-3 gap-6">
            {mockPatents.map((patent, index) => (
              <div
                key={patent.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${0.5 + index * 0.1}s`, opacity: 0 }}
              >
                <ProjectCard {...patent} />
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Search Results */}
        <div className="animate-fadeInUp animate-delay-4">
          <div className="group relative mb-6">
  {/* Animated gradient background */}
  <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500/30 via-teal-600/30 to-cyan-600/30 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
  
  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-emerald-200/40 overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-linear-to-tr from-teal-500/10 to-cyan-600/10 rounded-full blur-2xl"></div>
    
    {/* Animated corner accent */}
    <div className="absolute top-0 left-0 w-16 h-16">
      <div className="absolute top-0 left-0 w-1 h-8 bg-linear-to-b from-emerald-500 to-transparent rounded-full"></div>
      <div className="absolute top-0 left-0 w-8 h-1 bg-linear-to-r from-emerald-500 to-transparent rounded-full"></div>
    </div>
    
    <div className="relative z-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Animated icon badge */}
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-xl blur-md opacity-50"></div>
          <div className="relative w-12 h-12 bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/60 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs uppercase tracking-widest font-bold text-slate-600">Automated Monitoring</span>
          </div>
          <h2 className="text-2xl font-black bg-linear-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
            Weekly Search Results
          </h2>
        </div>
      </div>
    </div>
    
    {/* Bottom gradient accent */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
    
    {/* Shine sweep across entire container */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
  </div>
</div>

          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-[#C9A94D]/20 to-[#191970]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <WeeklySearchCard
              title="Automated VGR Monitoring"
              statusText="Last scan: Loading..."
              description="Weekly automated scans monitor competitor filings and industry changes relevant to your portfolio."
              badge="0 new results"
            />
          </div>
        </div>

      </div>

      {/* Modal for New Patent */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={newPatent}
      />
    </div>
  );
};

export default DashboardPage;