import { useState } from 'react';
import { useStore } from '../../hooks/useStore';
import { mockPatents } from '../../utils/mockData';
import {
  Plus,
  FileText,
  Search,
  AlertTriangle,
  CheckCircle
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

  // Dummy object for creating a new patent
  const newPatent = { title: '', patentNumber: '' };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Manage your patent analysis projects and view recent activity
          </p>
        </div>

        {/* Start New Analysis */}
        <div className="bg-linear-to-r from-gray-100 to-gray-50 border rounded-xl p-6 flex justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-semibold">Start New Analysis</h2>
            <p className="text-gray-500 text-sm">
              Upload a patent or portfolio to begin infringement analysis
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={16} /> New Single Patent
            </button>

            <button className="border px-5 py-2 rounded-lg flex items-center gap-2 bg-white">
              <FileText size={16} /> Upload Portfolio
            </button>

            <button className="border px-5 py-2 rounded-lg flex items-center gap-2 bg-white">
              <Search size={16} /> Search by Patent ID
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Scans"
            value={activePatents.length}
            subtitle="This week"
            icon={<Search />}
          />
          <StatCard
            title="Patents Analyzed"
            value={state.patents.length}
            subtitle="Total"
            icon={<FileText />}
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
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockPatents.map((patent) => (
                        <ProjectCard
                          key={patent.id}
                          {...patent}
                        />
                      ))}
          </div>
        </div>

        {/* Weekly Search Results */}
        <div>
          <h2 className="text-xl font-bold mb-4">Weekly Search Results</h2>

          <WeeklySearchCard
            title="Automated VGR Monitoring"
            statusText="Last scan: Loading..."
            description="Weekly automated scans monitor competitor filings and industry changes relevant to your portfolio."
            badge="0 new results"
          />
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
