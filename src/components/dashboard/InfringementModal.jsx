// ===========================
// FILE 1: InfringementModal.jsx
// ===========================

import { X, ExternalLink } from 'lucide-react';

const InfringementModal = ({ match, patentTitle, patentNumber, onClose }) => {
  if (!match) return null;

  // Detailed claim comparisons based on the uploaded images
  const claimComparisons = [
    {
      claimNumber: 1,
      yourClaim: "An illumination system for determining the topography of the cornea of an eye, comprising:",
      similarClaim: "An illumination system for determining the topography of the cornea of an eye, comprising: at least one illumination unit for emitting illumination light, a separate first fraxicon with an optical axis for forming the illumination light emitted by the illumination unit into a line-shaped or ring-shaped structure on the cornea, wherein the illumination unit is arranged outside the optical axis of the first fraxicon.",
      similarityScore: 100,
      hasSource: true
    },
    {
      claimNumber: 2,
      yourClaim: "The illumination system as claimed in claim 1, wherein the illumination unit comprises two or more illumination modules.",
      similarClaim: "The illumination system as claimed in claim 1, wherein the illumination unit comprises two or more illumination modules.",
      similarityScore: 100,
      hasSource: true
    },
    {
      claimNumber: 3,
      yourClaim: "The illumination system as claimed in claim 1, wherein the illumination unit comprises four illumination modules.",
      similarClaim: "The illumination system as claimed in claim 1, wherein individual illumination modules of the plurality of illumination modules are arranged in such a way that optical partial axes thereof include an angle of between 40° and 20° with the optical axis of the first fraxicon.",
      similarityScore: 100,
      hasSource: true
    },
    {
      claimNumber: 4,
      yourClaim: "The illumination system as claimed in claim 1, wherein the illumination unit comprises six illumination modules.",
      similarClaim: "No similar claim found",
      similarityScore: null,
      hasSource: false
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full my-8 flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="border-b px-8 py-6 sticky top-0 bg-white z-20">

          <div className="flex-1">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 text-sm"
            >
              ← Back to Case Details
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {patentTitle || "Illumination system for determining the topography of the cornea of an eye"}
            </h1>
            <p className="text-gray-500 text-sm">
              Case: {patentNumber || "uspto_16330077"} | Infringement: {match.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-4"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
       <div className="px-8 py-6 overflow-y-auto">

          {/* Infringement Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Infringement Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Source</p>
                <p className="text-lg font-semibold text-gray-900">Google Patents</p>
              </div>
              <div className="border rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-2">Entry ID</p>
                <p className="text-lg font-semibold text-gray-900 font-mono">{match.id}</p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
              <ExternalLink size={18} />
              Visit Infringement Source
            </button>
          </div>

          {/* Infringement Claim Chart */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Infringement Claim Chart</h2>
            
            {/* Table */}
            <div className="border rounded-lg overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-24">
                        Claim #
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700" style={{ width: '35%' }}>
                        Your Patent Claim
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700" style={{ width: '45%' }}>
                        Similar Infringing Claim
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-36">
                        Similarity Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {claimComparisons.map((claim, index) => (
                      <tr 
                        key={index} 
                        className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="px-6 py-6 font-semibold text-gray-900 align-top">
                          {claim.claimNumber}
                        </td>
                        <td className="px-6 py-6 text-sm text-gray-700 align-top leading-relaxed">
                          {claim.yourClaim}
                        </td>
                        <td className="px-6 py-6 align-top">
                          <p className={`text-sm leading-relaxed mb-3 ${
                            claim.hasSource ? 'text-gray-700' : 'text-gray-500'
                          }`}>
                            {claim.similarClaim}
                          </p>
                          {claim.hasSource && (
                            <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
                              View claim source →
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-6 align-top">
                          {claim.similarityScore ? (
                            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-md text-sm font-bold">
                              {claim.similarityScore}%
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t px-8 py-6 bg-gray-50 sticky bottom-0">

          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-white font-medium transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfringementModal;
