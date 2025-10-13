import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useProfileData } from './useProfileData';

const ProfileLayout = () => {
  const { isLoaded, saveMsg } = useProfileData();
  const tabs = [ 
    { name: 'Profile', path: '/profile' }, 
    { name: 'Resume', path: '/profile/resume' }, 
    { name: 'Scorecard', path: '/profile/scorecard' }, 
    { name: 'Documents', path: '/profile/documents' }
  ];

  if (!isLoaded) {
    // ... loading state ...
  }

  return (
    // FIXED: Removed lg:ml-64 from this page component.
    <div className=" lg:ml-64 p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">My Profile</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary text-sm sm:text-base">View and manage your professional identity.</p>
        </div>
        {saveMsg && <div className="text-center text-sm text-success font-semibold animate-fade-in">{saveMsg}</div>}
      </div>
      <div className="flex items-center gap-2 p-1 bg-bg dark:bg-dark-border rounded-lg mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <NavLink 
            key={tab.name} 
            to={tab.path} 
            end={tab.path === '/profile'}
            className={({ isActive }) => 
              `w-full text-center py-2 px-4 text-sm font-medium transition-colors rounded-md ${
                isActive 
                  ? 'bg-surface dark:bg-dark-surface shadow-sm text-primary font-semibold' 
                  : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface/50 dark:hover:bg-dark-surface/50'
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
      <div className="animate-fade-in">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;