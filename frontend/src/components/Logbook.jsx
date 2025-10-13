import React, { useState, useMemo, useEffect } from 'react';
import { BookText, CalendarDays, FileDown, Clock, CheckCircle, Plus, ChevronDown, MessageSquare, X, Edit, Save, Trash2 } from 'lucide-react';

// --- Reusable Skill Tag Input for Forms ---
const SkillInput = ({ skills, setSkills }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newSkill = inputValue.trim();
            if (newSkill && !skills.includes(newSkill)) {
                setSkills([...skills, newSkill]);
                setInputValue('');
            }
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    return (
        <div>
            <label className="block text-sm font-medium text-text-secondary dark:text-dark-text-secondary mb-1">Skills Practiced</label>
            <div className="flex flex-wrap items-center gap-2 p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border focus-within:border-accent">
                {skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:bg-primary/20 rounded-full"><X size={12}/></button>
                    </span>
                ))}
                <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a skill & press Enter..." className="flex-1 bg-transparent outline-none text-sm p-1 min-w-[150px]"/>
            </div>
        </div>
    );
};

// --- In-Page Form to Add New Entries ---
const LogEntryForm = ({ onAddEntry }) => {
    const [notes, setNotes] = useState('');
    const [hours, setHours] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [skills, setSkills] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!notes || !hours || !date) {
            alert('Please fill out Date, Hours Worked, and Notes.');
            return;
        }
        onAddEntry({ date, notes, hours: parseInt(hours, 10), skills, mentorStatus: 'Pending', feedback: null });
        setNotes(''); setHours(''); setSkills([]);
    };

    return (
        <div className="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border shadow-sm">
            <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Add a New Log Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border text-text dark:text-dark-text focus:border-accent outline-none"/>
                    <input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Hours Worked (e.g., 8)" className="w-full p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border text-text dark:text-dark-text focus:border-accent outline-none"/>
                </div>
                <SkillInput skills={skills} setSkills={setSkills} />
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows="3" placeholder="Describe the tasks you worked on today..." className="w-full p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border text-text dark:text-dark-text focus:border-accent outline-none"></textarea>
                <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-primary text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary/30">
                    <Plus size={18} /> Add Entry
                </button>
            </form>
        </div>
    );
};

