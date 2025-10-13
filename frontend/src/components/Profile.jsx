import React, { useEffect, useState, useCallback } from 'react';
import { 
    Edit, Save, X, PlusCircle, XCircle, Loader2, MapPin, Briefcase, Award, GraduationCap, 
    Lightbulb, Mail, Phone, Linkedin, Github, Dribbble, Globe, User as UserIcon, Download
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

// --- Reusable UI Helper Components ---
const SectionCard = ({ title, icon, sectionName, editingSection, setEditingSection, onSave, onCancel, onAddItem, children, hasData, emptyMessage }) => {
    const isEditing = editingSection === sectionName;

    const handleSave = () => {
        onSave();
        setEditingSection(null);
    };

    const handleCancel = () => {
        onCancel();
        setEditingSection(null);
    };

    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-3">{icon}{title}</h3>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full hover:bg-green-500/30"><Save size={14}/> Save</button>
                        <button onClick={handleCancel} className="flex items-center gap-1.5 px-3 py-1 bg-gray-700 text-gray-300 text-xs font-semibold rounded-full hover:bg-gray-600"><X size={14}/> Cancel</button>
                        {onAddItem && <button onClick={onAddItem} className="p-1 text-[#00C4CC] rounded-full hover:bg-cyan-500/20"><PlusCircle size={20}/></button>}
                    </div>
                ) : (
                    <button onClick={() => setEditingSection(sectionName)} className="p-2 text-gray-400 rounded-full hover:bg-gray-700/50 hover:text-white"><Edit size={16}/></button>
                )}
            </div>
            <div>
                {(hasData || isEditing) ? children(isEditing) : (<div className="text-center py-6 px-4 border-2 border-dashed border-gray-700 rounded-lg"><p className="text-gray-500 text-sm">{emptyMessage || `No ${title.toLowerCase()} added yet.`}</p></div>)}
            </div>
        </div>
    );
};
const InputField = (props) => (<input {...props} className={`w-full bg-gray-700 rounded p-2 text-sm border-2 border-gray-600 focus:border-cyan-500 focus:ring-0 outline-none transition-colors ${props.className || ''}`}/>);
const TextAreaField = (props) => (<textarea {...props} className="w-full text-gray-300 text-sm bg-gray-700 p-2 rounded mt-1 border-2 border-gray-600 focus:border-cyan-500 focus:ring-0 outline-none transition-colors" rows="4"/>);
const SkillTag = ({ skill }) => (<div className="bg-gray-700 text-gray-300 text-sm font-medium px-3 py-1 rounded-full">{skill}</div>);


