import React, { useState, useRef } from 'react';
import { useProfileData } from './useProfileData';
import { Loader2, Download, UploadCloud, Palette, X } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Color Scheme Definitions (for resume content, not UI theme) ---
const colorSchemes = {
    cyan: { text: 'text-cyan-800', border: 'border-cyan-800', accent: 'text-cyan-700' },
    blue: { text: 'text-blue-800', border: 'border-blue-800', accent: 'text-blue-700' },
    graphite: { text: 'text-gray-800', border: 'border-gray-800', accent: 'text-gray-700' },
};

// --- Helper: Modal for Uploading ---
const UploadResumeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-surface dark:bg-dark-surface rounded-xl p-6 w-full max-w-md border border-border dark:border-dark-border" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">Upload & Parse Resume</h3>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">This feature is coming soon! It will allow you to upload a PDF and automatically fill out your profile sections.</p>
                <div className="p-8 border-2 border-dashed border-border dark:border-dark-border rounded-lg text-center">
                    <UploadCloud size={32} className="mx-auto text-text-secondary dark:text-dark-text-secondary"/>
                    <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">Drag & drop your file here or click to browse</p>
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-text/90 dark:text-dark-text/90 rounded-lg hover:bg-bg dark:hover:bg-dark-border transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

// --- Helper: Visual Preview for Templates ---
const TemplatePreview = ({ type, onClick, isSelected }) => {
    return (
        <button onClick={onClick} className={`p-2 rounded-lg border-2 transition-colors ${isSelected ? 'border-accent' : 'border-border dark:border-dark-border hover:border-text-secondary/50 dark:hover:border-dark-text-secondary/50'}`}>
            <div className="w-full h-16 bg-bg dark:bg-dark-border rounded-sm p-1 flex gap-1">
                {type === 'Modern' && <><div className="w-2/3 h-full bg-border dark:bg-dark-surface rounded-sm"></div><div className="w-1/3 h-full bg-border dark:bg-dark-surface rounded-sm"></div></>}
                {type === 'Minimalist' && <div className="w-full h-full bg-border dark:bg-dark-surface rounded-sm"></div>}
            </div>
            <span className="text-xs mt-2 block font-semibold">{type}</span>
        </button>
    );
};

// --- Resume Template Components (No dark theme applied, for white PDF background) ---
const ModernTemplate = ({ profile, user, sections, colors }) => (
    <div className="p-4 sm:p-8 text-sm">
        <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-wider text-gray-800">{user.fullName}</h1>
            <p className={`text-md mt-2 ${colors.accent} font-semibold`}>{profile.title}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 text-xs mt-3 text-gray-600">
                <span>{profile.contact.email}</span><span className="hidden sm:inline">|</span>
                <span>{profile.contact.phone}</span><span className="hidden sm:inline">|</span>
                <span>{profile.location}</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="md:col-span-2 space-y-6">
                {sections.experience && profile.workExperience?.length > 0 && (
                    <div><h3 className={`text-lg font-bold ${colors.text} border-b-2 ${colors.border} pb-1 mb-2`}>WORK EXPERIENCE</h3>{profile.workExperience.map((exp, i) => <div key={i} className="mt-2"><h4 className="font-bold">{exp.title}</h4><p className={`text-sm font-semibold ${colors.accent}`}>{exp.company} | {exp.dates}</p><p className="text-xs mt-1 text-gray-600">{exp.description}</p></div>)}</div>
                )}
                {sections.projects && profile.projects?.length > 0 && (
                    <div><h3 className={`text-lg font-bold ${colors.text} border-b-2 ${colors.border} pb-1 mb-2`}>PROJECTS</h3>{profile.projects.map((proj, i) => <div key={i} className="mt-2"><h4 className="font-bold">{proj.name}</h4><p className="text-xs mt-1 text-gray-600">{proj.description}</p></div>)}</div>
                )}
            </div>
            <div className="md:col-span-1 space-y-6">
                {sections.education && profile.education?.length > 0 && (
                    <div><h3 className={`text-lg font-bold ${colors.text} border-b-2 ${colors.border} pb-1 mb-2`}>EDUCATION</h3>{profile.education.map((edu, i) => <div key={i} className="mt-2"><h4 className="font-bold">{edu.institution}</h4><p className={`text-sm ${colors.accent}`}>{edu.degree}</p><p className="text-xs text-gray-600">{edu.dates}</p></div>)}</div>
                )}
                {sections.skills && profile.skills?.length > 0 && (
                    <div><h3 className={`text-lg font-bold ${colors.text} border-b-2 ${colors.border} pb-1 mb-2`}>SKILLS</h3><ul className="list-disc list-inside text-sm text-gray-700">{profile.skills.map((skill, i) => <li key={i}>{skill.name}</li>)}</ul></div>
                )}
                 <div><h3 className={`text-lg font-bold ${colors.text} border-b-2 ${colors.border} pb-1 mb-2`}>LINKS</h3><div className="text-sm space-y-1"><p><a href={profile.contact.linkedin} className={colors.accent}>LinkedIn</a></p><p><a href={profile.contact.github} className={colors.accent}>GitHub</a></p></div></div>
            </div>
        </div>
    </div>
);
const MinimalistTemplate = ({ profile, user, sections, colors }) => (
    <div className="p-4 sm:p-8 text-sm">
        <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-800">{user.fullName}</h1>
            <p className={`text-md mt-1 ${colors.accent}`}>{profile.title}</p>
        </div>
        <div className="space-y-4">
            {sections.skills && profile.skills?.length > 0 && (
                 <div><h3 className={`text-xs font-bold tracking-widest uppercase ${colors.text}`}>SKILLS</h3><p className="text-sm text-gray-700 mt-1">{profile.skills.map(s => s.name).join(' • ')}</p></div>
            )}
             {sections.experience && profile.workExperience?.length > 0 && (
                <div><h3 className={`text-xs font-bold tracking-widest uppercase ${colors.text}`}>EXPERIENCE</h3>{profile.workExperience.map((exp, i) => <div key={i} className="mt-1"><h4 className="font-semibold">{exp.title} at {exp.company}</h4><p className="text-xs mt-1 text-gray-600">{exp.description}</p></div>)}</div>
            )}
            {sections.education && profile.education?.length > 0 && (
                <div><h3 className={`text-xs font-bold tracking-widest uppercase ${colors.text}`}>EDUCATION</h3>{profile.education.map((edu, i) => <div key={i} className="mt-1"><h4 className="font-semibold">{edu.institution}</h4><p className="text-sm text-gray-700">{edu.degree}, {edu.field} ({edu.dates})</p></div>)}</div>
            )}
        </div>
    </div>
);

