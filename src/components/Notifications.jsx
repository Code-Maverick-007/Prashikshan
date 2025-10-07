import React, { useState, useMemo } from 'react';
import { Bell, FileText, Calendar, User, Megaphone, Check, Trash2, Mail, MessageSquare } from 'lucide-react';

// --- Mock Data ---
const initialNotifications = [
  { 
    id: 1, 
    category: 'Application Updates', 
    message: 'Your application for Data Analyst – Deloitte is shortlisted.', 
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
    read: false 
  },
  { 
    id: 2, 
    category: 'Faculty Feedback', 
    message: 'Faculty feedback added to your profile for the TechCorp internship.', 
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
    read: false 
  },
  { 
    id: 3, 
    category: 'Internship Deadlines', 
    message: 'AI/ML Internship at TCS deadline is in 2 days.', 
    timestamp: new Date(new Date().setHours(new Date().getHours() - 4)), // 4 hours ago
    read: true 
  },
  { 
    id: 4, 
    category: 'Industry Announcements', 
    message: 'New industry webinar: "The Future of Cloud Computing". Register Now.', 
    timestamp: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
    read: false 
  },
  { 
    id: 5, 
    category: 'Application Updates', 
    message: 'Your application for Backend Developer at Wipro has been received.', 
    timestamp: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 days ago
    read: true 
  },
];

// --- Helper to format time ---
const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

// --- Category Configuration ---
const categoryConfig = {
  'Application Updates': { icon: FileText, color: 'text-blue-400' },
  'Internship Deadlines': { icon: Calendar, color: 'text-yellow-400' },
  'Faculty Feedback': { icon: User, color: 'text-purple-400' },
  'Industry Announcements': { icon: Megaphone, color: 'text-cyan-400' },
};

// --- Main Notifications Component ---
const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('All');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAll = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = useMemo(() => {
    if (filter === 'All') return notifications;
    return notifications.filter(n => n.category === filter);
  }, [notifications, filter]);

  const categories = ['All', ...Object.keys(categoryConfig)];

  return (
    <div className="lg:ml-64 p-6 pt-20 lg:pt-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications & Alerts</h1>
        <p className="text-gray-400">Keep updated on important deadlines and updates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Notifications Feed</h2>
              <button onClick={handleClearAll} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Trash2 size={16} /> Clear All
              </button>
            </div>
            <div className="space-y-4">
              {filteredNotifications.map(notification => {
                const config = categoryConfig[notification.category];
                const Icon = config.icon;
                return (
                  <div key={notification.id} className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${notification.read ? 'bg-gray-800/30' : 'bg-blue-500/10'}`}>
                    {!notification.read && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>}
                    <div className={`flex-shrink-0 ${notification.read ? 'ml-[18px]' : ''}`}>
                      <Icon size={20} className={config.color} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-white'}`}>{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notification.timestamp)}</p>
                    </div>
                    {!notification.read && (
                      <button onClick={() => handleMarkAsRead(notification.id)} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                        <Check size={14} /> Mark as Read
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)} className={`w-full text-left p-2 rounded-md text-sm transition-colors ${filter === cat ? 'bg-[#00C4CC] text-gray-900 font-semibold' : 'text-gray-300 hover:bg-gray-800'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="email-toggle" className="text-sm text-gray-300 flex items-center gap-2"><Mail size={16}/> Email Alerts</label>
                <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="email-toggle" className="sr-only peer" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00C4CC]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="sms-toggle" className="text-sm text-gray-300 flex items-center gap-2"><MessageSquare size={16}/> SMS Alerts</label>
                <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="sms-toggle" className="sr-only peer" checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00C4CC]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;