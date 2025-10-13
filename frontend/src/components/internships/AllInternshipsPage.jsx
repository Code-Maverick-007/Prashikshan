import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, RotateCcw, MapPin, Wallet, Briefcase, Clock, X, Bell, ChevronLeft, ChevronRight, ChevronDown, ExternalLink, SearchX } from 'lucide-react';
import { mockInternships } from '../../data/internships.js';

// --- Reusable Components ---
const FilterSection = ({ title, children }) => (
    <div className="border-b border-border dark:border-dark-border pb-4">
        <h4 className="text-sm font-semibold text-primary dark:text-primary-300 mb-3">{title}</h4>
    </div>
);

const InternshipCard = ({ data, onCardClick }) => (
    <div onClick={() => onCardClick(data)} className="bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm p-4 rounded-xl border border-border dark:border-dark-border hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden">
        <div className="flex gap-4">
            <img src={data.logo} alt={`${data.company} logo`} className="w-12 h-12 rounded-md bg-white p-1 object-contain flex-shrink-0" />
            <div>
                <h3 className="font-bold text-text dark:text-dark-text leading-tight group-hover:text-accent transition-colors">{data.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{data.company}</p>
            </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary dark:text-dark-text-secondary">
            <span className="flex items-center gap-1.5"><MapPin size={14}/> {data.location}</span>
            <span className="flex items-center gap-1.5"><Wallet size={14}/> INR {data.stipend.toLocaleString()}/month</span>
            <span className="flex items-center gap-1.5"><Briefcase size={14}/> {data.type}</span>
            <span className="flex items-center gap-1.5"><Clock size={14}/> {data.duration}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-border dark:border-dark-border flex justify-between items-center">
            <p className={`text-xs font-semibold px-2 py-1 rounded-full ${data.deadlinePassed ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'}`}>{data.status}</p>
            <button 
                onClick={(e) => { e.stopPropagation(); window.open(data.applyLink, '_blank'); }} 
                className="px-4 py-2 text-xs bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-primary/30"
            >
                Apply Now
            </button>
        </div>
    </div>
);

const InternshipDetailModal = ({ internship, onClose }) => { 
    if (!internship) return null; 
    return ( 
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-surface dark:bg-dark-surface rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border dark:border-dark-border flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 sticky top-0 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm border-b border-border dark:border-dark-border flex justify-between items-start gap-4 z-10">
                    <div className="flex items-center gap-4">
                      <img src={internship.logo} alt={`${internship.company} logo`} className="w-16 h-16 rounded-lg bg-white p-1 object-contain flex-shrink-0" />
                      <div>
                        <h2 className="text-2xl font-bold text-text dark:text-dark-text">{internship.title}</h2>
                        <p className="text-md text-text-secondary dark:text-dark-text-secondary">{internship.company}</p>
                      </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-bg dark:hover:bg-dark-border flex-shrink-0 transition-colors"><X size={20}/></button>
                </div>
                <div className="p-6 space-y-6 text-text/90 dark:text-dark-text/90 text-sm">
                  <div>
                    <h4 className="font-semibold text-text dark:text-dark-text mb-2">Description</h4>
                    <p className="text-text-secondary dark:text-dark-text-secondary whitespace-pre-line">{internship.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-text-secondary dark:text-dark-text-secondary">
                    <div><h4 className="font-semibold text-text dark:text-dark-text mb-1">Location</h4><p>{internship.location}</p></div>
                    <div><h4 className="font-semibold text-text dark:text-dark-text mb-1">Stipend</h4><p>INR {internship.stipend.toLocaleString()}/month</p></div>
                    <div><h4 className="font-semibold text-text dark:text-dark-text mb-1">Duration</h4><p>{internship.duration}</p></div>
                    <div><h4 className="font-semibold text-text dark:text-dark-text mb-1">Type</h4><p>{internship.type}</p></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text dark:text-dark-text mb-2">Skills Required</h4>
                    <div className="flex flex-wrap gap-2">
                        {internship.skills.map(skill => <span key={skill} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">{skill}</span>)}
                    </div>
                  </div>
                </div>
                <div className="p-6 mt-auto sticky bottom-0 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm border-t border-border dark:border-dark-border">
                  <button onClick={() => window.open(internship.applyLink, '_blank')} className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                    Apply Now <ExternalLink size={16}/>
                  </button>
                </div>
            </div>
        </div>
    );
};

const PaginationControls = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange, totalItems }) => { 
    const firstItemIndex = (currentPage - 1) * itemsPerPage + 1; 
    const lastItemIndex = Math.min(currentPage * itemsPerPage, totalItems); 
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-text-secondary dark:text-dark-text-secondary pt-4 mt-4 border-t border-border dark:border-dark-border">
        <div className="text-text-secondary/80 dark:text-dark-text-secondary/80 mb-2 sm:mb-0">
          {totalItems > 0 ? `Showing ${firstItemIndex}-${lastItemIndex} of ${totalItems}` : 'No results'}
        </div>
      
        <div className="flex items-center gap-4">
          <span>Internships per page:</span>
      
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="appearance-none bg-surface dark:bg-dark-surface p-2 rounded-md border border-border dark:border-dark-border outline-none focus:border-accent pr-6 text-text-primary dark:text-dark-text-primary"
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
              backgroundImage: "none",
            }}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
          </select>
      
          <div className="flex items-center border border-border dark:border-dark-border rounded-md">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border-r border-border dark:border-dark-border hover:bg-bg dark:hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 hover:bg-bg dark:hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      
    );
};

