import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter } from 'lucide-react';

// --- The Logo is now a self-contained React component ---
const LogoIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
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


const Footer = () => {
    const quickLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Internships', path: '/internships' },
        { name: 'Profile', path: '/profile' },
        { name: 'Help & Support', path: '/help' },
    ];

    const companyLinks = [
        { name: 'About Us', path: '#' },
        { name: 'Contact', path: '#' },
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
    ];

    return (
        <footer className="bg-bg dark:bg-dark-bg border-t border-border dark:border-dark-border lg:ml-64">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Logo and Mission */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-3">
                            <LogoIcon className="h-8 w-8 text-accent" />
                            <span className="text-text dark:text-dark-text text-lg font-bold">Prashikshan</span>
                        </div>
                        <p className="mt-4 text-sm text-text-secondary dark:text-dark-text-secondary">
                            Bridging the gap between academia and industry for the next generation of professionals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-text/90 dark:text-dark-text/90 tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-base text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-text/90 dark:text-dark-text/90 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <a href={link.path} className="text-base text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-sm font-semibold text-text/90 dark:text-dark-text/90 tracking-wider uppercase">Connect</h3>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors"><span className="sr-only">LinkedIn</span><Linkedin size={20} /></a>
                            <a href="#" className="text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors"><span className="sr-only">GitHub</span><Github size={20} /></a>
                            <a href="#" className="text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors"><span className="sr-only">Twitter</span><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-border dark:border-dark-border pt-8 text-center">
                    <p className="text-base text-text-secondary/80 dark:text-dark-text-secondary/80">&copy; 2025 Prashikshan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;