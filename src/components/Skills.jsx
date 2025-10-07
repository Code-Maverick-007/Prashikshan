// src/pages/Skills.jsx (Completely Refactored)

import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Download, BookOpen, Target, Search, Award, Edit, Loader2 } from 'lucide-react';
import SkillProgress from '../components/SkillProgress';

// --- Helper Function to Assign Colors to Categories ---
const getCategoryColor = (category) => {
  const colors = {
    'Technical': '#00C4CC',
    'Management': '#F59E0B',
    'Marketing': '#10B981',
    'Soft Skills': '#8B5CF6',
    'Business': '#6B7280',
    'Design': '#EC4899',
  };
  return colors[category] || '#A1A1AA'; // Return a color or a default gray
};

// --- New Component for New Users ---
const CompleteProfilePrompt = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-xl min-h-[60vh]">
      <Edit size={48} className="text-cyan-400 mb-4" />
      <h1 className="text-3xl lg:text-4xl font-bold text-white">Your Skill Hub is Ready!</h1>
      <p className="text-lg text-gray-400 mt-3 max-w-2xl">
        First, let's add your skills to your profile. Your progress will appear here automatically.
      </p>
      <button
        onClick={() => navigate('/profile')}
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#00C4CC] px-6 py-3 text-base font-semibold text-gray-900 shadow-lg hover:bg-cyan-300 transition-transform hover:scale-105"
      >
        <Edit size={20} />
        Complete Your Profile
      </button>
    </div>
  );
};


// --- Refactored Sub-Components to handle Empty States ---

const LearningModules = ({ modules }) => (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2"><BookOpen size={20} className="text-[#00C4CC]" /> Pre-Internship Learning Modules</h2>
        {modules.length > 0 ? (
            <div className="space-y-4"> {/* ... Mapping logic from your original code ... */} </div>
        ) : (
            <p className="text-gray-500 text-center py-4">No learning modules available yet.</p>
        )}
    </div>
);

const AssessmentAndCertification = ({ assessments, certifications }) => (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2"><Award size={20} className="text-yellow-400" /> Assessments & Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-base font-semibold text-gray-400 mb-3">Recent Assessments</h3>
                {assessments.length > 0 ? (
                    assessments.map((a, index) => ( <div key={index} className="flex justify-between items-center p-3 mb-2 bg-gray-800/50 rounded-lg">{/* ... Assessment item JSX ... */}</div> ))
                ) : (
                    <p className="text-gray-500 text-sm py-2">No assessments completed.</p>
                )}
            </div>
            <div>
                <h3 className="text-base font-semibold text-gray-400 mb-3">Earned Certifications</h3>
                {certifications.length > 0 ? (
                    certifications.map((c, index) => ( <div key={index} className="flex justify-between items-center p-3 mb-2 bg-gray-800/50 rounded-lg border-l-4 border-yellow-500">{/* ... Certification item JSX ... */}</div> ))
                ) : (
                    <p className="text-gray-500 text-sm py-2">No certifications earned.</p>
                )}
            </div>
        </div>
    </div>
);

// --- MAIN SKILLS COMPONENT ---

const Skills = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white lg:ml-64">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  // Get skills from Clerk user metadata, default to empty array
  const userSkills = user?.publicMetadata?.skills || [];
  
  // If user has no skills, show the prompt to complete their profile
  if (userSkills.length === 0) {
    return (
      <div className="pt-16 p-4 lg:pt-6 lg:p-10 lg:ml-64 min-h-screen bg-gray-900 text-white">
        <CompleteProfilePrompt />
      </div>
    );
  }

  // --- Data Transformation and Mock Data ---

  // Transform profile skills into the format needed for the SkillProgress component
  const skillModules = userSkills.map(skill => ({
    name: skill.name,
    progress: skill.level,
    category: skill.category,
    color: getCategoryColor(skill.category),
  }));

  // DYNAMICALLY get unique categories from user's skills for the Readiness widget
  const uniqueCategories = [...new Set(skillModules.map(skill => skill.category).filter(Boolean))];

  // Mock data for other sections (as requested)
  const trainingModules = [ /* ... Your mock data ... */ ];
  const assessments = [ /* ... Your mock data ... */ ];
  const certifications = [ /* ... Your mock data ... */ ];
  const aiRecommendations = [ /* ... Your mock data ... */ ];

  return (
    <div className="space-y-4 lg:space-y-6 pt-16 p-4 lg:pt-6 lg:p-10 lg:ml-64 min-h-screen bg-gray-900 text-white">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Skill Readiness Hub</h1>
        <p className="text-sm sm:text-base text-gray-400">Your dynamically updated skills and learning progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Skill Progress Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {skillModules.map((skill, index) => (
                        <SkillProgress key={index} {...skill} />
                    ))}
                </div>
            </div>
            <LearningModules modules={trainingModules} />
            <AssessmentAndCertification assessments={assessments} certifications={certifications} />
        </div>

        <div className="lg:col-span-1 space-y-4 lg:space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Overall Readiness</h2>
                {/* FIX: This widget is now fully dynamic */}
                {uniqueCategories.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                      {uniqueCategories.map((category, index) => {
                          const categorySkills = skillModules.filter(skill => skill.category === category);
                          const avgProgress = categorySkills.length > 0
                              ? categorySkills.reduce((sum, skill) => sum + skill.progress, 0) / categorySkills.length
                              : 0;
                          return (
                              <div key={index} className="text-center p-3 bg-gray-800/50 rounded-lg">
                                  <h3 className="font-medium text-sm mb-2">{category}</h3>
                                  <div className="text-xl font-bold mb-1" style={{color: getCategoryColor(category)}}>
                                      {Math.round(avgProgress)}%
                                  </div>
                                  <p className="text-gray-400 text-xs">{categorySkills.length} skill{categorySkills.length !== 1 && 's'}</p>
                              </div>
                          );
                      })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Add skills with categories in your profile to see a summary.</p>
                )}
            </div>
            {/* ... Other sidebar widgets like AIRecommendations ... */}
        </div>
      </div>
    </div>
  );
};

export default Skills;