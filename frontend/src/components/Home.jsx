import React from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Bot, Search, BookText, Star, FileText, Briefcase, Award } from 'lucide-react';
import Footer from './Footer'; // Assuming Footer is in the same components directory

// --- Self-Contained Components for the Homepage ---

// A dedicated Navbar for the landing page
const HomeNavbar = ({ handleGetStarted }) => (
    <header className="fixed top-0 left-0 right-0 z-30 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-lg border-b border-border dark:border-dark-border">
        <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
                <svg className="h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                <span className="text-xl font-bold text-text dark:text-dark-text">Prashikshan</span>
            </Link>
            <div className="flex items-center gap-4">
                <a href="#features" className="hidden sm:block text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-white">Features</a>
                <button onClick={handleGetStarted} className="px-4 py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm shadow-primary/30">
                    Go to Dashboard
                </button>
            </div>
        </nav>
    </header>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className={`mb-4 inline-block p-3 rounded-lg ${color.bg}`}>
            <Icon size={24} className={color.text} />
        </div>
        <h3 className="font-bold text-lg text-text dark:text-dark-text">{title}</h3>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">{description}</p>
    </div>
);

const TestimonialCard = ({ quote, name, title, avatar }) => (
    <div className="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border shadow-sm">
        <div className="flex text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
        </div>
        <p className="text-text/90 dark:text-dark-text/90">"{quote}"</p>
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border dark:border-dark-border">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-semibold text-text dark:text-dark-text">{name}</p>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{title}</p>
            </div>
        </div>
    </div>
);

// --- Main Home Page Component ---
const Home = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard');
    } else {
      openSignIn({ afterSignInUrl: '/dashboard', afterSignUpUrl: '/dashboard' });
    }
  };

  const features = [
      { icon: Bot, title: "AI Career Advisor", description: "Get personalized guidance on career paths, skills, and interview preparation from our advanced AI.", color: { bg: 'bg-primary/10', text: 'text-primary'} },
      { icon: Search, title: "Smart Internship Matching", description: "Discover relevant internship opportunities from top companies and government organizations.", color: { bg: 'bg-accent/10', text: 'text-accent'} },
      { icon: BookText, title: "NEP-Compliant Logbook", description: "Maintain a digital logbook of your internship activities, compliant with national education policies.", color: { bg: 'bg-success/10', text: 'text-success'} },
      { icon: FileText, title: "AI Resume Reviewer", description: "Receive instant feedback on your resume to improve its effectiveness and ATS compatibility.", color: { bg: 'bg-warning/10', text: 'text-warning'} }
  ];
  
  const testimonials = [
      { quote: "Prashikshan's AI Coach was a game-changer for my interview preparation. I felt more confident than ever before.", name: "Priya Singh", title: "Student, IIT Delhi", avatar: "https://i.pravatar.cc/150?u=priya" },
      { quote: "The logbook feature made tracking my internship hours and tasks incredibly simple and organized. Highly recommended!", name: "Rohan Kumar", title: "B.Tech CSE, NIT Warangal", avatar: "https://i.pravatar.cc/150?u=rohan" },
      { quote: "I found my dream internship through this platform. The matching algorithm is incredibly accurate.", name: "Aisha Khan", title: "B.Com, University of Mumbai", avatar: "https://i.pravatar.cc/150?u=aisha" }
  ];

  return (
    <div className="bg-bg dark:bg-dark-bg text-text dark:text-dark-text">
      <HomeNavbar handleGetStarted={handleGetStarted} />
      
      <main>
        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-bg to-accent-50/50 dark:from-dark-bg dark:via-primary-900/20 dark:to-dark-bg z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.2)_0%,_transparent_60%)] z-0"></div>
          
          <div className="relative z-10 w-full max-w-4xl mx-auto text-center p-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight text-text dark:text-dark-text">
              Empowering India's Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI-Driven Career Guidance</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto">
              Prashikshan is your all-in-one platform for skill development, internship matching, and career progression, aligned with national educational standards.
            </p>
            <div className="mt-8 flex justify-center">
              <button onClick={handleGetStarted} className="group flex items-center gap-2 bg-primary text-white font-semibold py-3 px-8 rounded-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 shadow-lg shadow-primary/30">
                Get Started for Free
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text dark:text-dark-text">A Suite of Powerful Tools</h2>
                    <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">Everything you need to get industry-ready and launch your career.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
                </div>
            </div>
        </section>

        {/* --- Testimonials Section --- */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-bg dark:bg-dark-surface/30">
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text dark:text-dark-text">Success Stories from Students</h2>
                    <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">Don't just take our word for it. Here's what users are saying.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map(testimonial => <TestimonialCard key={testimonial.name} {...testimonial} />)}
                </div>
            </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;