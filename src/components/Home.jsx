import React from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // 1. Import hooks to check auth state and to navigate
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser(); // 2. Get the signed-in state
  const navigate = useNavigate();   //    and the navigate function

  // 3. Create a smart handler function
  const handleGetStarted = () => {
    if (isSignedIn) {
      // If the user is signed in, navigate them to the dashboard
      navigate('/dashboard');
    } else {
      // If they are not signed in, open the sign-in modal
      openSignIn({ afterSignInUrl: '/dashboard', afterSignUpUrl: '/dashboard' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      {/* Animated dot-grid background */}
      <div className="absolute inset-0 animated-grid-background z-0"></div>
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(13,17,23,0)_0%,_#0D1117_80%)]"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center p-4">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 tracking-tight bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Unleash the Power of AI with Prashikshan
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Your all-in-one platform to track skills, manage applications, and accelerate your career with AI-powered insights.
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            // 4. Attach the new handler to the button
            onClick={handleGetStarted}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-lg shadow-purple-500/20"
          >
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;