// --- Main Profile Component ---
const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  
  const [editingSection, setEditingSection] = useState(null); 
  const [profileData, setProfileData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const getEmptyProfile = useCallback(() => ({
    title: "", university: "", location: "", status: "Fresher", aboutMe: "",
    skills: [], education: [], projects: [], workExperience: [], achievements: [],
    jobPreferences: { openFor: "Internship", roles: "", available: "Yes", relocate: "Yes", location: "", industry: "", ctc: "" },
    contact: { email: user?.primaryEmailAddress?.emailAddress || "", phone: "", github: "", linkedin: "", dribbble: "", behance: "" }
  }), [user]);

  const resetStateFromClerk = useCallback(() => {
    if (!user) return;
    const meta = user.unsafeMetadata || {};
    // Combine saved data with the full structure to prevent errors if new fields are added
    const fullProfile = { ...getEmptyProfile(), ...meta };
    setProfileData(fullProfile);
  }, [user, getEmptyProfile]);

  useEffect(() => {
    if (user) resetStateFromClerk();
  }, [user, resetStateFromClerk]);

  const handleDataChange = (field, value) => setProfileData(p => ({ ...p, [field]: value }));
  const handleNestedChange = (object, field, value) => setProfileData(p => ({ ...p, [object]: { ...p[object], [field]: value } }));
  const handleListChange = (list, index, field, value) => setProfileData(p => ({ ...p, [list]: p[list].map((item, i) => i === index ? { ...item, [field]: value } : item) }));
  const handleAddItem = (list, newItem) => setProfileData(p => ({ ...p, [list]: [...(p[list] || []), { ...newItem, id: Date.now() }] }));
  const handleRemoveItem = (list, index) => setProfileData(p => ({ ...p, [list]: p[list].filter((_, i) => i !== index) }));

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
        const dataToSave = { ...profileData, isInitialSetupDone: true };
        // Strip temporary client-side IDs before saving
        Object.keys(dataToSave).forEach(key => {
            if (Array.isArray(dataToSave[key])) {
                dataToSave[key] = dataToSave[key].map(({ id, ...rest }) => rest);
            }
        });
        await user.update({ unsafeMetadata: dataToSave });
        setSaveMsg('Profile section saved successfully!');
    } catch (e) { console.error("Failed to save profile:", e); } 
    finally { setSaving(false); setTimeout(() => setSaveMsg(''), 3000); }
  };

  if (!isLoaded || !profileData) {
    return <div className="lg:ml-64 p-10 text-white flex justify-center items-center h-screen"><Loader2 className="animate-spin" size={32}/></div>;
  }
  
  return (
     <div className="lg:ml-64 bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div><h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1><p className="text-gray-400 text-sm sm:text-base">Here, you can view & edit your profile</p></div>
      </div>
      {saveMsg && <div className="text-center text-sm text-green-400 mb-4">{saveMsg}</div>}
      <div className="flex items-center border-b border-gray-700 mb-6">{['Profile', 'Resume', 'Scorecard', 'Documents'].map((tab, index) => (<button key={tab} className={`py-2 px-4 text-sm font-medium ${index === 0 ? 'text-[#00C4CC] border-b-2 border-[#00C4CC]' : 'text-gray-400 hover:text-white'}`}>{tab}</button>))}</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Bio" icon={<UserIcon size={20} className="text-cyan-400"/>} sectionName="bio" editingSection={editingSection} setEditingSection={setEditingSection} onSave={handleSave} onCancel={resetStateFromClerk} hasData={true}>
            {(isEditing) => (
              <div className="flex items-start gap-4">
                <img src={user.imageUrl} alt="Profile" className="w-16 h-16 rounded-full"/>
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-bold text-white">{user.fullName}</h2>
                  {isEditing ? <TextAreaField value={profileData.title} onChange={e => handleDataChange('title', e.target.value)} placeholder="Your professional title or bio..."/> : <p className="text-gray-300 mt-1">{profileData.title}</p>}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1.5"><MapPin size={14}/> {isEditing ? <InputField value={profileData.location} onChange={e => handleDataChange('location', e.target.value)} placeholder="Location"/> : <span>{profileData.location}</span>}</div>
                    <div className="flex items-center gap-1.5"><Briefcase size={14}/> {isEditing ? <InputField value={profileData.status} onChange={e => handleDataChange('status', e.target.value)} placeholder="e.g., Fresher"/> : <span>{profileData.status}</span>}</div>
                  </div>
                </div>
              </div>
            )}
          </SectionCard>
          <SectionCard title="Skills" icon={<Award size={20} className="text-cyan-400"/>} sectionName="skills" editingSection={editingSection} setEditingSection={setEditingSection} onSave={handleSave} onCancel={resetStateFromClerk} onAddItem={() => handleAddItem('skills', { name: '' })} hasData={profileData.skills?.length > 0}>
            {(isEditing) => (
              <div className="flex flex-wrap gap-2">
                {isEditing ? profileData.skills.map((skill, index) => (
                  <div key={skill.id || index} className="flex items-center gap-1 bg-gray-700 rounded-full pl-3">
                    <InputField className="bg-transparent p-1 border-none w-24" value={skill.name} onChange={e => handleListChange('skills', index, 'name', e.target.value)} placeholder="Skill name"/>
                    <button onClick={() => handleRemoveItem('skills', index)} className="p-1 text-red-500 hover:bg-red-500/20 rounded-full"><XCircle size={16}/></button>
                  </div>
                )) : profileData.skills.map((skill, index) => <SkillTag key={index} skill={skill.name}/>)}
              </div>
            )}
          </SectionCard>
          <SectionCard title="About Me" icon={<UserIcon size={20} className="text-cyan-400"/>} sectionName="aboutMe" editingSection={editingSection} setEditingSection={setEditingSection} onSave={handleSave} onCancel={resetStateFromClerk} hasData={!!profileData.aboutMe}>
             {(isEditing) => isEditing ? <TextAreaField value={profileData.aboutMe} onChange={e => handleDataChange('aboutMe', e.target.value)} placeholder="Tell everyone a little bit about yourself..."/> : <p className="text-gray-300 whitespace-pre-line">{profileData.aboutMe}</p>}
          </SectionCard>
          <SectionCard title="Education" icon={<GraduationCap size={20} className="text-cyan-400"/>} sectionName="education" editingSection={editingSection} setEditingSection={setEditingSection} onSave={handleSave} onCancel={resetStateFromClerk} onAddItem={() => handleAddItem('education', { institution: '', degree: '', field: '', dates: '' })} hasData={profileData.education?.length > 0}>
            {(isEditing) => (
              <div className="space-y-4">
                {profileData.education.map((edu, index) => (
                  <div key={edu.id || index} className="p-3 bg-gray-900/50 rounded-lg space-y-2 relative">
                    <button onClick={() => handleRemoveItem('education', index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18}/></button>
                    <InputField value={edu.institution} onChange={e => handleListChange('education', index, 'institution', e.target.value)} placeholder="Institution Name"/>
                    <InputField value={edu.degree} onChange={e => handleListChange('education', index, 'degree', e.target.value)} placeholder="Degree"/>
                    <InputField value={edu.field} onChange={e => handleListChange('education', index, 'field', e.target.value)} placeholder="Field of Study"/>
                    <InputField value={edu.dates} onChange={e => handleListChange('education', index, 'dates', e.target.value)} placeholder="Date Range"/>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
          <SectionCard title="Projects" icon={<Lightbulb size={20} className="text-cyan-400"/>} sectionName="projects" editingSection={editingSection} setEditingSection={setEditingSection} onSave={handleSave} onCancel={resetStateFromClerk} onAddItem={() => handleAddItem('projects', { name: '', dates: '', description: '' })} hasData={profileData.projects?.length > 0}>
             {(isEditing) => (
                <div className="space-y-4">
                  {profileData.projects.map((proj, index) => (
                    <div key={proj.id || index} className="p-3 bg-gray-900/50 rounded-lg space-y-2 relative">
                       <button onClick={() => handleRemoveItem('projects', index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18}/></button>
                       <InputField value={proj.name} onChange={e => handleListChange('projects', index, 'name', e.target.value)} placeholder="Project Name"/>
                       <InputField value={proj.dates} onChange={e => handleListChange('projects', index, 'dates', e.target.value)} placeholder="Date Range"/>
                       <TextAreaField value={proj.description} onChange={e => handleListChange('projects', index, 'description', e.target.value)} placeholder="Project description"/>
                    </div>
                  ))}
                </div>
              )}
          </SectionCard>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Upload Resume</h3>
            <button className="w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600"><Download size={16} className="inline mr-2"/>Upload Resume</button>
          </div>
          <SectionCard title="Contact & Socials" icon={<Mail size={20} className="text-cyan-400"/>} sectionName="contact" editingSection={editingSection} setEditingSection={setEditingSection} onSave={handleSave} onCancel={resetStateFromClerk} hasData={true}>
            {(isEditing) => (
                <div className="space-y-4">
                  {[
                    { icon: Mail, key: 'email' }, { icon: Phone, key: 'phone' }, { icon: Github, key: 'github' }, 
                    { icon: Linkedin, key: 'linkedin' }, { icon: Dribbble, key: 'dribbble' }, { icon: Globe, key: 'behance' },
                  ].map(({icon: Icon, key}) => (
                    <div key={key} className="text-sm flex items-center gap-2">
                      <Icon size={16} className="text-gray-500 flex-shrink-0"/>
                      {isEditing ? <InputField value={profileData.contact[key]} onChange={e => handleNestedChange('contact', key, e.target.value)} placeholder={`Your ${key}`}/> : <span>{profileData.contact[key] || 'Not provided'}</span>}
                    </div>
                  ))}
                </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;