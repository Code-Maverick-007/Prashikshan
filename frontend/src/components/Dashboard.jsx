import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Briefcase, Target, Award, CheckCircle, Lightbulb
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

// --- Reusable Empty State Component ---
const EmptyState = ({ title, message, buttonText, buttonLink, className = '', buttonColorClass = 'bg-accent' }) => (
    <div className={`text-center p-8 rounded-lg ${className}`}>
        <h3 className="text-lg font-semibold text-text dark:text-dark-text">{title}</h3>
        <p className="text-text-secondary dark:text-dark-text-secondary mt-2 mb-4 text-sm">{message}</p>
        <Link to={buttonLink} className={`inline-block ${buttonColorClass} hover:opacity-90 text-white font-bold py-2 px-5 rounded-lg transition-all hover:scale-105 shadow-md hover:shadow-lg`}>
            {buttonText}
        </Link>
    </div>
);

// --- DYNAMIC, THEMED WIDGETS ---
const WhatsNextWidget = ({ items }) => {
  if (!items || items.length === 0) {
    // UPDATED: This card is now a vibrant gradient banner
    return (
      <div className="bg-gradient-to-br from-primary to-accent text-white p-6 rounded-lg shadow-lg shadow-primary/20 dark:shadow-none dark:from-primary/30 dark:to-accent/30 dark:text-dark-text">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">All Caught Up!</h2>
            <p className="text-sm opacity-90">You have no urgent tasks. Let's find your next opportunity.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg border-l-4 border-warning shadow-md">
      {/* UI for the next urgent task */}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, iconColorClass, iconBgColorClass, borderColorClass }) => (
  <div className={`bg-surface dark:bg-dark-surface p-5 rounded-lg border-b-4 ${borderColorClass} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${iconBgColorClass}`}>
        <Icon className={`w-6 h-6 ${iconColorClass}`} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">{title}</h3>
        <p className="text-2xl font-bold text-text dark:text-dark-text">{value}</p>
      </div>
    </div>
  </div>
);

const ApplicationPipeline = ({ applications }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview': return 'bg-warning/20 text-warning';
      case 'Shortlisted': return 'bg-primary/20 text-primary';
      default: return 'bg-border dark:bg-dark-border text-text-secondary dark:text-dark-text-secondary';
    }
  };

  return (
    <div className="bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border shadow-sm">
      <div className="p-5 border-b border-border dark:border-dark-border flex justify-between items-center">
        <h2 className="text-lg font-semibold text-text dark:text-dark-text">Application Pipeline</h2>
        <Link to="/internships/my-internships" className="text-sm text-accent hover:underline">View All</Link>
      </div>
      {applications.length > 0 ? (
        <div className="divide-y divide-border dark:divide-dark-border">{/* ... list of applications ... */}</div>
      ) : (
        <div className="p-5">
            <EmptyState 
                title="Track Your Applications" 
                message="Once you apply for internships, you can track their status here." 
                buttonText="Browse Internships" 
                buttonLink="/internships"
                className="bg-gradient-to-b from-bg to-primary-50 dark:from-dark-surface dark:to-primary-900/20 border-border dark:border-dark-border"
                buttonColorClass="bg-primary"
            />
        </div>
      )}
    </div>
  );
};

const ActionCenter = ({ recommendations }) => (
    <div className="space-y-6">
        <div className="bg-surface dark:bg-dark-surface p-5 rounded-lg border border-border dark:border-dark-border shadow-sm">
             <h2 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Quick Actions</h2>
             <div className="space-y-3">
                <Link to="/internships" className="block w-full text-center py-2.5 bg-primary hover:bg-primary-700 text-white font-bold rounded-lg transition-colors shadow-md shadow-primary/30">Find an Internship</Link>
                <Link to="/profile" className="block w-full text-center py-2 bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition">Update Your Profile</Link>
             </div>
        </div>
        <div className="bg-surface dark:bg-dark-surface p-5 rounded-lg border border-border dark:border-dark-border shadow-sm">
             <h2 className="text-lg font-semibold text-text dark:text-dark-text mb-4 flex items-center gap-2"><Lightbulb className="text-warning" /> Recommendations</h2>
             {recommendations.length > 0 ? (
                <div className="space-y-4">{/* ... list of recommendations ... */}</div>
             ) : (
                <div className="text-center py-4 bg-yellow-400/5 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">Complete your profile to receive recommendations.</p>
                </div>
             )}
        </div>
    </div>
);

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <div className="lg:ml-64 p-10 text-text-secondary">Loading...</div>;
  }

  const applications = [];
  const recommendations = [];
  const stats = {
      pendingApplications: 0,
      activeInternships: 0,
      completedModules: 0,
      credits: '0/10'
  };

  return (
    <div className="lg:ml-64 p-4 pt-8 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-text dark:text-dark-text">
          Hello,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {user.firstName || 'Student'}
          </span>
          {' '}👋
        </h1>
        <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Here's your career progress overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.</p>
      </div>
      <WhatsNextWidget items={[]} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Pending Applications" value={stats.pendingApplications} icon={FileText} iconColorClass="text-primary-700 dark:text-primary-300" iconBgColorClass="bg-primary-100 dark:bg-primary-900/50" borderColorClass="border-primary" />
        <StatCard title="Active Internships" value={stats.activeInternships} icon={Briefcase} iconColorClass="text-yellow-700 dark:text-yellow-300" iconBgColorClass="bg-yellow-100 dark:bg-yellow-900/50" borderColorClass="border-warning" />
        <StatCard title="Completed Modules" value={stats.completedModules} icon={Target} iconColorClass="text-teal-700 dark:text-teal-300" iconBgColorClass="bg-teal-100 dark:bg-teal-900/50" borderColorClass="border-accent" />
        <StatCard title="Credits Earned" value={stats.credits} icon={Award} iconColorClass="text-green-700 dark:text-green-300" iconBgColorClass="bg-green-100 dark:bg-green-900/50" borderColorClass="border-success" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ApplicationPipeline applications={applications} />
        </div>
        <div className="lg:col-span-1">
          <ActionCenter recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;