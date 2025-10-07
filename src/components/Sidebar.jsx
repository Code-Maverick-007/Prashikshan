import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Target, 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Calendar,
  User,
  LogOut,
  Book,
  Bell,
  HelpCircle,
  Settings
} from 'lucide-react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
    { id: 'skills', icon: Target, label: 'Skills', path: '/skills' },
    { id: 'applications', icon: FileText, label: 'Applications', path: '/applications' },
    { id: 'internships', icon: Briefcase, label: 'Internships', path: '/internships' },
    { id: 'ai-advisor', icon: MessageSquare, label: 'AI Advisor', path: '/ai-advisor' },
    { id: 'logbook', icon: Book, label: 'Logbook & Report', path: '/logbook' },
    { id: 'notifications', icon: Bell, label: 'Notifications & Alerts', path: '/notifications' },
    { id: 'profile', icon: User, label: 'Profile & Resume Builder', path: '/profile' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', path: '/help' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

    
      {/* Desktop sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 w-64 z-40 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:border-r lg:border-gray-800`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800 lg:py-6">
            <h1 className="text-xl font-bold text-white">Prashiskshan</h1>
          </div>
          
          <nav className="flex-1 p-3">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (window.innerWidth < 1024) setIsOpen(false);
                      }}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-[#00C4CC] text-gray-900 font-semibold'
                          : 'text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* User section at bottom */}
          <div className="mt-auto pt-4 border-t border-gray-800 p-4">
            <SignedIn>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Return to Home after sign out */}
                  <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8' } }} afterSignOutUrl="/" />
                  <span className="text-sm text-gray-300">Signed in</span>
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/dashboard">
                <button className="w-full bg-[#00C4CC] text-gray-900 font-semibold py-2 rounded-md">Sign in</button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;