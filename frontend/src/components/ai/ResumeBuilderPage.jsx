import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useProfileData } from '../profile/useProfileData'; // Adjust path if needed
import { Wand2, Loader2, Download, Bot, Sparkles, FileText, Briefcase, GraduationCap, Award, Lightbulb, Check, Key } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Resume Template Component (using the 'Modern' style) ---
const ModernTemplate = ({ resumeData, user, keywords = [] }) => {
    const highlightKeywords = (text) => {
        if (!text || keywords.length === 0) return text;
        const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
        return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    };
    
    return (
        <div className="p-8 text-sm bg-white text-gray-800 font-sans">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-wider text-gray-800">{resumeData.fullName}</h1>
                <p className="text-md mt-2 text-primary font-semibold">{resumeData.title}</p>
                <div className="flex justify-center items-center gap-4 text-xs mt-3 text-gray-600">
                    <span>{resumeData.contact.email}</span>|<span>{resumeData.contact.phone}</span>|<span>{resumeData.location}</span>
                </div>
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-1 mb-2">SUMMARY</h3>
                    <p className="text-xs text-gray-600" dangerouslySetInnerHTML={{ __html: highlightKeywords(resumeData.aboutMe) }} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-1 mb-2">WORK EXPERIENCE</h3>
                    {resumeData.workExperience.map((exp, i) => (
                        <div key={i} className="mt-2"><h4 className="font-bold">{exp.title}</h4><p className="text-sm font-semibold text-accent">{exp.company} | {exp.dates}</p><p className="text-xs mt-1 text-gray-600" dangerouslySetInnerHTML={{ __html: highlightKeywords(exp.description) }}></p></div>
                    ))}
                </div>
                 <div>
                    <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-1 mb-2">PROJECTS</h3>
                    {resumeData.projects.map((proj, i) => <div key={i} className="mt-2"><h4 className="font-bold">{proj.name}</h4><p className="text-xs mt-1 text-gray-600" dangerouslySetInnerHTML={{ __html: highlightKeywords(proj.description) }}></p></div>)}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-1 mb-2">EDUCATION</h3>
                    {resumeData.education.map((edu, i) => <div key={i} className="mt-2"><h4 className="font-bold">{edu.institution}</h4><p className="text-sm text-accent">{edu.degree} in {edu.field}</p><p className="text-xs text-gray-600">{edu.dates}</p></div>)}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-primary border-b-2 border-primary pb-1 mb-2">SKILLS</h3>
                    <p className="text-sm text-gray-700 mt-1">{resumeData.skills.map(s => s.name).join(' • ')}</p>
                </div>
            </div>
        </div>
    );
};

// --- Main Resume Builder Page Component ---
const ResumeBuilderPage = () => {
    const { profileData, user, isLoaded } = useProfileData();
    const [resumeData, setResumeData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [keywords, setKeywords] = useState('');
    const resumePreviewRef = useRef(null);
    
    useEffect(() => {
        if (profileData && user) {
            setResumeData({ ...profileData, fullName: user.fullName });
        }
    }, [profileData, user]);
    
    const handleDownloadPDF = () => { /* ... PDF generation logic ... */ };
    
    const handleAISuggest = (fieldName, section, index) => {
        // Mock AI suggestions
        const suggestions = {
            aboutMe: "Results-oriented Full Stack Developer with a passion for creating dynamic, user-friendly web applications. Proficient in React and Node.js, with experience in building and deploying scalable solutions.",
            description: "Led the development of a key feature using React, resulting in a 15% increase in user engagement. Collaborated with a team of 4 to refactor the backend API, improving response times by 30%."
        };

        if (section) { // For list items like work experience
            const updatedList = resumeData[section].map((item, i) => i === index ? { ...item, [fieldName]: suggestions[fieldName] } : item);
            setResumeData(prev => ({ ...prev, [section]: updatedList }));
        } else { // For top-level fields like aboutMe
            setResumeData(prev => ({ ...prev, [fieldName]: suggestions[fieldName] }));
        }
    };
    
    if (!isLoaded || !resumeData) {
        return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-primary" size={32}/></div>;
    }

    const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
    const foundKeywords = new Set(keywordList.filter(k => JSON.stringify(resumeData).toLowerCase().includes(k.toLowerCase())));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Column: Controls */}
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-surface dark:bg-dark-surface p-4 rounded-xl border border-border dark:border-dark-border shadow-sm">
                    <h3 className="font-semibold text-lg text-text dark:text-dark-text mb-4">AI Resume Builder</h3>
                    <button onClick={handleDownloadPDF} disabled={isDownloading} className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/30">
                        {isDownloading ? <Loader2 className="animate-spin"/> : <Download size={16}/>}
                        {isDownloading ? "Generating..." : "Download as PDF"}
                    </button>
                </div>

                <div className="bg-surface dark:bg-dark-surface p-4 rounded-xl border border-border dark:border-dark-border shadow-sm">
                    <h3 className="font-semibold text-lg text-text dark:text-dark-text mb-2 flex items-center gap-2"><Key size={16} className="text-warning"/> Keyword Analysis</h3>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-2">Paste keywords from a job description (comma-separated) to see how well you match.</p>
                    <textarea value={keywords} onChange={e => setKeywords(e.target.value)} rows="3" placeholder="e.g., react, node.js, agile..." className="w-full text-sm p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border focus:border-accent outline-none"></textarea>
                    <div className="mt-2">
                        <h4 className="text-xs font-semibold mb-1">Matching Keywords:</h4>
                        <div className="flex flex-wrap gap-1">
                            {keywordList.map(k => (
                                <span key={k} className={`text-xs px-2 py-0.5 rounded-full ${foundKeywords.has(k) ? 'bg-success/20 text-success' : 'bg-danger/10 text-danger'}`}>{k}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-surface dark:bg-dark-surface p-4 rounded-xl border border-border dark:border-dark-border shadow-sm">
                    <h3 className="font-semibold text-lg text-text dark:text-dark-text mb-2">Edit Content</h3>
                    {/* Simplified editing for demonstration. You can expand this like the ProfilePage */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Summary</label>
                        <div className="relative">
                            <textarea value={resumeData.aboutMe} onChange={e => setResumeData({...resumeData, aboutMe: e.target.value})} rows="4" className="w-full text-sm p-2 bg-bg dark:bg-dark-border rounded-md border border-border dark:border-dark-border focus:border-accent outline-none pr-10"/>
                            <button onClick={() => handleAISuggest('aboutMe')} className="absolute top-2 right-2 p-1 text-primary hover:bg-primary/10 rounded-full" title="AI Suggest"><Sparkles size={16}/></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="lg:col-span-3">
                <div ref={resumePreviewRef} className="bg-white text-gray-800 rounded-lg overflow-y-auto shadow-2xl aspect-[1/1.414]">
                    <ModernTemplate resumeData={resumeData} user={user} keywords={keywordList}/>
                </div>
            </div>
        </div>
    );
};

export default ResumeBuilderPage;