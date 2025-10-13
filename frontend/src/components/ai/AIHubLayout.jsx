import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Bot, FileText, Briefcase, ChevronDown } from 'lucide-react';

const AIHubLayout = () => {
    const [selectedRole, setSelectedRole] = useState('Frontend Developer');
    const roles = ['Frontend Developer', 'Backend Developer', 'Data Scientist', 'UI/UX Designer', 'DevOps Engineer'];
    const tabs = [
        { name: 'AI Advisor', path: '/ai-advisor', icon: Bot },
        { name: 'Mock Interview', path: '/ai-advisor/mock-interview', icon: Briefcase },
        { name: 'AI Resume Builder', path: '/ai-advisor/resume-builder', icon: FileText },
    ];

    return (
        <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 space-y-6">
            <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI Coach</h1>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Your personal AI-powered career assistant.</p>
            </div>
            
            <div className="bg-surface dark:bg-dark-surface p-4 rounded-lg border border-border dark:border-dark-border shadow-sm">
                <label htmlFor="role-select" className="block text-sm font-semibold text-primary dark:text-primary-300 mb-2">Select Target Role</label>
                <div className="relative">
                    <select 
                        id="role-select" 
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border text-text dark:text-dark-text focus:border-accent outline-none appearance-none"
                    >
                        {roles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
                </div>
            </div>

            <div className="flex items-center gap-2 p-1 bg-bg dark:bg-dark-border rounded-lg">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.name}
                        to={tab.path}
                        end={tab.path === '/ai-advisor'}
                        className={({ isActive }) => `w-full text-center flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium transition-colors rounded-md ${ isActive ? 'bg-surface dark:bg-dark-surface shadow-sm text-primary font-semibold' : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface/50 dark:hover:bg-dark-surface/50' }`}
                    >
                        <tab.icon size={16} /> {tab.name}
                    </NavLink>
                ))}
            </div>
            <div className="animate-fade-in">
                <Outlet context={{ selectedRole }} />
            </div>
        </div>
    );
};

export default AIHubLayout;