// --- Card for Displaying/Editing a Single Log Entry ---
const LogEntryCard = ({ entry, onUpdate, onDelete, index }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(entry);

    const handleSave = () => {
        onUpdate(entry.id, editData);
        setIsEditing(false);
    };

    const skillColors = ['bg-primary/10 text-primary', 'bg-accent/10 text-accent', 'bg-success/10 text-success', 'bg-warning/10 text-warning'];

    if (isEditing) {
        return (
            <div className="p-4 bg-surface dark:bg-dark-surface rounded-lg border-2 border-primary shadow-lg space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="date" value={new Date(editData.date).toISOString().split('T')[0]} onChange={e => setEditData({...editData, date: e.target.value})} className="w-full p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border"/>
                    <input type="number" value={editData.hours} onChange={e => setEditData({...editData, hours: parseInt(e.target.value) || 0})} className="w-full p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border"/>
                </div>
                <SkillInput skills={editData.skills} setSkills={(newSkills) => setEditData({...editData, skills: newSkills})} />
                <textarea value={editData.notes} onChange={e => setEditData({...editData, notes: e.target.value})} rows="3" className="w-full p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border"></textarea>
                <div className="flex justify-between items-center pt-2 border-t border-border dark:border-dark-border">
                    <button onClick={() => {if(window.confirm('Are you sure you want to delete this entry?')) onDelete(entry.id)}} className="p-2 text-danger hover:bg-danger/10 rounded-full transition-colors"><Trash2 size={16}/></button>
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm rounded-lg bg-border dark:bg-dark-border hover:brightness-95">Cancel</button>
                        <button onClick={handleSave} className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary-700 flex items-center gap-2"><Save size={14}/> Save</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-text dark:text-dark-text">{new Date(entry.date).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="text-sm text-text/90 dark:text-dark-text/90 mt-2 whitespace-pre-line">{entry.notes}</p>
                    {entry.skills && entry.skills.length > 0 && <div className="flex flex-wrap gap-2 mt-3">{entry.skills.map(skill => <span key={skill} className={`text-xs px-2 py-1 rounded-full font-semibold ${skillColors[index % skillColors.length]}`}>{skill}</span>)}</div>}
                </div>
                <div className="text-right flex-shrink-0 ml-4 space-y-2">
                    <p className="text-lg font-bold text-accent">{entry.hours}h</p>
                    <span className={`text-xs font-medium inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${ entry.mentorStatus === 'Verified' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning' }`}>{entry.mentorStatus === 'Verified' ? <CheckCircle size={12}/> : <Clock size={12}/>} {entry.mentorStatus}</span>
                </div>
            </div>
            {entry.feedback && (
                <div className="mt-3 pt-3 border-t border-border/50 dark:border-dark-border/50">
                  <p className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary flex items-center gap-1.5"><MessageSquare size={12}/> Mentor Feedback:</p>
                  <p className="text-sm italic text-text/90 dark:text-dark-text/90 mt-1">"{entry.feedback}"</p>
                </div>
            )}
            <div className="flex justify-end -mb-2 -mr-2"><button onClick={() => setIsEditing(true)} className="p-2 text-text-secondary rounded-full hover:bg-bg dark:hover:bg-dark-border hover:text-accent"><Edit size={14}/></button></div>
        </div>
    );
};

// --- Main Logbook Page Component ---
const Logbook = () => {
  const [logEntries, setLogEntries] = useState(() => JSON.parse(localStorage.getItem('logEntries')) || []);

  useEffect(() => {
    localStorage.setItem('logEntries', JSON.stringify(logEntries));
  }, [logEntries]);

  const handleAddEntry = (newEntry) => {
    setLogEntries(prev => [{ id: Date.now(), ...newEntry }, ...prev]);
  };
  
  const handleUpdateEntry = (id, updatedEntry) => {
    setLogEntries(prev => prev.map(entry => entry.id === id ? updatedEntry : entry));
  };
  
  const handleDeleteEntry = (id) => {
    setLogEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const totalHours = useMemo(() => logEntries.reduce((sum, entry) => sum + (entry.hours || 0), 0), [logEntries]);
  const verifiedHours = useMemo(() => logEntries.filter(e => e.mentorStatus === 'Verified').reduce((sum, entry) => sum + (entry.hours || 0), 0), [logEntries]);
  const uniqueSkills = useMemo(() => [...new Set(logEntries.flatMap(e => e.skills || []))], [logEntries]);
  const skillColors = ['bg-primary/10 text-primary', 'bg-accent/10 text-accent', 'bg-success/10 text-success', 'bg-warning/10 text-warning'];

  return (
    <div className="lg:ml-64 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Logbook & Report</h1>
        <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Maintain internship records and generate NEP-compliant reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <LogEntryForm onAddEntry={handleAddEntry} />
          
          {logEntries.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-text dark:text-dark-text mt-8 mb-4">Recent Entries</h2>
              <div className="space-y-4">
                {logEntries.map((entry, index) => (
                  <LogEntryCard key={entry.id} index={index} entry={entry} onUpdate={handleUpdateEntry} onDelete={handleDeleteEntry} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-text dark:text-dark-text flex items-center gap-2"><CalendarDays size={20}/> Progress Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bg dark:bg-dark-border p-4 rounded-lg text-center"><p className="text-sm text-text-secondary dark:text-dark-text-secondary">Total Hours</p><p className="text-3xl font-bold text-text dark:text-dark-text">{totalHours}</p></div>
                  <div className="bg-bg dark:bg-dark-border p-4 rounded-lg text-center"><p className="text-sm text-text-secondary dark:text-dark-text-secondary">Verified Hours</p><p className="text-3xl font-bold text-success">{verifiedHours}</p></div>
              </div>
              <div className="mt-4"><p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-1">Overall Progress (240 hours required)</p><div className="w-full bg-border dark:bg-dark-border rounded-full h-2.5"><div className="bg-accent h-2.5 rounded-full" style={{ width: `${Math.min((totalHours / 240) * 100, 100)}%` }}></div></div></div>
              <div className="mt-4"><h4 className="text-sm font-semibold text-text/90 dark:text-dark-text/90 mb-2">Skills Practiced</h4><div className="flex flex-wrap gap-2">{uniqueSkills.length > 0 ? uniqueSkills.map((skill, index) => <span key={skill} className={`text-xs px-2 py-1 rounded-full font-semibold ${skillColors[index % skillColors.length]}`}>{skill}</span>) : <p className="text-xs text-text-secondary">No skills logged yet.</p>}</div></div>
          </div>
          <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-text dark:text-dark-text">Report Generator</h3>
            <form className="space-y-3">
                <div><label className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">Start Date</label><input type="date" className="w-full mt-1 p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border text-text dark:text-dark-text"/></div>
                <div><label className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">End Date</label><input type="date" className="w-full mt-1 p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border text-text dark:text-dark-text"/></div>
                <button type="button" onClick={() => alert('Generating PDF report...')} className="w-full !mt-4 p-2 bg-primary text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors shadow-md shadow-primary/30"><FileDown size={18} /> Generate & Download</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logbook;