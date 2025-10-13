import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Search, RotateCcw, X, ChevronLeft, ChevronRight, Clock, Layers } from 'lucide-react';
import { learningPathsData } from '../data/learningPaths.js';

// --- Reusable Sub-Components ---
const FilterSection = ({ title, children }) => (<div className="border-b border-border dark:border-dark-border pb-4"><h4 className="text-sm font-semibold text-primary dark:text-primary-300 mb-3">{title}</h4>{children}</div>);

const LearningPathCard = ({ path }) => {
    const navigate = useNavigate();
    
    const getLevelColors = (level) => {
        switch (level) {
            case 'Beginner': return 'bg-success/20 text-success';
            case 'Intermediate': return 'bg-warning/20 text-warning';
            case 'Advanced': return 'bg-primary/20 text-primary';
            default: return 'bg-accent/20 text-accent';
        }
    };
    
    const getLevelGradient = (level) => {
        switch (level) {
            case 'Beginner': return 'from-success/5';
            case 'Intermediate': return 'from-warning/5';
            case 'Advanced': return 'from-primary/5';
            default: return 'from-accent/5';
        }
    };

    return (
        <div className={`bg-gradient-to-br ${getLevelGradient(path.level)} to-surface dark:to-dark-surface p-5 rounded-xl border border-border dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group`}>
            <div className="flex-grow">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getLevelColors(path.level)}`}>
                    {path.level}
                </span>
                <h3 className="font-bold text-text dark:text-dark-text text-lg mt-3 group-hover:text-accent transition-colors">{path.title}</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1 mb-4">{path.description}</p>
            </div>
            <div className="mt-auto pt-4 border-t border-border dark:border-dark-border space-y-3 text-xs text-text-secondary dark:text-dark-text-secondary">
                <div className="flex justify-between">
                    <span className="flex items-center gap-1.5"><Layers size={14}/> {path.totalModules} Modules</span>
                    <span className="flex items-center gap-1.5"><Clock size={14}/> Approx. {path.hours} hours</span>
                </div>
                <button 
                    onClick={() => navigate(`/learning-hub/${path.id}`)}
                    className="w-full py-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
                >
                    Start Learning
                </button>
            </div>
        </div>
    );
};

const PaginationControls = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
    return (
      <div className="flex items-center justify-end text-sm text-text-secondary dark:text-dark-text-secondary pt-4 mt-6 border-t border-border dark:border-dark-border">
      <div className="flex items-center gap-4">
        <span>Resources per page:</span>
        <select
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(Number(e.target.value))}
          className="bg-surface dark:bg-dark-surface p-2 rounded-md border border-border dark:border-dark-border outline-none focus:border-accent appearance-none pr-6 text-center"
          style={{
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage: "none"
          }}
        >
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
        </select>
    
        <div className="flex items-center border border-border dark:border-dark-border rounded-md">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border-r border-border dark:border-dark-border hover:bg-bg dark:hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16}/>
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 hover:bg-bg dark:hover:bg-dark-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16}/>
          </button>
        </div>
      </div>
    </div>
    );
};


// --- Main Learning Hub Page Component ---
const LearningHub = () => {
  const [filters, setFilters] = useState({ search: '', level: 'All', category: 'All' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const handleFilterChange = (key, value) => { setFilters(prev => ({ ...prev, [key]: value })); setCurrentPage(1); };
  const resetFilters = () => { setFilters({ search: '', level: 'All', category: 'All' }); setCurrentPage(1); };

  const filteredPaths = useMemo(() => {
    return learningPathsData.filter(path => {
        if (filters.search && !path.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.level !== 'All' && path.level !== filters.level) return false;
        if (filters.category !== 'All' && path.category !== filters.category) return false;
        return true;
    });
  }, [filters, learningPathsData]);

  const totalPages = Math.ceil(filteredPaths.length / itemsPerPage);
  const currentPaths = filteredPaths.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handleItemsPerPageChange = (value) => { setItemsPerPage(value); setCurrentPage(1); };
  
  const FilterPanel = () => {
    const categories = ['All', 'Technical', 'Soft Skills', 'Management', 'Design', 'Business', 'Marketing'];
    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
    return (
        <aside className={`fixed inset-0 z-50 bg-bg dark:bg-dark-bg p-6 overflow-y-auto transition-transform duration-300 ${isFilterPanelOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 lg:bg-transparent lg:border-none lg:p-0 lg:w-72 xl:w-80 lg:flex-shrink-0`}>
            <div className="flex justify-between items-center mb-6 lg:mb-0">
              <h3 className="text-lg font-bold flex items-center gap-2"><SlidersHorizontal size={18}/> Filter</h3>
              <button onClick={() => setIsFilterPanelOpen(false)} className="text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text lg:hidden"><X/></button>
            </div>
            <div className="space-y-6 lg:bg-surface lg:dark:bg-dark-surface lg:p-6 lg:rounded-xl lg:border lg:border-border lg:dark:border-dark-border lg:mt-6">
                <div className="relative">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary dark:text-dark-text-secondary"/>
                  <input type="text" placeholder="Search by title..." value={filters.search} onChange={e => handleFilterChange('search', e.target.value)} className="w-full pl-10 pr-4 py-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border focus:border-accent outline-none"/>
                </div>
                <FilterSection title="Category">
                  <div className="flex flex-wrap gap-2">{categories.map(cat => (<button key={cat} onClick={() => handleFilterChange('category', cat)} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${filters.category === cat ? 'bg-primary text-white font-semibold shadow-md shadow-primary/30' : 'bg-border dark:bg-dark-border hover:bg-primary/10 dark:hover:bg-primary/20'}`}>{cat}</button>))}</div>
                </FilterSection>
                <FilterSection title="Difficulty Level">
                  <div className="space-y-2">{levels.map(lvl => (<label key={lvl} className="flex items-center gap-2 text-sm text-text/90 dark:text-dark-text/90 cursor-pointer"><input type="radio" name="level" value={lvl} checked={filters.level === lvl} onChange={e => handleFilterChange('level', e.target.value)} className="h-4 w-4 bg-border dark:bg-dark-border border-border dark:border-dark-border text-primary focus:ring-primary"/>{lvl}</label>))}</div>
                </FilterSection>
                <button onClick={resetFilters} className="w-full flex items-center justify-center gap-2 py-2 text-sm bg-danger/10 text-danger hover:bg-danger/20 rounded-lg transition-colors"><RotateCcw size={14} /> Clear All Filters</button>
            </div>
        </aside>
    );
  };

  return (
    <div className="lg:ml-64 p-4 pt-8 sm:p-6 lg:p-8 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50 via-bg to-accent-50/50 dark:from-dark-bg dark:via-primary-900/20 dark:to-dark-bg z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.2)_0%,_transparent_60%)] z-0"></div>
      
      <div className="relative z-10">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-1">Learning Hub</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">Explore skill paths and resources to get industry-ready.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1 min-w-0">
            <button onClick={() => setIsFilterPanelOpen(true)} className="lg:hidden mb-4 flex items-center gap-2 text-sm font-semibold p-2 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-md">
              <SlidersHorizontal size={16} /> Show Filters
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
              {currentPaths.map(path => (<LearningPathCard key={path.id} path={path} />))}
            </div>
            {totalPages > 1 && ( 
              <PaginationControls 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                  itemsPerPage={itemsPerPage} 
                  onItemsPerPageChange={handleItemsPerPageChange} 
              /> 
            )}
          </main>
          <FilterPanel />
        </div>
      </div>
    </div>
  );
};

export default LearningHub;