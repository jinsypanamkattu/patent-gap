// ===========================
// FILE 2: ProjectCard.jsx (Updated for React Router)
// ===========================

import { Clock } from 'lucide-react';
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

  const handleTitleClick = (e) => {
    e.stopPropagation();
    
    // Navigate using React Router with state
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

  return (
    <div className="bg-white border rounded-xl p-5 hover:shadow-lg transition cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <h3 
          className="font-semibold text-gray-800 hover:text-blue-600 hover:underline cursor-pointer"
          onClick={handleTitleClick}
        >
          {title}
        </h3>

        <span
          className={`text-xs px-3 py-1 rounded-full border ${
            status === 'Patented' || status === 'Active'
              ? 'bg-green-50 text-green-700 border-green-200'
              : status === 'Expired' || status === 'Abandoned'
              ? 'bg-red-50 text-red-700 border-red-200'
              : status === 'Pending'
              ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
              : 'bg-blue-50 text-blue-700 border-blue-200'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="h-1 bg-gray-200 rounded-full mb-3">
        <div className="h-1 w-2/3 bg-gray-400 rounded-full" />
      </div>

      <p className="text-sm text-gray-500">{patentNumber}</p>

      <div className="flex items-center text-xs text-gray-400 mt-3 gap-1">
        <Clock size={14} />
        {updatedAt}
      </div>
    </div>
  );
};

export default ProjectCard;