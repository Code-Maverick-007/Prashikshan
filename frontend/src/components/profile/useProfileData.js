import { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';

export const useProfileData = () => {
  const { isLoaded, user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const getEmptyProfile = useCallback(() => ({
    title: "", university: "", location: "", status: "Fresher", aboutMe: "",
    skills: [], education: [], projects: [], workExperience: [], achievements: [],
    jobPreferences: { openFor: "", roles: "", available: "", relocate: "", location: "", industry: "", ctc: "" },
    personalDetails: { dob: "", gender: "", languages: "", state: ""},
    contact: { email: user?.primaryEmailAddress?.emailAddress || "", phone: "", github: "", linkedin: "", dribbble: "", behance: "" },
  }), [user]);

  const resetStateFromClerk = useCallback(() => {
    if (!user) return;
    const meta = user.unsafeMetadata || {};
    const fullProfile = { 
      ...getEmptyProfile(), 
      ...meta,
      contact: { ...getEmptyProfile().contact, ...meta.contact },
      jobPreferences: { ...getEmptyProfile().jobPreferences, ...meta.jobPreferences },
      personalDetails: { ...getEmptyProfile().personalDetails, ...meta.personalDetails },
    };
    setProfileData(fullProfile);
  }, [user, getEmptyProfile]);

  useEffect(() => {
    if (user) resetStateFromClerk();
  }, [user, resetStateFromClerk]);

  const handleSave = async (dataToSave) => {
    if (!user) return;
    setSaving(true);
    try {
      const finalData = { ...dataToSave, isInitialSetupDone: true };
      Object.keys(finalData).forEach(key => {
        if (Array.isArray(finalData[key])) {
          finalData[key] = finalData[key].map(({ id, ...rest }) => rest);
        }
      });
      await user.update({ unsafeMetadata: finalData });
      setSaveMsg('Profile section saved successfully!');
    } catch (e) { console.error("Failed to save profile:", e); } 
    finally { setSaving(false); setTimeout(() => setSaveMsg(''), 3000); }
  };

  return { isLoaded, user, profileData, setProfileData, saving, saveMsg, handleSave, resetStateFromClerk };
};