const AllInternshipsPage = () => {
    const [allInternships] = useState(mockInternships);
    const [filters, setFilters] = useState({ search: '', location: '', internshipType: [], internshipStatus: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [internshipAlerts, setInternshipAlerts] = useState(true);

    const handleFilterChange = (key, value) => { setFilters(prev => ({ ...prev, [key]: value })); setCurrentPage(1); };
    const handleCheckboxFilterChange = (key, value) => {
        setFilters(prev => {
            const currentValues = prev[key] || [];
            const newValues = currentValues.includes(value) ? currentValues.filter(v => v !== value) : [...currentValues, value];
            return { ...prev, [key]: newValues };
        });
        setCurrentPage(1);
    };
    const resetFilters = () => { setFilters({ search: '', location: '', internshipType: [], internshipStatus: [] }); setCurrentPage(1); };

    const filteredInternships = useMemo(() => {
        return allInternships.filter(internship => {
            const searchLower = filters.search.toLowerCase();
            const locationLower = filters.location.toLowerCase();
            
            const searchMatch = !searchLower || internship.title.toLowerCase().includes(searchLower) || internship.company.toLowerCase().includes(searchLower);
            const locationMatch = !locationLower || internship.location.toLowerCase().includes(locationLower);
            const typeMatch = filters.internshipType.length === 0 || filters.internshipType.includes(internship.type);
            const statusMatch = filters.internshipStatus.length === 0 || filters.internshipStatus.includes(internship.status);

            return searchMatch && locationMatch && typeMatch && statusMatch;
        });
    }, [filters, allInternships]);
    
    const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
    const currentInternships = filteredInternships.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handleItemsPerPageChange = (value) => { setItemsPerPage(value); setCurrentPage(1); };

    const FilterPanel = () => {
        const filterOptions = { internshipType: ['Internship', 'Full Time', 'Part Time', 'Contract', 'Internship+PPO'], internshipStatus: ['ACTIVE', 'Position Closed', 'Registration Closed'], };
        return (
            <aside className={`fixed inset-0 z-50 bg-bg dark:bg-dark-bg p-6 overflow-y-auto transition-transform duration-300 ${isFilterPanelOpen ? 'translate-x-0' : 'transform -translate-x-full'} lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 lg:bg-transparent lg:border-none lg:p-0 lg:w-72 xl:w-80 lg:flex-shrink-0`}>
                <div className="flex justify-between items-center mb-6 lg:mb-0">
                    <h3 className="text-lg font-bold flex items-center gap-2"><SlidersHorizontal size={18}/> Filter</h3>
                    <button onClick={() => setIsFilterPanelOpen(false)} className="text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text lg:hidden"><X/></button>
                </div>
                <div className="space-y-6 lg:bg-surface lg:dark:bg-dark-surface lg:p-6 lg:rounded-xl lg:border lg:border-border lg:dark:border-dark-border lg:mt-6">
                    <div className="relative">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary dark:text-dark-text-secondary"/>
                        <input type="text" placeholder="Search by role, company..." value={filters.search} onChange={e => handleFilterChange('search', e.target.value)} className="w-full pl-10 pr-4 py-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border focus:border-accent outline-none"/>
                    </div>
                    <FilterSection title="Internship Type">
                        <div className="space-y-2">{filterOptions.internshipType.map(type => (<label key={type} className="flex items-center gap-2 text-sm text-text/90 dark:text-dark-text/90 cursor-pointer"><input type="checkbox" checked={filters.internshipType.includes(type)} onChange={() => handleCheckboxFilterChange('internshipType', type)} className="h-4 w-4 rounded bg-border dark:bg-dark-border border-border dark:border-dark-border text-accent focus:ring-accent"/>{type}</label>))}</div>
                    </FilterSection>
                    <FilterSection title="Internship Status">
                        <div className="space-y-2">{filterOptions.internshipStatus.map(status => (<label key={status} className="flex items-center gap-2 text-sm text-text/90 dark:text-dark-text/90 cursor-pointer"><input type="checkbox" checked={filters.internshipStatus.includes(status)} onChange={() => handleCheckboxFilterChange('internshipStatus', status)} className="h-4 w-4 rounded bg-border dark:bg-dark-border border-border dark:border-dark-border text-accent focus:ring-accent"/>{status}</label>))}</div>
                    </FilterSection>
                    <FilterSection title="Location">
                        <input type="text" placeholder="e.g., Bengaluru, Remote" value={filters.location} onChange={e => handleFilterChange('location', e.target.value)} className="w-full px-4 py-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border focus:border-accent outline-none"/>
                    </FilterSection>
                    <button onClick={resetFilters} className="w-full flex items-center justify-center gap-2 py-2 text-sm bg-danger/10 text-danger hover:bg-danger/20 rounded-lg transition-colors"><RotateCcw size={14} /> Clear All Filters</button>
                </div>
            </aside>
        );
    };
  
    return (
        <>
            <InternshipDetailModal internship={selectedInternship} onClose={() => setSelectedInternship(null)} />
            <div className="relative  p-4 pt-8 sm:p-6 lg:p-8">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-bg to-accent-50/50 dark:from-dark-bg dark:via-primary-900/20 dark:to-dark-bg z-0"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.2)_0%,_transparent_60%)] z-0"></div>
                
                <div className="relative z-10"> {/* Content wrapper */}
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">All Internships</h1>
                        <p className="text-text-secondary dark:text-dark-text-secondary mb-6">Discover exciting opportunities to kickstart your career.</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <main className="flex-1 min-w-0 space-y-6">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                <button onClick={() => setIsFilterPanelOpen(true)} className="lg:hidden flex items-center gap-2 text-sm px-4 py-2 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg">
                                    <SlidersHorizontal size={16}/> Filter & Sort
                                </button>
                                <div className="hidden lg:flex items-center gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-300">Sort by:</span>

          <div className="relative">
            <select
              className="appearance-none bg-surface dark:bg-dark-surface p-2 pr-8 rounded-md border border-border dark:border-dark-border outline-none focus:border-accent transition text-sm cursor-pointer"
            >
              <option>Relevance</option>
              <option>Most Recent</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

                               
                                <div className="flex items-center gap-3 text-sm font-semibold">
                                    <Bell size={16} /><span>Internship Alerts</span>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={internshipAlerts} onChange={() => setInternshipAlerts(!internshipAlerts)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-border dark:bg-dark-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {currentInternships.length > 0 ? (
                                    currentInternships.map(internship => (<InternshipCard key={internship.id} data={internship} onCardClick={setSelectedInternship}/>))
                                ) : (
                                    <div className="md:col-span-2 text-center py-20 px-4 bg-surface/50 dark:bg-dark-surface/30 border-2 border-dashed border-border dark:border-dark-border rounded-xl">
                                        <SearchX size={48} className="mx-auto text-text-secondary dark:text-dark-text-secondary" strokeWidth={1.5} />
                                        <p className="mt-4 text-lg font-semibold text-text dark:text-dark-text">No internships found</p>
                                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Try adjusting your filters.</p>
                                    </div>
                                )}
                            </div>
                            {totalPages > 0 && ( <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} itemsPerPage={itemsPerPage} onItemsPerPageChange={handleItemsPerPageChange} totalItems={filteredInternships.length} /> )}
                        </main>
                        <FilterPanel />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllInternshipsPage;