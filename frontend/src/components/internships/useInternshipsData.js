import { useState, useMemo } from 'react';
// Correctly import the data
import mockInternships from '../../data/internships.js';

export const useInternshipsData = () => {
    const [filters, setFilters] = useState({ search: '', internshipType: [], internshipStatus: [], location: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const handleCheckboxFilterChange = (category, value) => {
        setFilters(prev => {
            const currentValues = prev[category] || [];
            if (currentValues.includes(value)) {
                return { ...prev, [category]: currentValues.filter(v => v !== value) };
            } else {
                return { ...prev, [category]: [...currentValues, value] };
            }
        });
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters({ search: '', internshipType: [], internshipStatus: [], location: '' });
        setCurrentPage(1);
    };

    const filteredInternships = useMemo(() => {
        // This is the corrected filtering logic
        return mockInternships.filter(internship => {
            const { search, internshipType, internshipStatus, location } = filters;
            if (search && !(internship.title.toLowerCase().includes(search.toLowerCase()) || internship.company.toLowerCase().includes(search.toLowerCase()))) return false;
            if (internshipType.length > 0 && !internshipType.includes(internship.type)) return false;
            if (internshipStatus.length > 0 && !internshipStatus.includes(internship.status)) return false;
            if (location && !internship.location.toLowerCase().includes(location.toLowerCase())) return false;
            return true;
        });
    }, [filters]);

    return {
        filters,
        handleFilterChange,
        handleCheckboxFilterChange,
        resetFilters,
        filteredInternships,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage
    };
};