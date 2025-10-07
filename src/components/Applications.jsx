import React, { useState } from 'react';
import { 
  AlertCircle, FileText, Briefcase, Clock, CheckCircle, Award, 
  Calendar, User, Lightbulb, X
} from 'lucide-react';

// --- Reusable Sub-Components ---

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <Icon size={24} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{title}</p>
      </div>
    </div>
  </div>
);

const ApplicationCard = ({ application }) => {
  const statusConfig = {
    'Pending': { color: 'text-gray-400', bgColor: 'bg-gray-700' },
    'Shortlisted': { color: 'text-blue-400', bgColor: 'bg-blue-500' },
    'Interview': { color: 'text-yellow-400', bgColor: 'bg-yellow-500' },
    'Selected': { color: 'text-green-400', bgColor: 'bg-green-500' },
    'Rejected': { color: 'text-red-400', bgColor: 'bg-red-500' },
  };

  const timelineSteps = ['Application Submitted', 'Shortlisted', 'Interview Scheduled', 'Final Decision'];
  const currentStepIndex = timelineSteps.indexOf(application.timeline.find(step => step.active)?.name || '');

  return (
    <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{application.title}</h3>
          <p className="text-sm text-gray-400">{application.company}</p>
          <p className="text-xs text-gray-500 mt-1">Applied On: {application.appliedOn}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusConfig[application.status].bgColor}/20 ${statusConfig[application.status].color}`}>
          {application.status}
        </span>
      </div>

      {/* Timeline Tracker */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          {timelineSteps.map(step => <span key={step}>{step.split(' ')[0]}</span>)}
        </div>
        <div className="flex items-center">
          {timelineSteps.map((step, index) => (
            <React.Fragment key={step}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center z-10 ${index <= currentStepIndex ? statusConfig[application.status].bgColor : 'bg-gray-600'}`}>
                {index < currentStepIndex && <CheckCircle size={10} className="text-white"/>}
              </div>
              {index < timelineSteps.length - 1 && (
                <div className={`flex-1 h-0.5 ${index < currentStepIndex ? statusConfig[application.status].bgColor : 'bg-gray-600'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs text-yellow-400 mt-2 text-center">{application.timeline.find(s => s.active)?.details}</p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3 border-t border-gray-700 pt-4">
        <button className="flex-1 py-2 bg-[#00C4CC] text-gray-900 font-semibold rounded-lg text-sm hover:bg-[#00B8C2]">View Details</button>
        <button className="flex-1 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 flex items-center justify-center gap-2">
          <X size={14} /> Withdraw
        </button>
      </div>
    </div>
  );
};

const DeadlinesWidget = ({ deadlines }) => (
  <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
    <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Calendar size={18} /> Upcoming Deadlines & Alerts</h3>
    <div className="space-y-3">
      {deadlines.map((item, index) => (
        <div key={index} className="p-3 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm text-gray-300">{item.text}</p>
          <p className="text-xs text-gray-400 mt-1">{item.time}</p>
        </div>
      ))}
    </div>
  </div>
);

const FeedbackWidget = ({ feedback }) => (
  <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
    <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><User size={18} /> Faculty & Industry Feedback</h3>
    <div className="space-y-4">
      {feedback.map((item, index) => (
        <div key={index} className="p-3 bg-gray-700/50 rounded-lg">
          <p className="text-sm font-semibold text-[#00C4CC]">{item.from}:</p>
          <p className="text-sm text-gray-300 mt-1">"{item.message}"</p>
        </div>
      ))}
    </div>
  </div>
);

const AIAdvisorWidget = ({ suggestions }) => (
  <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
    <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Lightbulb size={18} /> AI Assistance</h3>
    <div className="space-y-3">
      {suggestions.map((item, index) => (
        <p key={index} className="text-sm text-gray-300 p-3 bg-gray-700/50 rounded-lg">💡 {item}</p>
      ))}
    </div>
  </div>
);

// --- Main Applications Component ---

const Applications = () => {
  const [filter, setFilter] = useState('All');

  // --- Mock Data based on the brief ---
  const statsData = [
    { title: 'Total Applications', value: '8', icon: FileText, color: '#00C4CC' },
    { title: 'Ongoing', value: '3', icon: Clock, color: '#3B82F6' },
    { title: 'Interviews', value: '2', icon: Calendar, color: '#F59E0B' },
    { title: 'Offers Received', value: '1', icon: Award, color: '#10B981' },
  ];

  const applicationsData = [
    {
      id: 1, title: 'Frontend Developer', company: 'TechSolutions', appliedOn: '15 Sept 2025', status: 'Interview',
      timeline: [
        { name: 'Application Submitted', active: true, details: 'Submitted: 20 Sept 2025' },
        { name: 'Shortlisted', active: true, details: 'Shortlisted: 22 Sept 2025' },
        { name: 'Interview Scheduled', active: true, details: 'Interview: 25 Sept 2025 (Google Meet Link)' },
        { name: 'Final Decision', active: false },
      ],
    },
    {
      id: 2, title: 'Web Developer', company: 'Infosys', appliedOn: '20 Sept 2025', status: 'Shortlisted',
      timeline: [
        { name: 'Application Submitted', active: true, details: 'Submitted: 20 Sept 2025' },
        { name: 'Shortlisted', active: true, details: 'Awaiting interview schedule' },
        { name: 'Interview Scheduled', active: false },
        { name: 'Final Decision', active: false },
      ],
    },
    {
      id: 3, title: 'Data Analyst', company: 'Deloitte', appliedOn: '18 Sept 2025', status: 'Selected',
      timeline: [
        { name: 'Application Submitted', active: true }, { name: 'Shortlisted', active: true },
        { name: 'Interview Scheduled', active: true }, { name: 'Final Decision', active: true, details: 'Offer Received!' }
      ],
    },
  ];
  
  const deadlinesData = [
      { text: "Interview for Data Analyst – Deloitte scheduled.", time: "3 Oct 2025 at 11 AM" },
      { text: "Last date to apply for Backend Developer – Wipro.", time: "5 Oct 2025" },
  ];
  
  const feedbackData = [
      { from: 'Faculty Coordinator', message: 'Update your resume with Python projects before final interview.' },
      { from: 'Recruiter', message: 'Please bring original documents for verification.' },
  ];

  const aiSuggestions = [
      "Based on your rejected applications, you may want to strengthen soft skills in Communication.",
      "We recommend applying for these similar internships: Data Science – TCS, ML Intern – Cognizant."
  ];

  const filteredApplications = filter === 'All'
    ? applicationsData
    : applicationsData.filter(app => app.status === filter);

  return (
    <div className="space-y-4 lg:space-y-6 pt-16 p-4 lg:pt-6 lg:p-10 lg:ml-64 min-h-screen bg-gray-900 text-white">
      {/* 1. Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-white">My Applications</h1>
        <p className="text-gray-400 mt-1">Track your internship applications, statuses, and upcoming deadlines here.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 2. List of Applications (Main Column) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">All Applications ({applicationsData.length})</h2>
            <div className="flex gap-2">
              {['All', 'Shortlisted', 'Interview', 'Selected'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-[#00C4CC] text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {filteredApplications.length > 0 ? filteredApplications.map(app => (
              <ApplicationCard key={app.id} application={app} />
            )) : (
              <div className="text-center py-12 bg-gray-800/50 rounded-xl">
                  <AlertCircle size={48} className="text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-400">No applications found</h3>
                  <p className="text-gray-500">No applications match the filter "{filter}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          <DeadlinesWidget deadlines={deadlinesData} />
          <FeedbackWidget feedback={feedbackData} />
          <AIAdvisorWidget suggestions={aiSuggestions} />
        </div>
      </div>
    </div>
  );
};

export default Applications;