import React, { useState } from 'react';
import { AlertCircle, FileText, Clock, Award, Calendar, User, Briefcase, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Reusable Sub-Components ---
const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
    <div className="bg-surface dark:bg-dark-surface p-4 rounded-xl border border-border dark:border-dark-border">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${bgColorClass}`}>
                <Icon size={24} className={colorClass} />
            </div>
            <div>
                <p className="text-2xl font-bold text-text dark:text-dark-text">{value}</p>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">{title}</p>
            </div>
        </div>
    </div>
);

const ApplicationCard = ({ application }) => {
    const statusConfig = {
        'Shortlisted': { color: 'text-primary', bgColor: 'bg-primary' },
        'Interview': { color: 'text-warning', bgColor: 'bg-warning' },
        'Selected': { color: 'text-success', bgColor: 'bg-success' },
    };
    const timelineSteps = ['Application', 'Shortlisted', 'Interview', 'Final'];
    const currentStepIndex = timelineSteps.indexOf(application.timeline.find(step => step.active)?.name.split(' ')[0] || '') + 1;

    return (
        <div className="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-text dark:text-dark-text">{application.title}</h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{application.company}</p>
                    <p className="text-xs text-text-secondary/80 dark:text-dark-text-secondary/80 mt-1">Applied On: {application.appliedOn}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${statusConfig[application.status]?.bgColor}/20 ${statusConfig[application.status]?.color}`}>
                    {application.status}
                </span>
            </div>
            <div>
                <div className="relative pt-6">
                    <div className="absolute top-0 left-0 right-0 flex justify-between">
                        {timelineSteps.map(step => <div key={step} className="flex-1 text-center"><p className="text-xs text-text-secondary dark:text-dark-text-secondary">{step}</p></div>)}
                    </div>
                    <div className="relative w-full h-1 bg-border dark:bg-dark-border rounded-full mt-2">
                        <div className="absolute top-0 left-0 h-1 bg-accent rounded-full" style={{ width: `${((currentStepIndex - 1) / (timelineSteps.length - 1)) * 100}%` }}></div>
                        <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2">
                            {timelineSteps.map((step, index) => <div key={index} className={`w-3 h-3 rounded-full ${index < currentStepIndex ? 'bg-accent' : 'bg-border dark:bg-dark-border'}`}></div>)}
                        </div>
                    </div>
                    <p className="text-xs text-warning mt-3 text-center">{application.timeline.find(s => s.active)?.details || ' '}</p>
                </div>
            </div>
            <div className="flex gap-3 border-t border-border dark:border-dark-border pt-4">
                <button className="flex-1 py-2 bg-accent text-text font-semibold rounded-lg text-sm hover:bg-accent-dark transition-colors">View Details</button>
                <button className="flex-1 py-2 bg-border dark:bg-dark-border text-text dark:text-dark-text rounded-lg text-sm hover:brightness-95 dark:hover:brightness-125 transition flex items-center justify-center gap-2"><X size={14} /> Withdraw</button>
            </div>
        </div>
    );
};

const DeadlinesWidget = ({ deadlines }) => (
    <div className="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border">
        <h3 className="font-semibold text-text dark:text-dark-text mb-4 flex items-center gap-2"><Calendar size={18} /> Upcoming Deadlines & Alerts</h3>
        <div className="space-y-3">
            {deadlines.map((item, index) => (
                <div key={index} className="p-3 bg-bg dark:bg-dark-surface/50 rounded-lg border-l-4 border-warning">
                    <p className="text-sm text-text/90 dark:text-dark-text/90">{item.text}</p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">{item.time}</p>
                </div>
            ))}
        </div>
    </div>
);

const FeedbackWidget = ({ feedback }) => (
    <div className="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border">
        <h3 className="font-semibold text-text dark:text-dark-text mb-4 flex items-center gap-2"><User size={18} /> Faculty & Industry Feedback</h3>
        <div className="space-y-4">
            {feedback.map((item, index) => (
                <div key={index} className="p-3 bg-bg dark:bg-dark-surface/50 rounded-lg">
                    <p className="text-sm font-semibold text-accent">{item.from}:</p>
                    <p className="text-sm text-text/90 dark:text-dark-text/90 mt-1">"{item.message}"</p>
                </div>
            ))}
        </div>
    </div>
);

