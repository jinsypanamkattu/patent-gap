import { Clock, ArrowUpRight, Cpu, Shield, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ 
  id, 
  title, 
  patentNumber, 
  status, 
  updatedAt, 
  inventors, 
  filedDate, 
  keywords, 
  description, 
  matchesCount, 
  documentsCount 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/patent-detail', {
      state: {
        id,
        title,
        patentNumber,
        status,
        updatedAt,
        inventors,
        filedDate,
        keywords,
        description,
        matchesCount,
        documentsCount
      }
    });
  };

  const statusConfig = {
    'Patented': { 
      color: '#10b981',
      icon: CheckCircle,
      label: 'ACTIVE',
      gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    'Active': { 
      color: '#10b981',
      icon: CheckCircle,
      label: 'ACTIVE',
      gradient: 'from-emerald-500/20 to-teal-500/20'
    },
    'Expired': { 
      color: '#ef4444',
      icon: AlertCircle,
      label: 'EXPIRED',
      gradient: 'from-red-500/20 to-rose-500/20'
    },
    'Abandoned': { 
      color: '#ef4444',
      icon: AlertCircle,
      label: 'INACTIVE',
      gradient: 'from-red-500/20 to-rose-500/20'
    },
    'Pending': { 
      color: '#f59e0b',
      icon: Clock,
      label: 'PENDING',
      gradient: 'from-amber-500/20 to-orange-500/20'
    },
    'default': { 
      color: '#3b82f6',
      icon: Zap,
      label: 'ACTIVE',
      gradient: 'from-blue-500/20 to-indigo-500/20'
    }
  };

  const config = statusConfig[status] || statusConfig.default;
  const StatusIcon = config.icon;

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white border border-gray-200/80 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:border-gray-300 cursor-pointer"
    >
      <style>{`
        @keyframes mesh-flow {
          0%, 100% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
        }
        @keyframes orbit {
          from { 
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          to { 
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
          }
        }
        @keyframes signal-pulse {
          0%, 100% { 
            opacity: 0;
            transform: scale(1);
          }
          50% { 
            opacity: 0.3;
            transform: scale(1.5);
          }
        }
        @keyframes border-flow {
          0% { 
            stroke-dashoffset: 1000;
          }
          100% { 
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* Animated Mesh Gradient Background */}
      <div 
        className={`absolute inset-0 bg-linear-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        style={{
          backgroundSize: '200% 200%',
          animation: 'mesh-flow 8s ease infinite'
        }}
      ></div>

      {/* Top Status Bar */}
      <div className="relative h-1 bg-gray-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-linear-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            animation: 'mesh-flow 3s ease infinite',
            backgroundSize: '200% 100%'
          }}
        ></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-1.5 mb-3">
              <div className="relative">
                <StatusIcon 
                  className="w-4 h-4" 
                  style={{ color: config.color }}
                  strokeWidth={2.5}
                />
                {/* Orbiting dot */}
                <div 
                  className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
                  style={{ 
                    backgroundColor: config.color,
                    animation: 'orbit 3s linear infinite'
                  }}
                ></div>
              </div>
              <span 
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: config.color }}
              >
                {config.label}
              </span>
              {/* Signal pulse */}
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: config.color }}
              >
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    backgroundColor: config.color,
                    animation: 'signal-pulse 2s ease-in-out infinite'
                  }}
                ></div>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mb-2">
              {title}
            </h3>

            {/* Patent Number Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 group-hover:bg-gray-100 border border-gray-200 transition-all duration-300">
              <Cpu className="w-3.5 h-3.5 text-gray-500" strokeWidth={2} />
              <span className="text-xs font-mono font-semibold text-gray-700">
                {patentNumber}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-linear-to-br group-hover:from-[#191970] group-hover:to-[#C9A94D] flex items-center justify-center transition-all duration-500 group-hover:shadow-lg group-hover:scale-110">
              <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* AI Analysis Progress */}
        <div className="mb-4 space-y-2">
          
          
          {/* Main Progress Track */}
          <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
            {/* Progress Fill */}
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 group-hover:w-[92%]"
              style={{
                width: '89%',
                background: `linear-gradient(90deg, ${config.color}, ${config.color}dd)`
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                   style={{
                     animation: 'mesh-flow 2s ease infinite',
                     backgroundSize: '200% 100%'
                   }}
              ></div>
            </div>
          </div>

          {/* Micro Progress Indicators */}
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="flex-1 h-0.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i < 9 ? config.color : '#e5e7eb',
                  opacity: i < 9 ? 1 : 0.3,
                  transitionDelay: `${i * 30}ms`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
              <Clock className="w-3.5 h-3.5 text-gray-500" strokeWidth={2} />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {updatedAt}
            </span>
          </div>

          {/* Processing Indicator */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1 h-3 rounded-full bg-gray-300 group-hover:bg-linear-to-t group-hover:from-[#191970] group-hover:to-[#C9A94D] transition-all duration-300"
                  style={{
                    transitionDelay: `${i * 100}ms`,
                    height: `${8 + i * 2}px`
                  }}
                ></div>
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-wider transition-colors duration-300">
              Live
            </span>
          </div>
        </div>

        {/* Match Notification Badge */}
        {matchesCount > 0 && (
          <div className="absolute -top-2 -right-2">
            <div className="relative">
              {/* Outer pulse ring */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: config.color,
                  animation: 'signal-pulse 2s ease-in-out infinite'
                }}
              ></div>
              
              {/* Main badge */}
              <div 
                className="relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: config.color }}
              >
                <span className="text-xs font-bold text-white z-10">{matchesCount}</span>
                
                {/* Border animation */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="14" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    opacity="0.5"
                    strokeDasharray="88"
                    style={{ animation: 'border-flow 2s linear infinite' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SVG Border Animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <rect 
          x="1" 
          y="1" 
          width="calc(100% - 2px)" 
          height="calc(100% - 2px)" 
          rx="15" 
          fill="none" 
          stroke={config.color}
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity="0.3"
        >
          <animate 
            attributeName="stroke-dashoffset" 
            values="0;15" 
            dur="1s" 
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
};

export default ProjectCard;