// --- Main Resume Page Component ---
const ResumePage = () => {
    const { profileData, user, isLoaded } = useProfileData();
    const [template, setTemplate] = useState('Modern');
    const [colorScheme, setColorScheme] = useState('cyan');
    const [visibleSections, setVisibleSections] = useState({ experience: true, education: true, projects: true, skills: true });
    const [isDownloading, setIsDownloading] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const resumePreviewRef = useRef(null);

    const handleDownloadPDF = () => {
        setIsDownloading(true);
        const input = resumePreviewRef.current;
        html2canvas(input, { scale: 3, useCORS: true, backgroundColor: '#ffffff' }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${user.firstName}-Resume.pdf`);
            setIsDownloading(false);
        });
    };
    
    if (!isLoaded || !profileData) return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-text dark:text-dark-text" /></div>;

    const colors = colorSchemes[colorScheme];

    return (
        <>
            <UploadResumeModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="lg:col-span-1 xl:col-span-1 space-y-6">
                    <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Manage Resume</h3>
                        <div className="space-y-3">
                            <button onClick={() => setIsUploadModalOpen(true)} className="w-full py-2 bg-border dark:bg-dark-border rounded-lg hover:brightness-95 dark:hover:brightness-125 transition flex items-center justify-center gap-2"><UploadCloud size={16}/> Upload & Parse</button>
                            <button onClick={handleDownloadPDF} disabled={isDownloading} className="w-full py-2 bg-accent text-text font-semibold rounded-lg hover:bg-accent-dark flex items-center justify-center gap-2 disabled:opacity-50 transition-colors">{isDownloading ? <Loader2 className="animate-spin"/> : <Download size={16}/>}{isDownloading ? "Generating..." : "Download as PDF"}</button>
                        </div>
                    </div>
                    <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Template</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <TemplatePreview type="Modern" onClick={() => setTemplate('Modern')} isSelected={template === 'Modern'} />
                            <TemplatePreview type="Minimalist" onClick={() => setTemplate('Minimalist')} isSelected={template === 'Minimalist'} />
                        </div>
                    </div>
                     <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4 flex items-center gap-2"><Palette size={16}/> Color Scheme</h3>
                        <div className="flex gap-4">
                           <button onClick={() => setColorScheme('cyan')} className={`w-8 h-8 rounded-full bg-cyan-500 border-2 ${colorScheme === 'cyan' ? 'border-white ring-2 ring-cyan-400' : 'border-transparent'}`}></button>
                           <button onClick={() => setColorScheme('blue')} className={`w-8 h-8 rounded-full bg-blue-500 border-2 ${colorScheme === 'blue' ? 'border-white ring-2 ring-blue-400' : 'border-transparent'}`}></button>
                           <button onClick={() => setColorScheme('graphite')} className={`w-8 h-8 rounded-full bg-gray-500 border-2 ${colorScheme === 'graphite' ? 'border-white ring-2 ring-gray-400' : 'border-transparent'}`}></button>
                        </div>
                    </div>
                    <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Customize Sections</h3>
                        <div className="space-y-3 text-sm">{Object.entries({experience: "Work Experience", education: "Education", projects: "Projects", skills: "Skills"}).map(([key, label]) => (<label key={key} className="flex items-center justify-between cursor-pointer"><span>{label}</span><input type="checkbox" checked={visibleSections[key]} onChange={() => setVisibleSections(s => ({...s, [key]: !s[key]}))} className="h-4 w-4 rounded bg-border dark:bg-dark-border border-border dark:border-dark-border text-accent focus:ring-offset-surface dark:focus:ring-offset-dark-surface focus:ring-accent"/></label>))}</div>
                    </div>
                </div>
                <div className="lg:col-span-2 xl:col-span-3">
                    <div ref={resumePreviewRef} className="bg-white text-gray-800 rounded-lg overflow-y-auto shadow-2xl lg:aspect-[1/1.414]">
                        {template === 'Modern' && <ModernTemplate profile={profileData} user={user} sections={visibleSections} colors={colors} />}
                        {template === 'Minimalist' && <MinimalistTemplate profile={profileData} user={user} sections={visibleSections} colors={colors} />}
                    </div>
                </div>
            </div>
        </>
    );
};
export default ResumePage;