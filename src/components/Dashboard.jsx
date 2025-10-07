import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Award, CheckCircle, Calendar, User, BookOpen,
  Lightbulb, ArrowRight, Briefcase, Target,
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';


// --- A Reusable Empty State Component ---
const EmptyState = ({ title, message, buttonText, buttonLink }) => (
    <div className="text-center p-8 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-slate-400 mt-2 mb-4 text-sm">{message}</p>
        <Link to={buttonLink} className="inline-block bg-[#00C4CC] text-slate-900 font-bold py-2 px-5 rounded-lg transition-transform hover:scale-105">
            {buttonText}
        </Link>
    </div>
);


// --- DYNAMIC, REAL-WORLD WIDGETS ---

const WhatsNextWidget = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">All Caught Up!</h2>
            <p className="text-slate-400 text-sm">You have no urgent tasks. Let's find your next opportunity.</p>
          </div>
        </div>
      </div>
    );
  }

  const nextItem = items[0];
  return (
    <div className="bg-slate-800 p-6 rounded-lg border-2 border-amber-500/50">
        {/* ... (UI is the same as before) ... */}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <Icon className="w-5 h-5 text-slate-500" />
    </div>
    <p className="text-3xl font-bold text-white mt-2">{value}</p>
  </div>
);

const ApplicationPipeline = ({ applications }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview': return 'bg-amber-500/20 text-amber-400';
      case 'Shortlisted': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-600/50 text-slate-300';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="p-5 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Application Pipeline</h2>
        <Link to="/applications" className="text-sm text-[#00C4CC] hover:underline">View All</Link>
      </div>
      {/* *** NEW: Handle empty state for new users *** */}
      {applications.length > 0 ? (
        <div className="divide-y divide-slate-700">
          {applications.slice(0, 3).map(app => ( // Show first 3
            <div key={app.id} className="p-5 flex justify-between items-center hover:bg-slate-700/50 transition-colors">
              <div>
                <p className="font-semibold text-white">{app.role}</p>
                <p className="text-sm text-slate-400">{app.company}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>{app.status}</span>
                <p className="text-xs text-slate-500 mt-1">{app.updated}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5">
            <EmptyState 
                title="Track Your Applications"
                message="Once you apply for internships, you can track their status here."
                buttonText="Add Your First Application"
                buttonLink="/applications"
            />
        </div>
      )}
    </div>
  );
};

const ActionCenter = ({ recommendations }) => (
    <div className="space-y-6">
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
             <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
             <div className="space-y-3">
                <Link to="/internships" className="block w-full text-center py-2 bg-[#00C4CC] text-slate-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors">Find an Internship</Link>
                <Link to="/profile" className="block w-full text-center py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors">Update Your Profile</Link>
             </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
             <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="text-yellow-400" /> Recommendations
             </h2>
             {/* *** NEW: Handle empty state for new users *** */}
             {recommendations.length > 0 ? (
                <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                        <Link to={rec.path} key={index} className="block p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                            <p className="font-semibold text-white">{rec.title}</p>
                            <p className="text-sm text-slate-400 mt-1">{rec.subtitle}</p>
                        </Link>
                    ))}
                </div>
             ) : (
                <div className="text-center py-4">
                    <p className="text-sm text-slate-400">Complete your profile and skills to receive personalized recommendations.</p>
                </div>
             )}
        </div>
    </div>
);


// --- MAIN DASHBOARD COMPONENT ---

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <div className="lg:ml-64 p-10 text-slate-400">Loading...</div>;
  }

  // --- Step 1: Get user data from Clerk ---
  const meta = user.publicMetadata || {};

  // --- Step 2: Derive all dynamic data from user's metadata, defaulting to empty arrays for new users ---
  const nextSteps = meta.nextSteps ?? [];
  const applications = meta.applications ?? [];
  const internships = meta.internships ?? [];
  const recommendations = meta.recommendations ?? [];
  const trainingModules = meta.trainingModules ?? [];
  const creditsEarned = meta.creditsEarned ?? 0;
  const creditsRequired = meta.creditsRequired ?? 10;
  
  // --- Step 3: Calculate stats dynamically ---
  const statsData = [
    { title: 'Pending Applications', value: applications.length, icon: FileText },
    { title: 'Active Internships', value: internships.filter(i => i.status === 'Ongoing').length, icon: Briefcase },
    { title: 'Completed Modules', value: trainingModules.filter(m => m.status === 'Completed').length, icon: Target },
    { title: 'Credits Earned', value: `${creditsEarned}/${creditsRequired}`, icon: Award },
  ];

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <main className="lg:ml-64 p-4 pt-20 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Hello, {user.firstName || 'Student'} 👋
          </h1>
          <p className="text-slate-400 mt-1">Here's your career progress overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.</p>
        </div>

        <WhatsNextWidget items={nextSteps} />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ApplicationPipeline applications={applications} />
            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                <h2 className="text-lg font-semibold text-white">Logbook Snapshot</h2>
                <p className="text-sm text-slate-400 mt-4">No logbook entries found. Start an internship to begin logging your hours and tasks.</p>
                <Link to="/logbook" className="inline-block mt-4 text-sm font-semibold text-[#00C4CC] hover:underline">Go to Logbook →</Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ActionCenter recommendations={recommendations} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


