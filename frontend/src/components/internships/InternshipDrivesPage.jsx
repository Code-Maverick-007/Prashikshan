import React from 'react';
import { Megaphone } from 'lucide-react';

const EmptyState = ({ icon: Icon, title, message }) => (
    <div className="text-center py-20 px-4 bg-surface/50 dark:bg-dark-surface/30 border-2 border-dashed border-border dark:border-dark-border rounded-xl h-full flex flex-col justify-center items-center">
        <Icon size={48} className="mx-auto text-text-secondary dark:text-dark-text-secondary" strokeWidth={1.5} />
        <h3 className="mt-4 text-xl font-semibold text-text dark:text-dark-text">{title}</h3>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{message}</p>
    </div>
);

const InternshipDrivesPage = () => {
    // This component will be rendered within a layout that should handle the page margins (e.g., lg:ml-64)
    return (
        <EmptyState 
            icon={Megaphone} 
            title="No Internship Drives Found!" 
            message="Check back later for scheduled campus drives and hiring events." 
        />
    );
};

export default InternshipDrivesPage;