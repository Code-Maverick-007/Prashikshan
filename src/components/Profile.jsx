// src/components/Profile.jsx (FINAL FIX)

import React, { useEffect, useState, useCallback } from 'react';
import { 
    Edit, Save, PlusCircle, XCircle, Loader2, MapPin, 
    Calendar, Mail, Phone, Linkedin, Github, Briefcase, Award 
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';


// --- Reusable UI Helper Components ---
const ProfileCard = ({ title, icon, isEditing, onAddItem, children, hasData, emptyMessage }) => (
  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 transition-all duration-300">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">{icon} {title}</h3>
      {isEditing && onAddItem && (<button onClick={onAddItem} className="p-1 text-[#00C4CC] rounded-full hover:bg-cyan-500/20 transition-colors"><PlusCircle size={22}/></button>)}
    </div>
    <div>
      {hasData ? children : (<div className="text-center py-8 px-4 border-2 border-dashed border-gray-700 rounded-lg"><p className="text-gray-500 text-sm">{emptyMessage.title}</p><p className="text-gray-600 text-xs mt-1">{emptyMessage.subtitle}</p></div>)}
    </div>
  </div>
);
const InputField = (props) => (<input {...props} className={`w-full bg-gray-700 rounded p-2 text-sm border-2 border-gray-600 focus:border-cyan-500 focus:ring-0 outline-none transition-colors ${props.className || ''}`}/>);
const TextAreaField = (props) => (<textarea {...props} className="w-full text-gray-300 text-sm bg-gray-700 p-2 rounded mt-1 border-2 border-gray-600 focus:border-cyan-500 focus:ring-0 outline-none transition-colors" rows="3"/>);
const SkillEditorItem = ({ skill, index, onUpdate, onRemove }) => (
    <div className="p-4 bg-gray-900/50 rounded-lg space-y-3 border border-gray-700">
      <div className="flex justify-between items-center"><label className="text-xs font-semibold text-gray-400">SKILL & CATEGORY</label><button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-400 transition-colors"><XCircle size={18} /></button></div>
      <div className="flex gap-2"><InputField value={skill.name} onChange={(e) => onUpdate(index, 'name', e.target.value)} placeholder="e.g., React"/><InputField value={skill.category} onChange={(e) => onUpdate(index, 'category', e.target.value)} placeholder="e.g., Technical"/></div>
      <div>
        <label className="text-xs font-semibold text-gray-400 flex justify-between"><span>PROFICIENCY</span><span className="text-cyan-400 font-bold">{skill.level}%</span></label>
        <input type="range" min="0" max="100" value={skill.level} onChange={(e) => onUpdate(index, 'level', parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00C4CC] mt-1"/>
      </div>
    </div>
);


// --- Main Profile Component ---
const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [skills, setSkills] = useState([]);
  const [internshipHistory, setInternshipHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const resetStateFromClerk = useCallback(() => {
    if (!user) return;
    // Read from both metadata fields for safety, with unsafeMetadata taking precedence
    const meta = user.unsafeMetadata || user.publicMetadata || {};
    setProfileData({
      name: user.fullName || 'Student Name', title: meta.title || 'Aspiring Software Engineer', university: meta.university || 'University of Technology', location: meta.location || 'Bengaluru, India', email: user.primaryEmailAddress?.emailAddress || '', phone: meta.phone || '', linkedin: meta.linkedin || '', github: meta.github || '', joinDate: user.createdAt ? user.createdAt.toLocaleDateString("en-US", { year: 'numeric', month: 'long' }) : '—', avatar: user.imageUrl,
    });
    setSkills(meta.skills || []);
    setInternshipHistory(meta.internshipHistory || []);
    setAchievements(meta.achievements || []);
  }, [user]);

  useEffect(() => { if (user) resetStateFromClerk(); }, [user, resetStateFromClerk]);

  const handleListChange = (setter, index, field, value) => setter(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  const handleAddItem = (setter, newItem) => setter(prev => [...prev, { ...newItem, id: Date.now() }]);
  const handleRemoveItem = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));
  const handleCancel = () => { resetStateFromClerk(); setIsEditing(false); };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveMsg('');
    const skillsToSave = skills.map(({ id, ...rest }) => rest);
    const historyToSave = internshipHistory.map(({ id, ...rest }) => rest);
    const achievementsToSave = achievements.map(({ id, ...rest }) => rest);
    try {
      // --- THE FIX IS HERE ---
      // Changed `publicMetadata` to `unsafeMetadata`
      await user.update({
        unsafeMetadata: {
          title: profileData.title, university: profileData.university, location: profileData.location, phone: profileData.phone, linkedin: profileData.linkedin, github: profileData.github, skills: skillsToSave, internshipHistory: historyToSave, achievements: achievementsToSave,
        },
      });
      setSaveMsg('Profile Saved Successfully!');
      setIsEditing(false);
    } catch (e) { console.error('Failed to update Clerk metadata:', e); } 
    finally { setSaving(false); setTimeout(() => setSaveMsg(''), 3000); }
  };

  if (!isLoaded) return <div className="lg:ml-64 p-10 text-white flex justify-center items-center h-screen"><Loader2 className="animate-spin" size={32}/></div>;
  
  return (
     <div className="lg:ml-64 bg-gray-900 text-white min-h-screen p-4 pt-6 lg:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h1 className="text-2xl sm:text-3xl font-bold mb-1">Profile</h1><p className="text-gray-400 text-sm sm:text-base">Manage your personal information and track your progress</p></div>
        {!isEditing ? (<button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg text-sm hover:bg-gray-600 transition-colors"><Edit size={16} /> Edit Profile</button>) : (<div className="flex items-center gap-3"><button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-[#00C4CC] text-gray-900 font-semibold rounded-lg text-sm hover:bg-[#00B8C2] transition-colors disabled:opacity-60"><>{saving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16} />} {saving ? 'Saving...' : 'Save Changes'}</></button><button onClick={handleCancel} className="px-4 py-2 text-gray-300 text-sm hover:bg-gray-800 rounded-lg">Cancel</button></div>)}
      </div>
      {saveMsg && <div className="text-center text-sm text-green-400">{saveMsg}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <div className="text-center mb-6">
              <img src={profileData.avatar} alt={profileData.name} className="w-24 h-24 rounded-full object-cover border-2 border-gray-600 mx-auto mb-4"/>
              <h2 className="text-xl font-semibold mb-1 text-white">{profileData.name}</h2>
              {isEditing ? (<><InputField type="text" value={profileData.title} onChange={(e) => setProfileData(p => ({ ...p, title: e.target.value }))} className="text-center text-[#00C4CC] mb-2" placeholder="Your Title"/><InputField type="text" value={profileData.university} onChange={(e) => setProfileData(p => ({ ...p, university: e.target.value }))} className="text-center text-gray-400" placeholder="Your University"/></>) : (<><p className="text-[#00C4CC] mb-2">{profileData.title}</p><p className="text-gray-400 text-sm">{profileData.university}</p></>)}
            </div>
            <div className="space-y-4 text-gray-300 border-t border-gray-700/50 pt-4">
              {[{ icon: MapPin, key: 'location' }, { icon: Phone, key: 'phone', type: 'tel' }, { icon: Linkedin, key: 'linkedin' }, { icon: Github, key: 'github' }].map(({ icon: Icon, key, type = 'text' }) => (<div className="flex items-center gap-3 text-sm" key={key}><Icon size={16} className="text-gray-500 flex-shrink-0" />{isEditing ? (<InputField type={type} value={profileData[key]} onChange={(e) => setProfileData(p => ({ ...p, [key]: e.target.value }))} placeholder={`Your ${key}`}/>) : (profileData[key] ? ((key.includes('linkedin') || key.includes('github')) ? (<a href={`https://${profileData[key].replace(/https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#00C4CC] hover:underline break-all">{profileData[key]}</a>) : ( <span className="break-all">{profileData[key]}</span> )) : ( <span className="text-gray-500 italic">Not provided</span> ))}</div>))}
              <div className="flex items-center gap-3 text-sm"><Mail size={16} className="text-gray-500" /> <span>{profileData.email}</span></div>
              <div className="flex items-center gap-3 text-sm"><Calendar size={16} className="text-gray-500" /> <span>Joined {profileData.joinDate}</span></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ProfileCard title="Skills" icon={<Award size={20} className="text-cyan-400"/>} isEditing={isEditing} onAddItem={() => handleAddItem(setSkills, { name: '', level: 50, category: '' })} hasData={skills.length > 0} emptyMessage={isEditing ? { title: "Click the '+' icon to add your first skill.", subtitle: "" } : { title: "No skills added yet.", subtitle: "Click 'Edit Profile' to add them." }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{skills.map((skill, index) => (<SkillEditorItem key={skill.id || index} skill={skill} index={index} onUpdate={(idx, field, value) => handleListChange(setSkills, idx, field, value)} onRemove={(idx) => handleRemoveItem(setSkills, idx)}/>))}</div>
          </ProfileCard>
          <ProfileCard title="Internship History" icon={<Briefcase size={20} className="text-cyan-400"/>} isEditing={isEditing} onAddItem={() => handleAddItem(setInternshipHistory, { title: '', company: '', period: '', description: '' })} hasData={internshipHistory.length > 0} emptyMessage={isEditing ? { title: "Click the '+' icon to add an internship.", subtitle: "" } : { title: "No internship history added yet.", subtitle: "Showcase your experience." }}>
            <div className="space-y-4">{internshipHistory.map((item, index) => (<div key={item.id || index} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg relative border border-gray-700">{isEditing && <button onClick={() => handleRemoveItem(setInternshipHistory, index)} className="absolute top-2 right-2 text-red-500 hover:text-red-400"><XCircle size={18}/></button>}<div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-[#00C4CC] font-bold text-xl">{item.company?.[0] || '?'}</span></div><div className="flex-1">{isEditing ? (<div className="space-y-2"><InputField value={item.title} onChange={e => handleListChange(setInternshipHistory, index, 'title', e.target.value)} placeholder="Job Title"/><InputField value={item.company} onChange={e => handleListChange(setInternshipHistory, index, 'company', e.target.value)} className="text-[#00C4CC]" placeholder="Company Name"/><InputField value={item.period} onChange={e => handleListChange(setInternshipHistory, index, 'period', e.target.value)} className="text-gray-400 text-sm" placeholder="e.g., Summer 2025"/><TextAreaField value={item.description} onChange={e => handleListChange(setInternshipHistory, index, 'description', e.target.value)} placeholder="Key responsibilities..."/></div>) : (<><h4 className="font-medium text-white">{item.title}</h4><p className="text-[#00C4CC] text-sm">{item.company}</p><p className="text-gray-400 text-xs mb-2">{item.period}</p><p className="text-gray-300 text-sm whitespace-pre-line">{item.description}</p></>)}</div></div>))}</div>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;