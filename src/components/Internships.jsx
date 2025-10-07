import React, { useState, useMemo } from 'react';
import { 
  MapPin, Clock, Bookmark, Briefcase, 
  CheckCircle, X, Wallet, School, SlidersHorizontal, Search, RotateCcw
} from 'lucide-react';

// Import the shared internship data
import { internshipsData } from '../data/internships.js';

// --- Reusable Sub-Components ---
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 flex items-center gap-4">
    <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${color}20` }}><Icon size={22} style={{ color }} /></div>
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-400">{title}</p>
    </div>
  </div>
);

const InternshipCard = ({ internship, onCardClick }) => (
  <div onClick={() => onCardClick(internship)} className="bg-gray-900/50 p-5 rounded-xl border border-gray-800 hover:border-[#00C4CC] cursor-pointer transition-all group flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-base font-semibold text-white group-hover:text-[#00C4CC] transition-colors">{internship.title}</h3>
          <p className="text-sm text-gray-400">{internship.company}</p>
        </div>
        {internship.nepEligible && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0"><CheckCircle size={12}/> NEP Credit</span>}
      </div>
      <div className="my-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400 items-center">
        <p className="flex items-center gap-1.5"><MapPin size={14}/> {internship.mode} ({internship.location})</p>
        <p className="flex items-center gap-1.5"><Clock size={14}/> {internship.duration} months</p>
        <p className="flex items-center gap-1.5"><Wallet size={14}/> ₹{internship.stipend.toLocaleString()}/month</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {internship.skills.slice(0, 4).map(skill => <span key={skill} className="text-xs bg-gray-700/80 px-2.5 py-1 rounded-full">{skill}</span>)}
      </div>
    </div>
    <div className="flex gap-3 text-sm pt-4 border-t border-gray-800">
      <button className="flex-1 py-2 bg-[#00C4CC] text-gray-900 font-semibold rounded-lg hover:bg-[#00B8C2] transition-colors">Apply Now</button>
      <button className="flex-1 py-2 bg-gray-700/80 text-white rounded-lg hover:bg-gray-700 transition-colors flex justify-center items-center gap-2"><Bookmark size={14}/> Save</button>
    </div>
  </div>
);

const InternshipDetailModal = ({ internship, onClose }) => {
    if (!internship) return null;
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-700" onClick={e => e.stopPropagation()}>
            <div className="p-6 sticky top-0 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">{internship.title}</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700"><X size={20}/></button>
            </div>
            {/* ... Modal content would go here ... */}
        </div>
      </div>
    );
};

// --- Main Internships Component ---
const Internships = () => {
  const [filters, setFilters] = useState({ search: '', domain: 'All', mode: 'All', nep: 'All' });
  const [sortBy, setSortBy] = useState('stipend');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: '', domain: 'All', mode: 'All', nep: 'All' });
    setSortBy('recent');
  };

  const filteredAndSortedInternships = useMemo(() => {
    // Filter for internships that are available to apply for
    let result = internshipsData.filter(i => i.status === 'Available');

    // Apply user filters
    result = result.filter(i => {
      const searchMatch = filters.search === '' ||
                          i.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          i.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                          i.skills.some(s => s.toLowerCase().includes(filters.search.toLowerCase()));
      const domainMatch = filters.domain === 'All' || i.skills.includes(filters.domain);
      const modeMatch = filters.mode === 'All' || i.mode === filters.mode;
      const nepMatch = filters.nep === 'All' || (filters.nep === 'Eligible' && i.nepEligible);

      return searchMatch && domainMatch && modeMatch && nepMatch;
    });

    // Apply sorting
    if (sortBy === 'stipend') { result.sort((a, b) => b.stipend - a.stipend); } 
    else if (sortBy === 'duration') { result.sort((a, b) => a.duration - b.duration); }
    return result;
  }, [filters, sortBy]);

  const statsData = [
    { title: 'Total Internships', value: '120+', icon: Briefcase, color: '#00C4CC' },
    { title: 'Remote Options', value: '45', icon: MapPin, color: '#3B82F6' },
    { title: 'NEP Credit Eligible', value: '35', icon: School, color: '#10B981' },
  ];

  const FilterPanel = () => (
    <aside className={` ${isFilterOpen ? 'fixed' : 'hidden'} inset-0 z-50 bg-gray-900 p-6 lg:block lg:relative lg:inset-auto lg:z-auto lg:bg-gray-900/50 lg:border lg:border-gray-800 lg:rounded-xl lg:self-start `}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-white">Filter Internships</h3>
        <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-white lg:hidden"><X/></button>
      </div>
      <div className="space-y-6">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          <input name="search" value={filters.search} onChange={handleFilterChange} type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-md border border-gray-700 text-white focus:outline-none focus:border-[#00C4CC]"/>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">Domain/Industry</label>
          <select name="domain" value={filters.domain} onChange={handleFilterChange} className="w-full mt-2 p-2 bg-gray-800 rounded-md border border-gray-700 text-white focus:outline-none focus:border-[#00C4CC]">
            <option>All</option><option>IT</option><option>Finance</option><option>Marketing</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300">Mode</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['All', 'Remote', 'Hybrid', 'Onsite'].map(modeOption => (
                <button key={modeOption} onClick={() => handleFilterChange({ target: { name: 'mode', value: modeOption } })}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${ filters.mode === modeOption ? 'bg-[#00C4CC] text-gray-900 font-semibold' : 'bg-gray-800 text-gray-400 hover:bg-gray-700' }`}
                >
                    {modeOption}
                </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
            <label htmlFor="nep-checkbox" className="text-sm font-medium text-gray-300">NEP Credit Eligible</label>
            <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="nep-checkbox" className="sr-only peer" checked={filters.nep === 'Eligible'} onChange={(e) => handleFilterChange({ target: { name: 'nep', value: e.target.checked ? 'Eligible' : 'All' } })} />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00C4CC]"></div>
            </div>
        </div>
        <div>
          <button onClick={resetFilters} className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            <RotateCcw size={14} /> Clear All Filters
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <InternshipDetailModal internship={selectedInternship} onClose={() => setSelectedInternship(null)} />
      <div className="lg:ml-64 p-6 pt-20 lg:pt-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <FilterPanel />
          <main className="lg:col-span-3 space-y-6 mt-8 lg:mt-0">
            <div>
              <h1 className="text-3xl font-bold text-white">Browse Internships</h1>
              <p className="text-gray-400 mt-1">Find internships that match your skills, interests, and career goals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statsData.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => setIsFilterOpen(true)} className="lg:hidden p-2 bg-gray-800 rounded-md flex items-center gap-2 text-white"><SlidersHorizontal size={16}/> Filter Internships</button>
              <p className="text-sm text-gray-400 hidden sm:block"><span className="font-bold text-white">{filteredAndSortedInternships.length}</span> internships found</p>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="p-2 bg-gray-800 rounded-md border border-gray-700 text-sm text-white focus:outline-none focus:border-[#00C4CC]">
                <option value="recent">Most Recent</option>
                <option value="stipend">Highest Stipend</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAndSortedInternships.map(internship => (
                <InternshipCard key={internship.id} internship={internship} onCardClick={setSelectedInternship}/>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Internships;