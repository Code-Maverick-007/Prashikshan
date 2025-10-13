import React, { useState, useMemo } from 'react';
import { useProfileData } from './useProfileData';
import { Loader2, BarChart3, Edit, Save, X, PlusCircle, XCircle } from 'lucide-react';

// --- Helper Components ---
const SectionCard = ({ title, icon, sectionName, editingSection, setEditingSection, onSave, onCancel, children, hasData }) => {
    const isEditing = editingSection === sectionName;
    const handleSave = () => { onSave(); setEditingSection(null); };
    const handleCancel = () => { onCancel(); setEditingSection(null); };
    return (
        <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-text dark:text-dark-text flex items-center gap-3">{icon}{title}</h3>
                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1 bg-success/20 text-success text-xs font-semibold rounded-full hover:bg-success/30 transition-colors"><Save size={14}/> Save</button>
                        <button onClick={handleCancel} className="flex items-center gap-1.5 px-3 py-1 bg-border dark:bg-dark-border text-text/90 dark:text-dark-text/90 text-xs font-semibold rounded-full hover:brightness-95 dark:hover:brightness-125 transition"><X size={14}/> Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setEditingSection(sectionName)} className="p-2 text-text-secondary dark:text-dark-text-secondary rounded-full hover:bg-bg dark:hover:bg-dark-border hover:text-text dark:hover:text-dark-text transition-colors"><Edit size={16}/></button>
                )}
            </div>
            <div>{children(isEditing)}</div>
        </div>
    );
};

const InputField = (props) => (<input {...props} className={`w-full bg-bg dark:bg-dark-border rounded p-2 text-sm border-2 border-border dark:border-dark-border focus:border-accent focus:ring-0 outline-none transition-colors ${props.className || ''}`}/>);

const SemesterChart = ({ semesters, scoringSystem }) => {
    const maxScore = scoringSystem === 'CGPA' ? 10 : 100;
    return (
        <div className="flex justify-around items-end h-48 p-4 bg-bg dark:bg-dark-border rounded-lg border border-border dark:border-dark-border">
            {semesters.map((sem, index) => {
                const scoreValue = parseFloat(sem.score) || 0;
                const height = scoreValue > 0 ? `${(scoreValue / maxScore) * 100}%` : '2%';
                return (
                    <div key={index} className="flex flex-col items-center w-full" title={`Sem ${index + 1}: ${sem.score}`}>
                        <div className="w-4 bg-accent rounded-t-sm hover:bg-accent-dark transition-all" style={{ height }}/>
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-2">{index + 1}</p>
                    </div>
                );
            })}
        </div>
    );
};


