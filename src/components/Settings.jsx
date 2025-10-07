import React, { useState } from 'react';
import { User, Shield, Bell, Sun, Moon, Monitor, Cog, AlertTriangle, Download, LogOut, Lock, Languages } from 'lucide-react';

// --- Reusable Sub-Components ---

const SettingsSection = ({ title, subtitle, isDangerZone = false, children }) => (
  <div className={`bg-gray-900/50 border ${isDangerZone ? 'border-red-500/30' : 'border-gray-800'} rounded-xl`}>
    <div className="p-6 border-b border-gray-800">
      <h2 className={`text-xl font-semibold flex items-center gap-3 ${isDangerZone ? 'text-red-400' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const ToggleSwitch = ({ id, checked, onChange, label }) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="text-sm text-gray-300">{label}</label>
    <div className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" id={id} className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00C4CC]"></div>
    </div>
  </div>
);

// --- Main Settings Component ---
const Settings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: 'recruiters',
    resumeDownload: true,
    emailAlerts: true,
    smsAlerts: false,
    pushAlerts: true,
    notificationFrequency: 'instant',
    theme: 'dark',
    language: 'english',
  });

  const handleToggleChange = (e) => {
    const { id, checked } = e.target;
    setSettings(prev => ({ ...prev, [id]: checked }));
  };
  
  const handleRadioChange = (name, value) => {
    setSettings(prev => ({...prev, [name]: value}));
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      alert("Account deletion initiated.");
    }
  };

  return (
    <div className="lg:ml-64 p-6 pt-20 lg:pt-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Control your account, privacy, preferences, and appearance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          <SettingsSection title={<><User size={20}/> Account Settings</>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                  <input type="email" defaultValue="omkar.shewale@example.com" className="w-full p-2 bg-gray-800 rounded-md border border-gray-700"/>
              </div>
              <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full p-2 bg-gray-800 rounded-md border border-gray-700"/>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 flex items-center gap-2"><Lock size={14}/> Change Password</button>
              <button className="px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700">Manage Linked Accounts</button>
              <button className="px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 flex items-center gap-2"><LogOut size={14}/> Logout from all devices</button>
            </div>
          </SettingsSection>

          <SettingsSection title={<><Bell size={20}/> Notification Preferences</>}>
            <ToggleSwitch id="emailAlerts" label="Email Alerts" checked={settings.emailAlerts} onChange={handleToggleChange} />
            <ToggleSwitch id="smsAlerts" label="SMS Alerts" checked={settings.smsAlerts} onChange={handleToggleChange} />
            <ToggleSwitch id="pushAlerts" label="App Push Notifications" checked={settings.pushAlerts} onChange={handleToggleChange} />
            <div className="pt-4 border-t border-gray-800">
              <label className="block text-sm text-gray-400 mb-2">Frequency</label>
              <div className="flex flex-wrap gap-2">
                {['Instant', 'Daily Digest', 'Weekly Summary'].map(freq => (
                  <button key={freq} onClick={() => handleRadioChange('notificationFrequency', freq.toLowerCase().replace(' ', '-'))} className={`px-3 py-1.5 text-sm rounded-full transition-colors ${settings.notificationFrequency === freq.toLowerCase().replace(' ', '-') ? 'bg-[#00C4CC] text-gray-900 font-semibold' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title={<><Cog size={20}/> System Settings</>}>
             <div>
                <label className="block text-sm text-gray-400 mb-1">Language Preference</label>
                <select className="w-full sm:w-1/2 p-2 bg-gray-800 rounded-md border border-gray-700">
                  <option>English (United States)</option>
                  <option>Hindi (हिन्दी)</option>
                  <option>Marathi (मराठी)</option>
                </select>
            </div>
            <button className="px-4 py-2 text-sm bg-gray-800 rounded-lg hover:bg-gray-700 flex items-center gap-2"><Download size={14}/> Download All My Data</button>
          </SettingsSection>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          <SettingsSection title={<><Shield size={20}/> Privacy & Permissions</>}>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Profile Visibility</label>
              <div className="space-y-2">
                <div className="flex items-center"><input type="radio" name="visibility" id="vis-faculty" className="w-4 h-4 accent-[#00C4CC] bg-gray-700"/><label htmlFor="vis-faculty" className="ml-2 text-sm">Faculty Only</label></div>
                <div className="flex items-center"><input type="radio" name="visibility" id="vis-recruiters" defaultChecked className="w-4 h-4 accent-[#00C4CC] bg-gray-700"/><label htmlFor="vis-recruiters" className="ml-2 text-sm">Visible to Recruiters</label></div>
                <div className="flex items-center"><input type="radio" name="visibility" id="vis-private" className="w-4 h-4 accent-[#00C4CC] bg-gray-700"/><label htmlFor="vis-private" className="ml-2 text-sm">Private</label></div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <ToggleSwitch id="resumeDownload" label="Allow Recruiters to Download CV" checked={settings.resumeDownload} onChange={handleToggleChange}/>
            </div>
          </SettingsSection>

          <SettingsSection title={<><Sun size={20}/> Theme & Display</>}>
            <div className="flex justify-around p-2 bg-gray-800 rounded-full">
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors"><Moon size={18}/></button>
              <button className="p-2 rounded-full bg-[#00C4CC] text-gray-900 transition-colors"><Sun size={18}/></button>
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors"><Monitor size={18}/></button>
            </div>
          </SettingsSection>

          <SettingsSection title={<><AlertTriangle size={20}/> Danger Zone</>} isDangerZone={true}>
            <p className="text-sm text-gray-400">Be careful with these actions as they can be permanent.</p>
            <div className="flex flex-col gap-3">
              <button className="w-full py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30">Deactivate Account</button>
              <button onClick={handleDeleteAccount} className="w-full py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">Delete Account Permanently</button>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
};

export default Settings;