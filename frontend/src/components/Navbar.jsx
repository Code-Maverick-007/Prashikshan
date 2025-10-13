import React from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

// Added the LogoIcon SVG component
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

const Navbar = ({ toggleSidebar }) => {
  const { isSignedIn } = useUser();




return (

// This navbar is hidden on large screens (lg:hidden)

<nav className='lg:hidden fixed top-0 left-0 right-0 z-20 bg-slate-900/80 backdrop-blur-lg border-b border-gray-800'>

<div className='max-w-7xl mx-auto px-4 sm:px-6'>

<div className='flex items-center justify-between h-16'>

{/* Logo */}

<NavLink to={isSignedIn ? "/dashboard" : "/"} className='flex items-center gap-2'>
            <LogoIcon className="h-8 w-8 text-accent" />
            <div className="text-xl font-bold text-white">Prashikshan</div>
          </NavLink>



{/* Right side: UserButton and Hamburger Menu */}

<div className='flex items-center gap-4'>

{isSignedIn && <UserButton afterSignOutUrl="/" />}

<button onClick={toggleSidebar} className="text-slate-300 hover:text-white">

<Menu size={24} />

</button>

</div>

</div>

</div>

</nav>

);

}



export default Navbar;