// --- Main Scorecard Page Component ---
const ScorecardPage = () => {
    const { profileData, setProfileData, handleSave, resetStateFromClerk, isLoaded } = useProfileData();
    const [editingSection, setEditingSection] = useState(null);

    const overallScore = useMemo(() => {
        if (!profileData?.scorecard?.semesters || profileData.scorecard.semesters.length === 0) return "0.0";
        const validScores = profileData.scorecard.semesters.map(s => parseFloat(s.score)).filter(score => !isNaN(score) && score > 0);
        if (validScores.length === 0) return "0.0";
        const average = validScores.reduce((sum, score) => sum + score, 0) / validScores.length;
        return average.toFixed(2);
    }, [profileData?.scorecard?.semesters]);

    if (!isLoaded || !profileData) {
        return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-text dark:text-dark-text" /></div>;
    }
    
    const handleScorecardChange = (field, value) => setProfileData(p => ({ ...p, scorecard: { ...p.scorecard, [field]: value } }));
    const handleSemesterChange = (index, field, value) => setProfileData(p => ({...p, scorecard: {...p.scorecard, semesters: p.scorecard.semesters.map((s, i) => i === index ? { ...s, [field]: value } : s)}}));
    const handleAddSemester = () => setProfileData(p => ({...p, scorecard: {...p.scorecard, semesters: [...p.scorecard.semesters, { score: "" }]}}));
    const handleRemoveSemester = (index) => setProfileData(p => ({...p, scorecard: {...p.scorecard, semesters: p.scorecard.semesters.filter((_, i) => i !== index)}}));
    
    const semestersByYear = (profileData.scorecard?.semesters || []).reduce((acc, sem, index) => {
        const year = Math.floor(index / 2) + 1;
        if (!acc[year]) acc[year] = [];
        acc[year].push({ ...sem, originalIndex: index });
        return acc;
    }, {});

    return (
        <SectionCard 
            title="Academic Scorecard" 
            icon={<BarChart3 size={20} className="text-accent"/>} 
            sectionName="scorecard" 
            editingSection={editingSection} 
            setEditingSection={setEditingSection} 
            onSave={() => handleSave(profileData)} 
            onCancel={resetStateFromClerk} 
            hasData={true}
        >
            {(isEditing) => (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                             <h3 className="font-semibold text-text/90 dark:text-dark-text/90">Overall Performance</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-bg dark:bg-dark-border p-4 rounded-lg">
                                    <label className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">Overall Score</label>
                                    <p className="text-2xl font-bold text-text dark:text-dark-text">{overallScore}</p>
                                    <p className="text-xs text-text-secondary/80 dark:text-dark-text-secondary/80">{profileData.scorecard.scoringSystem}</p>
                                </div>
                                <div className="bg-bg dark:bg-dark-border p-4 rounded-lg">
                                    <label className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">12th Grade</label>
                                    {isEditing ? <InputField value={profileData.scorecard.score12th} onChange={e => handleScorecardChange('score12th', e.target.value)} className="text-2xl font-bold mt-1" /> : <p className="text-2xl font-bold text-text dark:text-dark-text">{profileData.scorecard.score12th || "—"}</p>}
                                    <p className="text-xs text-text-secondary/80 dark:text-dark-text-secondary/80">%</p>
                                </div>
                                <div className="bg-bg dark:bg-dark-border p-4 rounded-lg">
                                    <label className="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary">10th Grade</label>
                                    {isEditing ? <InputField value={profileData.scorecard.score10th} onChange={e => handleScorecardChange('score10th', e.target.value)} className="text-2xl font-bold mt-1" /> : <p className="text-2xl font-bold text-text dark:text-dark-text">{profileData.scorecard.score10th || "—"}</p>}
                                    <p className="text-xs text-text-secondary/80 dark:text-dark-text-secondary/80">%</p>
                                </div>
                             </div>
                        </div>
                        <div>
                             <h3 className="font-semibold text-text/90 dark:text-dark-text/90 mb-4">Semester Trajectory</h3>
                             <SemesterChart semesters={profileData.scorecard.semesters} scoringSystem={profileData.scorecard.scoringSystem} />
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                            <h3 className="font-semibold text-text/90 dark:text-dark-text/90">Semester Details</h3>
                            {isEditing && (
                                <div className="flex items-center gap-4">
                                    <select value={profileData.scorecard.scoringSystem} onChange={e => handleScorecardChange('scoringSystem', e.target.value)} className="bg-bg dark:bg-dark-border text-xs p-2 rounded border border-border dark:border-dark-border outline-none">
                                        <option value="CGPA">CGPA (out of 10)</option>
                                        <option value="Percentage">Percentage (out of 100)</option>
                                    </select>
                                    <button onClick={handleAddSemester} className="flex items-center gap-1.5 px-3 py-2 bg-border dark:bg-dark-border text-xs font-semibold rounded-lg hover:brightness-95 dark:hover:brightness-125 transition-colors"><PlusCircle size={14}/> Add Semester</button>
                                </div>
                            )}
                        </div>
                        <div className="space-y-6">
                            {Object.keys(semestersByYear).map(year => (
                                <div key={year}>
                                    <h4 className="font-medium text-text-secondary/80 dark:text-dark-text-secondary/80 text-sm mb-2">Academic Year {year}</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {semestersByYear[year].map(sem => (
                                            <div key={sem.originalIndex} className="bg-bg dark:bg-dark-border p-4 rounded-lg flex items-center justify-between">
                                                <h4 className="font-semibold text-text-secondary dark:text-dark-text-secondary">Semester {sem.originalIndex + 1}</h4>
                                                {isEditing ? (
                                                    <div className="flex items-center gap-2">
                                                        <InputField type="text" className="text-right w-24" value={sem.score} onChange={e => handleSemesterChange(sem.originalIndex, 'score', e.target.value)} placeholder="Score"/>
                                                        <button onClick={() => handleRemoveSemester(sem.originalIndex)} className="text-danger hover:opacity-80 transition-opacity"><XCircle size={18}/></button>
                                                    </div>
                                                ) : (
                                                    <p className="text-2xl font-bold text-text dark:text-dark-text">{sem.score || "—"}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </SectionCard>
    );
};

export default ScorecardPage;