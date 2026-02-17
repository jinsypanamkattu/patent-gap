// ===========================
// FILE 2: PatentDetail.jsx
// ===========================

import { Clock, ArrowLeft, FileText, Calendar, User, Tag, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InfringementModal from '../../components/dashboard/InfringementModal';

const PatentDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get project data from React Router location state
  const projectData = location.state || {};
  const {
    id,
    title,
    patentNumber,
    status,
    updatedAt,
    inventors,
    filedDate,
    keywords,
    description,
    matchesCount = 3,
    documentsCount = 1
  } = projectData;

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  const startInfringementAnalysis = () => {
    setShowAnalysis(true);
    console.log('Starting infringement analysis...');
  };

  const exportCase = () => {
    console.log('Exporting case...', projectData);
    alert(`Exporting case for ${title}`);
  };

  const deleteCase = () => {
    if (window.confirm('Are you sure you want to delete this case?')) {
      console.log('Deleting case...', id);
      navigate('/dashboard');
    }
  };

  const openMatchModal = (match) => {
    setSelectedMatch(match);
  };

  const closeMatchModal = () => {
    setSelectedMatch(null);
  };

  // Handle case where no data is passed
  if (!title) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Patent Data Found</h2>
          <p className="text-gray-600 mb-6">Please select a patent from the dashboard.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Potential matches data with enhanced details
  const potentialMatches = [
    {
      title: "Illumination system for determining the topography of the cornea of an eye",
      id: "US923289282",
      score: 100,
      language: "English",
      badge: "High",
      source: "Google Patents",
      claims: 4
    },
    {
      title: "Illumination system for determining the topography of the cornea of an eye",
      id: "EP2641527A1",
      score: 99,
      language: "English",
      badge: "High",
      source: "Google Patents",
      claims: 4
    },
    {
      title: "Illumination system for determining the topography of the cornea of an eye",
      id: "WO2013198866A1",
      score: 98,
      language: "English",
      badge: "High",
      source: "Google Patents",
      claims: 4
    }
  ];

  // Default claims
  const defaultClaims = [
    `A system for ${title?.toLowerCase() || 'patent processing'}, comprising:`,
    "1. A processing unit configured to analyze patent data and identify relevant patterns.",
    "2. A storage module for maintaining patent information and associated metadata.",
    "3. An interface system for user interaction and data visualization.",
    "4. A verification mechanism to ensure data integrity and accuracy.",
    "5. A reporting module for generating comprehensive analysis reports."
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-500 font-mono mt-1">uspto_{patentNumber}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              status === 'Abandoned' || status === 'Expired'
                ? 'bg-red-100 text-red-800'
                : status === 'Patented' || status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {status || 'Patented Case'}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Patent ID</p>
            <p className="font-semibold text-lg">{patentNumber}</p>
          </div>
          
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Status</p>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              status === 'Abandoned' || status === 'Expired'
                ? 'bg-red-100 text-red-800'
                : status === 'Patented' || status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {status || 'Patented Case'}
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Matches Found</p>
            <p className="font-semibold text-2xl">{matchesCount}</p>
          </div>
          
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">Last Updated</p>
            <p className="font-semibold">{updatedAt}</p>
          </div>
        </div>

        {/* Source */}
        <div className="bg-white border rounded-lg p-4 mb-8 shadow-sm">
          <p className="text-sm text-gray-500 mb-2">Source</p>
          <p className="font-semibold">US Patent Office</p>
        </div>

        {/* Case Information */}
        <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Case Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center text-gray-700 w-32">
                <Calendar size={18} className="mr-3 shrink-0" />
                <span className="font-medium text-sm">Created:</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">{updatedAt}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center text-gray-700 w-32">
                <FileText size={18} className="mr-3 shrink-0" />
                <span className="font-medium text-sm">Filed:</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">{filedDate || "March 2, 2019 at 01:00 AM"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center text-gray-700 w-32">
                <Clock size={18} className="mr-3 shrink-0" />
                <span className="font-medium text-sm">Last Updated:</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">1 week ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center text-gray-700 w-32">
                <User size={18} className="mr-3 shrink-0" />
                <span className="font-medium text-sm">Inventors:</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">{inventors || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center text-gray-700 w-32">
                <Tag size={18} className="mr-3 shrink-0" />
                <span className="font-medium text-sm">Keywords:</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm">
                  {keywords || "No keywords available"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Context & Description */}
        <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Context & Description</h3>
          <p className="text-gray-600">{description || status || 'No description available'}</p>
        </div>

        {/* Documents */}
        <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              {documentsCount} document{documentsCount !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="flex items-start gap-6">
            {Array.from({ length: documentsCount }, (_, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-40 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg border-4 border-gray-800">
                  <div className="text-white text-center">
                    <FileText size={40} className="mx-auto mb-2" />
                    <p className="text-xl font-semibold">{i + 1}.xml</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claims for Analysis */}
        {defaultClaims.length > 0 && (
          <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Claims for Analysis</h3>
            
            <div className="space-y-4">
              {defaultClaims.map((claim, index) => (
                <p key={index} className="text-gray-600 text-sm leading-relaxed">
                  {claim}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Potential Matches Section */}
        <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-900">Potential Matches</h3>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm px-3 py-1 rounded-full text-green-600 bg-green-50">
              {matchesCount} matches
            </span>
          </div>
          
          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {potentialMatches.slice(0, matchesCount).map((match, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-5 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => openMatchModal(match)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 text-sm leading-tight flex-1 pr-2 hover:text-blue-600">
                    {match.title}
                  </h4>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded font-medium shrink-0">
                    {match.badge}
                  </span>
                </div>
                
                <p className="text-gray-500 font-mono text-xs mb-4">{match.id}</p>
                
                <div>
                  <p className="text-xs text-gray-500 mb-2">Overlap Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${match.score}%` }}
                      />
                    </div>
                    <span className="font-bold text-base text-gray-900 w-12 text-right">
                      {match.score}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Export and Delete Buttons */}
          <div className="flex justify-start gap-4 mt-8 pt-6 border-t">
            <button
              onClick={exportCase}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              <Download size={18} />
              Export Case
            </button>
            <button
              onClick={deleteCase}
              className="flex items-center gap-2 px-5 py-2.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium transition-colors"
            >
              <Trash2 size={18} />
              Delete Case
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t py-4 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © 2025 Patent Gap AI
        </div>
      </div>

      {/* Infringement Modal */}
      {selectedMatch && (
        <InfringementModal 
          match={selectedMatch} 
          patentTitle={title}
          patentNumber={patentNumber}
          onClose={closeMatchModal} 
        />
      )}
    </div>
  );
};

export default PatentDetailPage;