import React, { useState } from 'react';
import { useProfileData } from './useProfileData';
import { Edit, Save, X, PlusCircle, XCircle, Loader2, MapPin, Briefcase, Award, GraduationCap, Lightbulb, User as UserIcon, Mail, Phone, Github, Linkedin, Dribbble, Globe, UploadCloud, Settings } from 'lucide-react';

// --- Reusable UI Helper Components ---
const SectionCard = ({ title, icon, sectionName, editingSection, setEditingSection, onSave, onCancel, onAddItem, children, hasData, emptyMessage, variant = 'default' }) => {
    const isEditing = editingSection === sectionName;
    const handleSave = () => { onSave(); setEditingSection(null); };
    const handleCancel = () => { onCancel(); setEditingSection(null); };
    
    const cardStyles = {
        default: 'bg-surface dark:bg-dark-surface',
        highlight: 'bg-gradient-to-br from-primary-50/50 to-bg dark:from-dark-surface dark:to-primary-900/20'
    };

    return (
        <div className={`${cardStyles[variant]} border border-border dark:border-dark-border rounded-xl p-4 sm:p-6 shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-text dark:text-dark-text flex items-center gap-3">{icon}{title}</h3>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        {onAddItem && <button onClick={onAddItem} className="p-1 text-accent rounded-full hover:bg-accent/20 transition-colors"><PlusCircle size={20}/></button>}
                        <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1 bg-success/20 text-success text-xs font-semibold rounded-full hover:bg-success/30 transition-colors"><Save size={14}/> Save</button>
                        <button onClick={handleCancel} className="flex items-center gap-1.5 px-3 py-1 bg-border dark:bg-dark-border text-text/90 dark:text-dark-text/90 text-xs font-semibold rounded-full hover:brightness-95 dark:hover:brightness-125 transition"><X size={14}/> Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setEditingSection(sectionName)} className="p-2 text-text-secondary dark:text-dark-text-secondary rounded-full hover:bg-bg dark:hover:bg-dark-border hover:text-text dark:hover:text-dark-text transition-colors"><Edit size={16}/></button>
                )}
            </div>
            <div>
                {(hasData || isEditing) ? children(isEditing) : (<div className="text-center py-6 px-4 border-2 border-dashed border-border dark:border-dark-border rounded-lg"><p className="text-text-secondary dark:text-dark-text-secondary text-sm">{emptyMessage || `Click the edit icon to add ${title.toLowerCase()}`}</p></div>)}
            </div>
        </div>
    );
};
const InputField = (props) => (<input {...props} className={`w-full bg-bg dark:bg-dark-border rounded p-2 text-sm border-2 border-border dark:border-dark-border focus:border-accent focus:ring-0 outline-none transition-colors ${props.className || ''}`}/>);
const TextAreaField = (props) => (<textarea {...props} className="w-full text-text/90 dark:text-dark-text/90 text-sm bg-bg dark:bg-dark-border p-2 rounded mt-1 border-2 border-border dark:border-dark-border focus:border-accent focus:ring-0 outline-none transition-colors" rows="4"/>);
const SkillTag = ({ skill, colorClass = 'bg-primary/10 text-primary' }) => (<div className={`${colorClass} text-sm font-medium px-3 py-1 rounded-md`}>{skill}</div>);


// --- Main Profile Page Component ---
const ProfilePage = () => {
    const { user, profileData, setProfileData, handleSave, resetStateFromClerk } = useProfileData();
    const [editingSection, setEditingSection] = useState(null);

    if (!profileData) return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-text dark:text-dark-text" /></div>;

    const handleDataChange = (field, value) => setProfileData(p => ({ ...p, [field]: value }));
    const handleNestedChange = (object, field, value) => setProfileData(p => ({ ...p, [object]: { ...p[object], [field]: value } }));
    const handleListChange = (list, index, field, value) => setProfileData(p => ({ ...p, [list]: p[list].map((item, i) => i === index ? { ...item, [field]: value } : item) }));
    const handleAddItem = (list, newItem) => setProfileData(p => ({ ...p, [list]: [...(p[list] || []), { ...newItem, id: Date.now() }] }));
    const handleRemoveItem = (list, index) => setProfileData(p => ({ ...p, [list]: p[list].filter((_, i) => i !== index) }));
    
    const skillColors = ['bg-primary/10 text-primary', 'bg-accent/10 text-accent', 'bg-success/10 text-success', 'bg-warning/10 text-warning'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                
                <SectionCard title="Bio" icon={<UserIcon size={20} className="text-accent"/>} sectionName="bio" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} hasData={true} variant="highlight">
                    {(isEditing) => (
                        <div className="flex flex-col items-center text-center gap-4">
                            <img src={user.imageUrl} alt="Profile" className="w-28 h-28 rounded-full ring-4 ring-accent p-1"/>
                            <div className="w-full">
                                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{user.fullName}</h2>
                                {isEditing ? 
                                    <TextAreaField className="text-center mt-2" value={profileData.title} onChange={e => handleDataChange('title', e.target.value)} placeholder="e.g., Passionate Full-Stack Developer..." rows={3} /> : 
                                    <p className="text-text/90 dark:text-dark-text/90 mt-1 max-w-lg mx-auto text-sm sm:text-base">{profileData.title || <span className="text-text-secondary dark:text-dark-text-secondary">Click the edit icon to add your professional title or bio...</span>}</p>
                                }
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-text-secondary dark:text-dark-text-secondary pt-3 mt-3 border-t border-border/50 dark:border-dark-border/50">
                                    <div className="flex items-center gap-1.5"><MapPin size={14}/> {isEditing ? <InputField className="text-center" value={profileData.location} onChange={e => handleDataChange('location', e.target.value)} placeholder="e.g., Bengaluru"/> : <span>{profileData.location || "—"}</span>}</div>
                                    <div className="flex items-center gap-1.5"><Briefcase size={14}/> {isEditing ? <InputField className="text-center" value={profileData.status} onChange={e => handleDataChange('status', e.target.value)} placeholder="e.g., Fresher"/> : <span>{profileData.status || "—"}</span>}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </SectionCard>

                <SectionCard title="Skills" icon={<Award size={20} className="text-accent"/>} sectionName="skills" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} onAddItem={() => handleAddItem('skills', { name: '' })} hasData={profileData.skills?.length > 0}>
                    {(isEditing) => (<div className="flex flex-wrap gap-2">{isEditing ? profileData.skills.map((skill, index) => (<div key={skill.id || index} className="flex items-center gap-1 bg-border dark:bg-dark-border rounded-full pl-3"><InputField className="bg-transparent p-1 border-none w-24 sm:w-32" value={skill.name} onChange={e => handleListChange('skills', index, 'name', e.target.value)} placeholder="Skill name"/><button onClick={() => handleRemoveItem('skills', index)} className="p-1 text-danger hover:bg-danger/20 rounded-full transition-colors"><XCircle size={16}/></button></div>)) : profileData.skills.map((skill, index) => <SkillTag key={index} skill={skill.name} colorClass={skillColors[index % skillColors.length]}/>)}</div>)}
                </SectionCard>
                
                <SectionCard title="Job Preferences" icon={<Settings size={20} className="text-accent"/>} sectionName="jobPreferences" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} hasData={true}>
                    {(isEditing) => (<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">{Object.entries({openFor:"Open For", jobRoles:"Job Roles", available:"Available for Hire", relocate:"Willing to Relocate", location:"Preferred Location", industry:"Industry"}).map(([key, label]) => (<div key={key}><label className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">{label}</label>{isEditing ? <InputField value={profileData.jobPreferences[key]} onChange={e => handleNestedChange('jobPreferences', key, e.target.value)} placeholder={`e.g., ${label}`}/> : <p className="font-semibold text-text dark:text-dark-text truncate">{profileData.jobPreferences[key] || "—"}</p>}</div>))}</div>)}
                </SectionCard>
                
                <SectionCard title="About Me" icon={<UserIcon size={20} className="text-accent"/>} sectionName="aboutMe" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} hasData={!!profileData.aboutMe}>
                    {(isEditing) => isEditing ? <TextAreaField value={profileData.aboutMe} onChange={e => handleDataChange('aboutMe', e.target.value)} placeholder="Tell everyone a little bit about yourself..."/> : <p className="text-text/90 dark:text-dark-text/90 whitespace-pre-line">{profileData.aboutMe}</p>}
                </SectionCard>

                <SectionCard title="Work Experience" icon={<Briefcase size={20} className="text-accent"/>} sectionName="workExperience" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} onAddItem={() => handleAddItem('workExperience', { title: '', company: '', dates: '', description: '' })} hasData={profileData.workExperience?.length > 0}>
                    {(isEditing) => (<div className="space-y-4">{profileData.workExperience.map((exp, index) => (<div key={exp.id || index} className="p-4 bg-bg dark:bg-dark-border rounded-lg space-y-2 relative border border-border dark:border-dark-border"><button onClick={() => handleRemoveItem('workExperience', index)} className="absolute top-2 right-2 text-danger hover:opacity-80"><XCircle size={18}/></button><InputField value={exp.title} onChange={e => handleListChange('workExperience', index, 'title', e.target.value)} placeholder="Job Title"/><InputField value={exp.company} onChange={e => handleListChange('workExperience', index, 'company', e.target.value)} placeholder="Company Name"/><InputField value={exp.dates} onChange={e => handleListChange('workExperience', index, 'dates', e.target.value)} placeholder="e.g., Jan 2024 - Present"/><TextAreaField value={exp.description} onChange={e => handleListChange('workExperience', index, 'description', e.target.value)} placeholder="Key responsibilities..."/></div>))}</div>)}
                </SectionCard>

                <SectionCard title="Education" icon={<GraduationCap size={20} className="text-accent"/>} sectionName="education" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} onAddItem={() => handleAddItem('education', { institution: '', degree: '', field: '', dates: '' })} hasData={profileData.education?.length > 0}>
                    {(isEditing) => (<div className="space-y-4">{profileData.education.map((edu, index) => (<div key={edu.id || index} className="p-4 bg-bg dark:bg-dark-border rounded-lg space-y-2 relative border border-border dark:border-dark-border"><button onClick={() => handleRemoveItem('education', index)} className="absolute top-2 right-2 text-danger hover:opacity-80"><XCircle size={18}/></button><InputField value={edu.institution} onChange={e => handleListChange('education', index, 'institution', e.target.value)} placeholder="Institution Name"/><InputField value={edu.degree} onChange={e => handleListChange('education', index, 'degree', e.target.value)} placeholder="Degree"/><InputField value={edu.field} onChange={e => handleListChange('education', index, 'field', e.target.value)} placeholder="Field of Study"/><InputField value={edu.dates} onChange={e => handleListChange('education', index, 'dates', e.target.value)} placeholder="e.g., 2021 - 2025"/></div>))}</div>)}
                </SectionCard>

                <SectionCard title="Projects" icon={<Lightbulb size={20} className="text-accent"/>} sectionName="projects" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} onAddItem={() => handleAddItem('projects', { name: '', dates: '', description: '' })} hasData={profileData.projects?.length > 0}>
                    {(isEditing) => (<div className="space-y-4">{profileData.projects.map((proj, index) => (<div key={proj.id || index} className="p-4 bg-bg dark:bg-dark-border rounded-lg space-y-2 relative border border-border dark:border-dark-border"><button onClick={() => handleRemoveItem('projects', index)} className="absolute top-2 right-2 text-danger hover:opacity-80"><XCircle size={18}/></button><InputField value={proj.name} onChange={e => handleListChange('projects', index, 'name', e.target.value)} placeholder="Project Name"/><InputField value={proj.dates} onChange={e => handleListChange('projects', index, 'dates', e.target.value)} placeholder="e.g., Oct 2025"/><TextAreaField value={proj.description} onChange={e => handleListChange('projects', index, 'description', e.target.value)} placeholder="Project description..."/></div>))}</div>)}
                </SectionCard>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-gradient-to-br from-accent-50/50 to-bg dark:from-dark-surface dark:to-accent-900/20 border border-border dark:border-dark-border rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Ready to Apply?</h3>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">Make sure your resume is up-to-date before you start applying.</p>
                    <button className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
                        <UploadCloud size={16}/> Upload/Update Resume
                    </button>
                </div>
                
                <SectionCard title="Contact & Socials" icon={<Mail size={20} className="text-accent"/>} sectionName="contact" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} hasData={true} variant="highlight">
                    {(isEditing) => (<div className="space-y-4">{[{ icon: Mail, key: 'email' }, { icon: Phone, key: 'phone' }, { icon: Github, key: 'github' }, { icon: Linkedin, key: 'linkedin' }, { icon: Dribbble, key: 'dribbble' }, { icon: Globe, key: 'behance' }].map(({icon: Icon, key}) => (<div key={key} className="text-sm flex items-center gap-3 group"><Icon size={16} className="text-text-secondary dark:text-dark-text-secondary group-hover:text-accent transition-colors flex-shrink-0"/>{isEditing ? <InputField value={profileData.contact[key]} onChange={e => handleNestedChange('contact', key, e.target.value)} placeholder={`Your ${key}`}/> : <a href={profileData.contact?.[key] || '#'} target="_blank" rel="noopener noreferrer" className="truncate hover:underline">{profileData.contact?.[key] || "—"}</a>}</div>))}</div>)}
                </SectionCard>
                
                <SectionCard title="Personal Details" icon={<UserIcon size={20} className="text-accent"/>} sectionName="personalDetails" editingSection={editingSection} setEditingSection={setEditingSection} onSave={() => handleSave(profileData)} onCancel={resetStateFromClerk} hasData={true}>
                    {(isEditing) => (<div className="space-y-3 text-sm">{Object.entries({dob:"Date of Birth", gender:"Gender", languages:"Languages Known", state:"State"}).map(([key, label]) => (<div key={key}><label className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">{label}</label>{isEditing ? <InputField value={profileData.personalDetails[key]} type={key === 'dob' ? 'date' : 'text'} onChange={e => handleNestedChange('personalDetails', key, e.target.value)} placeholder={`Your ${label}`}/> : <p className="font-semibold text-text dark:text-dark-text">{profileData.personalDetails[key] || "—"}</p>}</div>))}</div>)}
                </SectionCard>
            </div>
        </div>
    );
};
export default ProfilePage;