const NewUserEmptyState = () => {
    const navigate = useNavigate();
    return (
        <div className="text-center py-20 px-4 bg-surface/50 dark:bg-dark-surface/30 border-2 border-dashed border-border dark:border-dark-border rounded-xl">
            <Briefcase size={48} className="mx-auto text-text-secondary dark:text-dark-text-secondary" strokeWidth={1.5} />
            <h3 className="mt-4 text-xl font-semibold text-text dark:text-dark-text">Your application journey starts here!</h3>
            <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary max-w-md mx-auto">Once you apply for internships, you can track their status, view deadlines, and see feedback all in one place.</p>
            <button
                onClick={() => navigate('/internships')}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-text shadow-md hover:bg-accent-dark transition-colors"
            >
                Browse Internships
            </button>
        </div>
    );
};


// --- Main My Applications Page Component ---
const MyApplicationsPage = () => {
  const [filter, setFilter] = useState('All');
  
  const applicationsData = [];
  
  /*
  const applicationsData = [ { id: 1, title: 'Frontend Developer', company: 'TechSolutions', appliedOn: '15 Sept 2025', status: 'Interview', timeline: [ { name: 'Application Submitted', active: true, details: 'Submitted: 20 Sept 2025' }, { name: 'Shortlisted', active: true, details: 'Shortlisted: 22 Sept 2025' }, { name: 'Interview Scheduled', active: true, details: 'Interview: 25 Sept 2025' }, { name: 'Final Decision', active: false }, ]}, { id: 2, title: 'Web Developer', company: 'Infosys', appliedOn: '20 Sept 2025', status: 'Shortlisted', timeline: [ { name: 'Application Submitted', active: true, details: 'Submitted: 20 Sept 2025' }, { name: 'Shortlisted', active: true, details: 'Awaiting interview schedule' }, { name: 'Interview Scheduled', active: false }, { name: 'Final Decision', active: false }, ]}, { id: 3, title: 'Data Analyst', company: 'Deloitte', appliedOn: '18 Sept 2025', status: 'Selected', timeline: [ { name: 'Application Submitted', active: true }, { name: 'Shortlisted', active: true }, { name: 'Interview Scheduled', active: true }, { name: 'Final Decision', active: true, details: 'Offer Received!' } ], },];
  */

  const deadlinesData = [ { text: "Interview for Data Analyst – Deloitte scheduled.", time: "3 Oct 2025 at 11 AM" }, { text: "Last date to apply for Backend Developer – Wipro.", time: "5 Oct 2025" }, ];
  const feedbackData = [ { from: 'Faculty Coordinator', message: 'Update your resume with Python projects before final interview.' }, { from: 'Recruiter', message: 'Please bring original documents for verification.' }, ];
  
  const statsData = [ 
    { title: 'Total Applications', value: applicationsData.length, icon: FileText, colorClass: 'text-accent', bgColorClass: 'bg-accent/20' }, 
    { title: 'Ongoing', value: applicationsData.filter(a => a.status === 'Shortlisted' || a.status === 'Interview').length, icon: Clock, colorClass: 'text-primary', bgColorClass: 'bg-primary/20' }, 
    { title: 'Interviews', value: applicationsData.filter(a => a.status === 'Interview').length, icon: Calendar, colorClass: 'text-warning', bgColorClass: 'bg-warning/20' }, 
    { title: 'Offers Received', value: applicationsData.filter(a => a.status === 'Selected').length, icon: Award, colorClass: 'text-success', bgColorClass: 'bg-success/20' }, 
  ];
  
  const filteredApplications = filter === 'All' ? applicationsData : applicationsData.filter(app => app.status === filter);

  if (applicationsData.length === 0) {
      return <NewUserEmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsData.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-text dark:text-dark-text">All Applications ({applicationsData.length})</h2>
            <div className="flex gap-2 bg-surface dark:bg-dark-surface p-1 rounded-lg">
              {['All', 'Shortlisted', 'Interview', 'Selected'].map(status => (
                <button key={status} onClick={() => setFilter(status)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === status ? 'bg-primary text-white' : 'text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text'}`}>{status}</button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {filteredApplications.length > 0 ? filteredApplications.map(app => ( <ApplicationCard key={app.id} application={app} /> )) : ( <div className="text-center py-12 bg-surface dark:bg-dark-surface rounded-xl"><AlertCircle size={48} className="text-text-secondary/70 dark:text-dark-text-secondary/70 mx-auto mb-4" /><h3 className="text-lg font-medium text-text-secondary dark:text-dark-text-secondary">No applications found for this filter</h3></div> )}
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <DeadlinesWidget deadlines={deadlinesData} />
          <FeedbackWidget feedback={feedbackData} />
        </div>
      </div>
    </div>
  );
};

export default MyApplicationsPage;