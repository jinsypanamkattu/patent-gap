// components/dashboard/StatCard.jsx
const StatCard = ({ title, value, subtitle, icon, color = 'gray' }) => {
  const colorMap = {
    gray: 'bg-gray-100 text-gray-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600'
  };

  return (
    <div className="bg-white rounded-xl border p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>

      <div className={`p-3 rounded-lg ${colorMap[color]}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
