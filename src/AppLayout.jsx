import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Adjust path if needed
import Navbar from './components/Navbar';   // Adjust path if needed

const AppLayout = () => {
  // This state now lives in the parent, controlling the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // Manage active tab state here

  // This function will be passed to the Navbar to open the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="lg:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="pt-16"> {/* Add padding top to avoid content being hidden by the fixed navbar */}
          <Outlet /> {/* This is where your pages like Dashboard, Profile, etc., will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;