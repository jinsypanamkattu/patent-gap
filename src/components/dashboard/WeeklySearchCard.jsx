// components/dashboard/WeeklySearchCard.jsx
const WeeklySearchCard = ({ title, statusText, description, badge, variant = 'success' }) => {
  const variantStyles = {
    success: {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      border: 'border-emerald-200/60',
      badge: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white',
      glow: 'shadow-emerald-500/20',
      accent: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      statusText: 'text-emerald-700'
    },
    warning: {
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      border: 'border-amber-200/60',
      badge: 'bg-gradient-to-r from-amber-600 to-orange-700 text-white',
      glow: 'shadow-amber-500/20',
      accent: 'bg-gradient-to-r from-amber-400 to-orange-500',
      statusText: 'text-amber-700'
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      border: 'border-blue-200/60',
      badge: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white',
      glow: 'shadow-blue-500/20',
      accent: 'bg-gradient-to-r from-blue-400 to-indigo-500',
      statusText: 'text-blue-700'
    },
    neutral: {
      bg: 'bg-gradient-to-br from-slate-50 to-gray-50',
      border: 'border-slate-200/60',
      badge: 'bg-gradient-to-r from-slate-600 to-gray-700 text-white',
      glow: 'shadow-slate-500/20',
      accent: 'bg-gradient-to-r from-slate-400 to-gray-500',
      statusText: 'text-slate-700'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className="group relative">
      {/* Outer glow effect */}
      <div className={`absolute -inset-0.5 bg-linear-to-r ${styles.accent} rounded-2xl blur-sm opacity-0 group-hover:opacity-30 transition duration-500`}></div>
      
      {/* Main card */}
      <div className={`relative ${styles.bg} border-2 ${styles.border} rounded-xl p-6 flex justify-between items-start gap-6 overflow-hidden transition-all duration-300 hover:shadow-xl shadow-md`}>
        {/* Decorative gradient orb */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 ${styles.accent} rounded-full blur-3xl opacity-10 group-hover:opacity-15 transition-opacity duration-500`}></div>
        
        {/* Content */}
        <div className="relative z-10 flex-1">
          <div className="flex items-start gap-3 mb-2">
            <div className={`h-1.5 w-1.5 ${styles.accent} rounded-full mt-2 shadow-sm`}></div>
            <h3 className="font-bold text-gray-800 text-lg leading-tight">{title}</h3>
          </div>
          
          <p className={`text-sm font-semibold ${styles.statusText} mb-3 ml-5 flex items-center gap-2`}>
            <span className={`h-0.5 w-6 ${styles.accent} rounded-full`}></span>
            {statusText}
          </p>
          
          <p className="text-sm text-gray-600 leading-relaxed ml-5">{description}</p>
        </div>

        {/* Badge */}
        <div className="relative shrink-0">
          {/* Badge glow */}
          <div className={`absolute inset-0 ${styles.badge} rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
          
          {/* Badge */}
          <span className={`relative ${styles.badge} px-5 py-2 rounded-full text-sm font-bold ${styles.glow} shadow-lg whitespace-nowrap tracking-wide uppercase text-xs`}>
            {badge}
          </span>
        </div>

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default WeeklySearchCard;