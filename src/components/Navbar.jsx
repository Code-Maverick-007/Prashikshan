import React from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const { isSignedIn } = useUser();

  return (
    // This navbar is hidden on large screens (lg:hidden)
    <nav className='lg:hidden fixed top-0 left-0 right-0 z-20 bg-slate-900/80 backdrop-blur-lg border-b border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <NavLink to={isSignedIn ? "/dashboard" : "/"} className='flex items-center'>
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