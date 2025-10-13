import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const InternshipsLayout = () => {
  const tabs = [
    { name: 'All Internships', path: '/internships' },
    { name: 'Internship Drives', path: '/internships/drives' },
    { name: 'Internship Invites', path: '/internships/invites' },
    { name: 'My Applications', path: '/internships/applications' },
    { name: 'My Internships', path: '/internships/my-internships' }, 
  ];

  return (
    <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 relative min-h-screen">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-bg to-accent-50/50 dark:from-dark-bg dark:via-primary-900/20 dark:to-dark-bg z-0"></div>
      
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6">Internship Board</h1>
        <div className="flex items-center border-b border-border dark:border-dark-border mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <NavLink 
              key={tab.name} 
              to={tab.path} 
              end={tab.path === '/internships'}
              className={({ isActive }) => `py-2 px-3 whitespace-nowrap text-sm font-medium transition-colors ${ 
                isActive 
                  ? 'text-accent border-b-2 border-accent' 
                  : 'text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text' 
              }`}
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default InternshipsLayout;