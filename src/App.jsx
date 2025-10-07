import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Skills from './components/Skills';
import Applications from './components/Applications';
import Internships from './components/Internships';
import AIAdvisor from './components/AIAdvisor';
import Logbook from './components/Logbook';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { useUser } from '@clerk/clerk-react';

// Protected layout for signed-in users
const ProtectedAppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Navbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
       <main className=" lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
};

const App = () => {
  const { isSignedIn, isLoaded } = useUser();

  // Wait for Clerk to resolve session
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public: Home */}
      <Route path="/" element={<Home />} />

      {/* Force standalone sign-in/up routes back to Home (we use modal on Home) */}
      <Route path="/sign-in/*" element={<Navigate to="/" replace />} />
      <Route path="/sign-up/*" element={<Navigate to="/" replace />} />

      {/* Protected routes */}
      {isSignedIn && (
        <Route element={<ProtectedAppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/ai-advisor" element={<AIAdvisor />} />
          <Route path="/logbook" element={<Logbook />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      )}

      {/* Catch-all: if authed go dashboard, else go home */}
      <Route path="*" element={<Navigate to={isSignedIn ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
};

export default App;