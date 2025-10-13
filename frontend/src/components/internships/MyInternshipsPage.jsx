import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, RotateCcw, X, MapPin, Wallet, Briefcase, Clock } from 'lucide-react';
import { mockInternships } from '../../data/internships.js';

// --- Reusable Helper Components for this page ---
const FilterSection = ({ title, children }) => (<div className="border-b border-border dark:border-dark-border pb-4"><h4 className="text-sm font-semibold text-text/90 dark:text-dark-text/90 mb-3">{title}</h4>{children}</div>);

const Checkbox = ({ label, checked, onChange }) => (<label className="flex items-center gap-2 text-sm text-text/90 dark:text-dark-text/90 cursor-pointer"><input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded bg-border dark:bg-dark-border border-border dark:border-dark-border text-accent focus:ring-accent"/>{label}</label>);

const EmptyState = () => (
    <div className="text-center py-20 px-4 bg-surface/50 dark:bg-dark-surface/30 border-2 border-dashed border-border dark:border-dark-border rounded-xl h-full flex flex-col justify-center items-center">
        <img src="https://pwioi.com/wp-content/uploads/2024/05/no-data-found.png" alt="No matches found" className="w-40 h-40" />
        <h3 className="mt-4 text-xl font-semibold text-text dark:text-dark-text">Oops! No matches found for your filters.</h3>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">No internships available for the applied filters. Please adjust and try again.</p>
    </div>
);

// --- Main My Internships Page Component ---
const MyInternshipsPage = () => {
  const [filters, setFilters] = useState({ applicationStatus: [], internshipStatus: [] });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // For demonstration, we'll imagine the user has applied to these
  const appliedInternships = mockInternships.slice(0, 4);  

  const handleCheckboxFilterChange = (category, value) => {
    setFilters(prev => {
        const currentValues = prev[category] || [];
        if (currentValues.includes(value)) {
            return { ...prev, [category]: currentValues.filter(v => v !== value) };
        } else {
            return { ...prev, [category]: [...currentValues, value] };
        }
    });
  };

  const filteredApplications = useMemo(() => {
    // In a real app, you'd filter based on status. For now, we show the empty state if any filter is active.
    if (filters.applicationStatus.length > 0 || filters.internshipStatus.length > 0) {
        return [];
    }
    return appliedInternships;
  }, [filters]);
  
  const FilterPanel = () => {
    const appStatusOptions = ['Applied', 'Shortlisted', 'In Interview', 'Offered', 'Rejected'];
    const jobStatusOptions = ['ACTIVE', 'Position Closed', 'Learner Reject', 'Registration Closed'];
    return (
        <aside className={`fixed inset-0 z-50 bg-bg dark:bg-dark-bg p-6 overflow-y-auto transition-transform duration-300 ${isFilterPanelOpen ? 'translate-x-0' : 'transform -translate-x-full'} lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 lg:bg-transparent lg:border-none lg:p-0 lg:w-72 xl:w-80 lg:flex-shrink-0`}>
            <div className="flex justify-between items-center mb-6 lg:mb-0">
                <h3 className="text-lg font-bold flex items-center gap-2"><SlidersHorizontal size={18}/> Filter</h3>
                <button onClick={() => setIsFilterPanelOpen(false)} className="text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text lg:hidden"><X/></button>
            </div>
            <div className="space-y-6 lg:bg-surface lg:dark:bg-dark-surface lg:p-6 lg:rounded-xl lg:border lg:border-border lg:dark:border-dark-border lg:mt-6">
                <FilterSection title="Application Status">
                    <div className="space-y-2">{appStatusOptions.map(type => (<Checkbox key={type} label={type} checked={filters.applicationStatus.includes(type)} onChange={() => handleCheckboxFilterChange('applicationStatus', type)} />))}</div>
                </FilterSection>
                <FilterSection title="Internship Status">
                    <div className="space-y-2">{jobStatusOptions.map(status => (<Checkbox key={status} label={status} checked={filters.internshipStatus.includes(status)} onChange={() => handleCheckboxFilterChange('internshipStatus', status)} />))}</div>
                </FilterSection>
            </div>
        </aside>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 min-w-0 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                    {['Applied Internships', 'Marketplace Internships'].map((tab, i) => (
                        <button key={tab} className={`px-3 py-1.5 rounded-full font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text'}`}>{tab}</button>
                    ))}
                </div>
                <button onClick={() => setIsFilterPanelOpen(true)} className="lg:hidden flex items-center gap-2 text-sm px-4 py-2 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg">
                    <SlidersHorizontal size={16}/> Filter
                </button>
            </div>
            {filteredApplications.length > 0 ? (
                <div className="text-text dark:text-dark-text p-4">Your list of applied internships would go here.</div>
            ) : (
                <EmptyState />
            )}
        </main>
        <FilterPanel />
    </div>
  );
};

export default MyInternshipsPage;