import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
// Import the hook to get profile data
import { useProfileData } from './profile/useProfileData';
import { User, Shield, Bell, Sun, Moon, LogOut, Lock, X, Info, Loader2 } from 'lucide-react';

// --- Reusable Sub-Components ---
const SettingsSection = ({ title, icon, subtitle, children }) => (
    <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl shadow-sm">
        <div className="p-6 border-b border-border dark:border-dark-border">
            <h2 className="text-xl font-semibold flex items-center gap-3 text-text dark:text-dark-text">
                <span className="text-primary">{icon}</span>
                {title}
            </h2>
            {subtitle && <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">{subtitle}</p>}
        </div>
        <div className="p-6 space-y-6">{children}</div>
    </div>
);

const ToggleSwitch = ({ id, checked, onChange, label }) => (
    <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm text-text dark:text-dark-text font-medium">{label}</label>
        <div className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id={id} className="sr-only peer" checked={checked} onChange={onChange} />
            <div className="w-11 h-6 bg-border dark:bg-dark-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
        </div>
    </div>
);

// --- Main Settings Component ---
const Settings = () => {
    const { user } = useUser();
    const { theme, setTheme } = useTheme();
    const { signOut } = useClerk();
    const navigate = useNavigate();
    
    // Fetch the editable profile data
    const { profileData, isLoaded: isProfileLoaded } = useProfileData();

    const [showWelcome, setShowWelcome] = useState(true);
    const [settings, setSettings] = useState(null);

    // Load user-specific settings from localStorage
    useEffect(() => {
        if (user) {
            const savedSettings = localStorage.getItem(`userSettings_${user.id}`);
            if (savedSettings) {
                setSettings(JSON.parse(savedSettings));
            } else {
                setSettings({
                    profileVisibility: 'recruiters',
                    resumeDownload: true,
                    emailAlerts: true,
                    pushAlerts: true,
                });
            }
        }
    }, [user]);

    // Save settings to localStorage when they change
    useEffect(() => {
        if (user && settings) {
            localStorage.setItem(`userSettings_${user.id}`, JSON.stringify(settings));
        }
    }, [settings, user]);
    
    // Sync the visual theme
    useEffect(() => {
      if (settings?.theme) {
        setTheme(settings.theme);
      }
    }, [settings?.theme, setTheme]);


    const handleSettingChange = (e) => {
        const { id, checked, name, value, type } = e.target;
        const key = type === 'checkbox' ? id : name;
        const val = type === 'checkbox' ? checked : value;
        setSettings(prev => ({ ...prev, [key]: val }));
    };

    // --- Active Functions ---
    const handleChangePassword = () => {
        // Clerk's <UserProfile /> component is typically mounted at '/user' by default.
        // This navigates to Clerk's secure, pre-built UI for password changes.
        navigate('/user');
    };

    const handleSignOut = () => {
        if (window.confirm("Are you sure you want to sign out?")) {
            signOut(() => navigate('/'));
        }
    };

    // Show a loader while Clerk user, profile data, or settings are loading
    if (!user || !settings || !isProfileLoaded) {
        return <div className="lg:ml-64 p-10 flex justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;
    }

    return (
        <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Settings</h1>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-1">Manage your account, privacy, and preferences.</p>
            </div>

            {showWelcome && (
                <div className="bg-gradient-to-r from-primary-50 to-accent-50/50 dark:from-dark-surface dark:to-accent-900/20 border border-border dark:border-dark-border rounded-xl p-4 flex items-start gap-4">
                    <Info size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-text dark:text-dark-text">Welcome to your Settings!</h3>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Configure your notification and privacy preferences to get the most out of Prashikshan.</p>
                    </div>
                    <button onClick={() => setShowWelcome(false)} className="ml-auto p-1 text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text"><X size={18} /></button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <SettingsSection icon={<User size={20}/>} title="Account">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-text-secondary dark:text-dark-text-secondary mb-1">Email</label>
                                <input type="email" value={user.primaryEmailAddress?.emailAddress || ''} disabled className="w-full p-2 bg-border/50 dark:bg-dark-border/50 rounded-md border border-border dark:border-dark-border text-text-secondary cursor-not-allowed"/>
                            </div>
                            <div>
                                <label className="block text-sm text-text-secondary dark:text-dark-text-secondary mb-1">Phone (from Profile)</label>
                                {/* UPDATED: Fetches phone from your editable profile data. It's disabled here to show it's managed on the Profile page. */}
                                <input type="tel" value={profileData?.contact?.phone || ''} placeholder="Add on Profile page" disabled className="w-full p-2 bg-border/50 dark:bg-dark-border/50 rounded-md border border-border dark:border-dark-border text-text-secondary cursor-not-allowed"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-border dark:border-dark-border">
                            <button onClick={handleChangePassword} className="px-4 py-2 text-sm bg-border dark:bg-dark-border rounded-lg hover:brightness-95 dark:hover:brightness-125 flex items-center gap-2 transition-transform hover:scale-105"><Lock size={14}/> Change Password</button>
                            <button onClick={handleSignOut} className="px-4 py-2 text-sm bg-border dark:bg-dark-border rounded-lg hover:brightness-95 dark:hover:brightness-125 flex items-center gap-2 transition-transform hover:scale-105"><LogOut size={14}/> Sign Out</button>
                        </div>
                    </SettingsSection>

                    <SettingsSection icon={<Bell size={20}/>} title="Notifications">
                        <ToggleSwitch id="emailAlerts" label="New Internship Email Alerts" checked={settings.emailAlerts} onChange={handleSettingChange} />
                        <ToggleSwitch id="pushAlerts" label="Application Status Push Notifications" checked={settings.pushAlerts} onChange={handleSettingChange} />
                    </SettingsSection>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <SettingsSection icon={<Shield size={20}/>} title="Privacy">
                        <div>
                            <label className="block text-sm text-text-secondary dark:text-dark-text-secondary mb-2">Profile Visibility</label>
                            <div className="space-y-2">
                                <div className="flex items-center"><input type="radio" name="profileVisibility" value="recruiters" checked={settings.profileVisibility === 'recruiters'} onChange={handleSettingChange} className="w-4 h-4 text-primary bg-border dark:bg-dark-border focus:ring-primary"/><label className="ml-2 text-sm">Visible to Recruiters</label></div>
                                <div className="flex items-center"><input type="radio" name="profileVisibility" value="private" checked={settings.profileVisibility === 'private'} onChange={handleSettingChange} className="w-4 h-4 text-primary bg-border dark:bg-dark-border focus:ring-primary"/><label className="ml-2 text-sm">Private (Only me)</label></div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-border dark:border-dark-border"><ToggleSwitch id="resumeDownload" label="Allow Resume Download" checked={settings.resumeDownload} onChange={handleSettingChange}/></div>
                    </SettingsSection>
                    
                    <SettingsSection icon={<Sun size={20}/>} title="Theme">
                        <div className="flex justify-around p-1 bg-bg dark:bg-dark-border rounded-full">
                            <button onClick={() => setTheme('light')} className={`w-full p-2 rounded-full flex justify-center items-center gap-2 text-sm font-semibold transition-all ${theme === 'light' ? 'bg-primary text-white shadow-md shadow-primary/30' : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface/50 dark:hover:bg-dark-surface/50'}`}><Sun size={16}/> Light</button>
                            <button onClick={() => setTheme('dark')} className={`w-full p-2 rounded-full flex justify-center items-center gap-2 text-sm font-semibold transition-all ${theme === 'dark' ? 'bg-primary text-white shadow-md shadow-primary/30' : 'text-text-secondary dark:text-dark-text-secondary hover:bg-surface/50 dark:hover:bg-dark-surface/50'}`}><Moon size={16}/> Dark</button>
                        </div>
                    </SettingsSection>
                </div>
            </div>
        </div>
    );
};

export default Settings;