import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

// Main Layout Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Top-Level Page Components
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import LearningHub from './components/LearningHub';
import Logbook from './components/Logbook';
import Settings from './components/Settings';
import HelpPage from './components/HelpPage';
import CommunityPage from './components/CommunityPage';
import Applications from './components/Applications';
import LearningPathDetailPage from './components/LearningPathDetailPage';

// Profile Page Components
import ProfileLayout from './components/profile/ProfileLayout';
import ProfilePage from './components/profile/ProfilePage';
import ResumePage from './components/profile/ResumePage';
import ScorecardPage from './components/profile/ScorecardPage';
import DocumentsPage from './components/profile/DocumentsPage';

// Internships Page Components
import InternshipsLayout from './components/internships/InternshipsLayout';
import AllInternshipsPage from './components/internships/AllInternshipsPage';
import InternshipDrivesPage from './components/internships/InternshipDrivesPage';
import InternshipInvitesPage from './components/internships/InternshipInvitesPage';
import MyInternshipsPage from './components/internships/MyInternshipsPage';
import MyApplicationsPage from './components/internships/MyApplicationsPage';

// AI Hub Page Components
import AIHubLayout from './components/ai/AIHubLayout';
import AdvisorPage from './components/ai/AdvisorPage';
import MockInterviewPage from './components/ai/MockInterviewPage';
import ResumeBuilderPage from './components/ai/ResumeBuilderPage';

// This is the main layout for all pages when a user is signed in.
const ProtectedAppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-bg dark:bg-dark-bg text-text dark:text-dark-text">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* FIXED: Removed lg:ml-64 from this central layout. */}
      {/* NOTE: You must now add lg:ml-64 to the root div of each individual page component. */}
      <div className="flex-1 flex flex-col">
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="pt-16 flex-grow">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg dark:bg-dark-bg text-text-secondary dark:text-dark-text-secondary">
        Loading...
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in/*" element={<Navigate to="/" replace />} />
      <Route path="/sign-up/*" element={<Navigate to="/" replace />} />

      {isSignedIn && (
        <Route element={<ProtectedAppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning-hub" element={<LearningHub />} /> 
          <Route path="/applications" element={<Applications />} />
          <Route path="/logbook" element={<Logbook />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/learning-hub/:pathId" element={<LearningPathDetailPage />} />
          
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="scorecard" element={<ScorecardPage />} />
            <Route path="documents" element={<DocumentsPage />} />
          </Route>

          <Route path="/internships" element={<InternshipsLayout />}>
              <Route index element={<AllInternshipsPage />} />
              <Route path="drives" element={<InternshipDrivesPage />} />
              <Route path="invites" element={<InternshipInvitesPage />} />
              <Route path="my-internships" element={<MyInternshipsPage />} />
              <Route path="applications" element={<MyApplicationsPage />} />
          </Route>
          
          <Route path="/ai-advisor" element={<AIHubLayout />}>
            <Route index element={<AdvisorPage />} />
            <Route path="mock-interview" element={<MockInterviewPage />} />
            <Route path="resume-builder" element={<ResumeBuilderPage />} />
          </Route>

        </Route>
      )}

      <Route path="*" element={<Navigate to={isSignedIn ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
};

export default App;