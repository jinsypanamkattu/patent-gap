// components/dashboard/WeeklySearchCard.jsx
const WeeklySearchCard = ({ title, statusText, description, badge }) => {
  return (
    <div className="bg-white border rounded-xl p-6 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{statusText}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
        {badge}
      </span>
    </div>
  );
};

export default WeeklySearchCard;
