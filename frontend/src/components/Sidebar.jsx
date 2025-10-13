import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Target, 
  Briefcase, 
  MessageSquare, 
  Book,
  User,
  Users,
  HelpCircle,
  Settings
} from 'lucide-react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const LogoIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z"/>
    <path d="M22 10v6"/>
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
  </svg>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
    { id: 'learning-hub', icon: Target, label: 'Learning Hub', path: '/learning-hub' },
    { id: 'internships', icon: Briefcase, label: 'Internships', path: '/internships' },
    { id: 'ai-advisor', icon: MessageSquare, label: 'AI Coach', path: '/ai-advisor' },
    { id: 'logbook', icon: Book, label: 'Logbook & Report', path: '/logbook' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    { id: 'community', icon: Users, label: 'Community', path: '/community' },
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

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 dark:bg-dark-surface w-64 z-40 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:border-r lg:border-border lg:dark:border-dark-border`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center  gap-2 px-8 py-4 border-b border-border dark:border-dark-border">
            {/* UPDATED: Increased logo size, kept text size the same */}
            <LogoIcon className="h-35 w-35 text-accent" />
            <span className="text-text dark:text-dark-text text-2xl font-bold">Prashikshan</span>
          </div>
          
          <nav className="flex-1 p-3">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) setIsOpen(false);
                      }}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-accent text-text font-semibold'
                          : 'text-text-secondary dark:text-dark-text-secondary hover:bg-bg dark:hover:bg-dark-border'
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
          <div className="mt-auto pt-4 border-t border-border dark:border-dark-border p-4">
            <SignedIn>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8' } }} afterSignOutUrl="/" />
                  <span className="text-sm text-text/90 dark:text-dark-text/90">Signed in</span>
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/dashboard">
                <button className="w-full bg-accent text-text font-semibold py-2 rounded-md transition-colors hover:bg-accent-dark">Sign in</button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;