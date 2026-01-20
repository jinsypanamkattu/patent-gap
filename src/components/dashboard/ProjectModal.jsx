import { useState } from 'react';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'patentId'
  const [patentId, setPatentId] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 50 * 1024 * 1024) {
      alert('File size exceeds 50MB limit');
      return;
    }
    setFile(selectedFile);
  };

  const handlePatentIdChange = (e) => {
    setPatentId(e.target.value);
  };

  const handleContinue = () => {
    if (activeTab === 'upload' && !file) {
      alert('Please upload a file or enter a Patent ID');
      return;
    }
    
    if (activeTab === 'patentId' && !patentId.trim()) {
      alert('Please enter a Patent ID');
      return;
    }
    
    // Handle file upload or patent ID submission
    console.log('Project Name:', project.title);
    console.log('Patent ID:', patentId || 'From file upload');
    console.log('File:', file);
    onClose(); // Close modal after action
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > 50 * 1024 * 1024) {
        alert('File size exceeds 50MB limit');
        return;
      }
      if (!droppedFile.type.includes('pdf')) {
        alert('Please upload a PDF file');
        return;
      }
      setFile(droppedFile);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">New Patent Analysis</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Step 1: Upload Patent</h3>
          <div className="flex items-center text-sm text-green-600 mb-4">
            <span className="mr-2">⚠️</span>
            <span>Secure Upload - ISO/SOC2 Compliant. Your data is encrypted and secure.</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name
          </label>
          <input
            type="text"
            value={project.title}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-gray-50 mb-4"
            placeholder="e.g., Foldable Display Hinge Analysis"
          />
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => setActiveTab('patentId')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'patentId'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Patent ID
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
              />
              <div className="text-gray-600">
                <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PDF or Patent Portfolio (Max 50MB)</p>
                {file && (
                  <p className="mt-4 text-sm text-blue-600">
                    ✓ {file.name} ({Math.round(file.size / 1024 / 1024 * 100) / 100}MB)
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={patentId}
                onChange={handlePatentIdChange}
                placeholder="Enter Patent ID"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
              />
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Matches</span>
            <span className="text-sm text-gray-500">Clear Patents - No infringement</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded border">
            <div>
              <span className="text-sm font-medium text-green-600 mr-2">Patented</span>
              <span className="text-sm text-gray-700">APPARATUS FOR MANI</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-700">14104983</p>
              <p className="text-xs text-gray-500">5 days ago</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Continue
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 Patent Gap AI
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;