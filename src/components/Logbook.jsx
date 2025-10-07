import React, { useState, useMemo } from 'react';
import { BookText, CalendarDays, FileDown, Send, Clock, CheckCircle, HardHat, FileType, FileText as FileTextIcon, X, Plus } from 'lucide-react';

// --- Add Entry Modal Sub-Component ---
const AddEntryModal = ({ isOpen, onClose, onAddEntry }) => {
  const [notes, setNotes] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes || !hours || !date) {
      alert('Please fill out all fields.');
      return;
    }
    onAddEntry({
      date,
      notes,
      hours: parseInt(hours, 10),
      mentorStatus: 'Pending',
    });
    // Reset form and close
    setNotes('');
    setHours('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-lg border border-gray-700" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Add New Log Entry</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
            <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"/>
          </div>
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-300 mb-1">Hours Worked</label>
            <input id="hours" type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="e.g., 8" className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"/>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Notes / Activities</label>
            <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows="4" placeholder="Describe the tasks you worked on..." className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[#00C4CC] text-gray-900 font-semibold hover:bg-[#00B8C2]">Add Entry</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- Main LogbookAndReport Component ---
const LogbookAndReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logEntries, setLogEntries] = useState([
    {
      id: 2,
      date: '2025-09-29',
      notes: 'Worked on UI fixes for the dashboard, attended the daily stand-up meeting, and debugged the authentication flow.',
      hours: 8,
      mentorStatus: 'Verified',
    },
    {
      id: 1,
      date: '2025-09-28',
      notes: 'Client meeting to discuss new feature requirements. Started initial wireframes for the user profile page.',
      hours: 7,
      mentorStatus: 'Pending',
    },
  ]);

  const handleAddEntry = (newEntry) => {
    setLogEntries(prevEntries => [{ id: Date.now(), ...newEntry }, ...prevEntries]);
  };

  const totalHours = useMemo(() => {
    return logEntries.reduce((sum, entry) => sum + entry.hours, 0);
  }, [logEntries]);

  return (
    <>
      <AddEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddEntry={handleAddEntry} />

      <div className="lg:ml-64 p-6 pt-20 lg:pt-6 space-y-6">
        {/* 1. Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Logbook & Report</h1>
          <p className="text-gray-400">Maintain internship records automatically and generate NEP-compliant reports.</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={() => setIsModalOpen(true)} className="w-full p-4 bg-[#00C4CC] text-gray-900 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-[#00B8C2] transition-colors">
            <Plus size={18} /> Add New Entry
          </button>
          <button onClick={() => alert('Generating report...')} className="w-full p-4 bg-gray-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
            <FileDown size={18} /> Download Report
          </button>
          <button onClick={() => alert('Sending to mentor for review...')} className="w-full p-4 bg-gray-800 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
            <Send size={18} /> Send to Mentor
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily/Weekly Activity Log */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Activity Log</h2>
              <div className="space-y-4">
                {logEntries.map((entry) => (
                  <div key={entry.id} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-white">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                        <p className="text-sm text-gray-300 mt-1">{entry.notes}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-lg font-bold text-[#00C4CC]">{entry.hours}h</p>
                        <span className={`mt-1 text-xs font-medium inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${ entry.mentorStatus === 'Verified' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400' }`}>
                          {entry.mentorStatus === 'Verified' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                          {entry.mentorStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Timeline */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2"><CalendarDays size={20}/> Progress Summary</h2>
              <div className="p-4 bg-gray-800 rounded-lg text-center">
                <p className="text-sm text-gray-400">Total Hours Logged</p>
                <p className="text-4xl font-bold text-white">{totalHours} hours</p>
              </div>
            </div>

            {/* Report Generator */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Report Generator</h2>
              <p className="text-sm text-gray-400 mb-4">Auto-generate your NEP-compliant report with one click.</p>
              <div className="space-y-2 text-sm text-gray-300">
                  <p className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2"/> Introduction</p>
                  <p className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2"/> Work Done</p>
                  <p className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2"/> Learnings</p>
                  <p className="flex items-center"><CheckCircle size={16} className="text-green-500 mr-2"/> Hours Completed</p>
              </div>
              <div className="flex gap-3 mt-4">
                  <button onClick={() => alert('Exporting as PDF...')} className="flex-1 p-2 bg-gray-700 text-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600">
                      <FileType size={16}/> Export as PDF
                  </button>
                  <button onClick={() => alert('Exporting as Word...')} className="flex-1 p-2 bg-gray-700 text-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600">
                      <FileTextIcon size={16}/> Export as Word
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogbookAndReport;