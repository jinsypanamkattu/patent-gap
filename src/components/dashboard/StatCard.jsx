// components/dashboard/StatCard.jsx
const StatCard = ({ title, value, subtitle, icon, color = 'gray' }) => {
  const colorMap = {
    gray: {
      bg: 'bg-gradient-to-br from-slate-50 to-gray-100',
      icon: 'bg-gradient-to-br from-slate-600 to-gray-700',
      text: 'from-slate-700 to-gray-800',
      glow: 'shadow-slate-500/30',
      border: 'border-slate-200/50',
      accent: 'bg-gradient-to-r from-slate-400 to-gray-600'
    },
    yellow: {
      bg: 'bg-gradient-to-br from-amber-50 to-orange-100',
      icon: 'bg-gradient-to-br from-amber-600 to-orange-700',
      text: 'from-amber-700 to-orange-800',
      glow: 'shadow-amber-500/30',
      border: 'border-amber-200/50',
      accent: 'bg-gradient-to-r from-amber-400 to-orange-600'
    },
    green: {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-100',
      icon: 'bg-gradient-to-br from-emerald-600 to-teal-700',
      text: 'from-emerald-700 to-teal-800',
      glow: 'shadow-emerald-500/30',
      border: 'border-emerald-200/50',
      accent: 'bg-gradient-to-r from-emerald-400 to-teal-600'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      icon: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      text: 'from-blue-700 to-indigo-800',
      glow: 'shadow-blue-500/30',
      border: 'border-blue-200/50',
      accent: 'bg-gradient-to-r from-blue-400 to-indigo-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-violet-50 to-purple-100',
      icon: 'bg-gradient-to-br from-violet-600 to-purple-700',
      text: 'from-violet-700 to-purple-800',
      glow: 'shadow-violet-500/30',
      border: 'border-violet-200/50',
      accent: 'bg-gradient-to-r from-violet-400 to-purple-600'
    },
    pink: {
      bg: 'bg-gradient-to-br from-pink-50 to-rose-100',
      icon: 'bg-gradient-to-br from-pink-600 to-rose-700',
      text: 'from-pink-700 to-rose-800',
      glow: 'shadow-pink-500/30',
      border: 'border-pink-200/50',
      accent: 'bg-gradient-to-r from-pink-400 to-rose-600'
    }
  };

  const colors = colorMap[color];

  return (
    <div className="group relative">
      {/* Outer glow effect */}
      <div className={`absolute -inset-0.5 ${colors.icon} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
      
      {/* Main card */}
      <div className={`relative ${colors.bg} rounded-xl border ${colors.border} p-6 flex justify-between items-center overflow-hidden transition-all duration-300 hover:shadow-xl shadow-md`}>
        {/* Decorative gradient orb */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${colors.icon} rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Content */}
        <div className="relative z-10">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</p>
          <p className={`text-3xl font-bold bg-linear-to-r ${colors.text} bg-clip-text text-transparent mt-1`}>
            {value}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className={`h-1 w-8 ${colors.accent} rounded-full`}></div>
            <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
          </div>
        </div>

        {/* Icon container */}
        <div className="relative">
          {/* Icon glow */}
          <div className={`absolute inset-0 ${colors.icon} rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
          
          {/* Icon */}
          <div className={`relative ${colors.icon} p-3 rounded-lg ${colors.glow} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default StatCard;