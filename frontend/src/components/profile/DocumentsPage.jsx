import React, { useRef } from 'react';
import { useProfileData } from './useProfileData';
import { Loader2, FileText, Eye, Trash2, UploadCloud, CheckCircle } from 'lucide-react';

// --- Helper Component for Each Document Slot ---
const DocumentSlot = ({ label, docKey, categoryKey, document, onUpload, onDelete }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file, categoryKey, docKey);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-bg dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border">
            <div className="flex items-center gap-3">
                {document ? <CheckCircle size={20} className="text-success"/> : <FileText size={20} className="text-text-secondary dark:text-dark-text-secondary"/>}
                <div>
                    <p className="font-semibold text-text dark:text-dark-text">{label}</p>
                    {document ? 
                        <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{document.name}</p> :
                        <p className="text-xs text-warning">Awaiting Upload</p>
                    }
                </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <div className="flex items-center gap-2">
                {document ? (
                    <>
                        <a href={document.url} target="_blank" rel="noreferrer" className="p-2 text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors"><Eye size={16}/></a>
                        <button onClick={() => onDelete(categoryKey, docKey)} className="p-2 text-danger hover:opacity-80 transition-opacity"><Trash2 size={16}/></button>
                    </>
                ) : (
                    <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full hover:bg-accent/30 transition-colors">
                        <UploadCloud size={14}/> Upload
                    </button>
                )}
            </div>
        </div>
    );
};


// --- Main Documents Page Component ---
const DocumentsPage = () => {
    const { profileData, setProfileData, handleSave, isLoaded } = useProfileData();
    
    if (!isLoaded || !profileData) {
        return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin text-text dark:text-dark-text" /></div>;
    }

    const handleFileUpload = async (file, categoryKey, docKey) => {
        console.log(`Simulating upload for: ${file.name} into ${categoryKey}.${docKey}`);
        
        // This is a placeholder for your backend file storage logic.
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newFileObject = {
            name: file.name,
            url: "#", // Replace "#" with the real URL from your cloud storage.
            uploadedAt: new Date().toISOString(),
        };

        const updatedProfileData = {
            ...profileData,
            documents: {
                ...profileData.documents,
                [categoryKey]: {
                    ...profileData.documents[categoryKey],
                    [docKey]: newFileObject
                }
            }
        };
        
        setProfileData(updatedProfileData);
        handleSave(updatedProfileData);
    };

    const handleFileDelete = (categoryKey, docKey) => {
        // TODO: Also delete the file from your cloud storage here.
        console.log(`Deleting from ${categoryKey}.${docKey}`);

        const updatedProfileData = {
            ...profileData,
            documents: {
                ...profileData.documents,
                [categoryKey]: {
                    ...profileData.documents[categoryKey],
                    [docKey]: null
                }
            }
        };
        setProfileData(updatedProfileData);
        handleSave(updatedProfileData);
    };

    const academicDocs = [
        { label: "10th Marksheet", key: "marksheet10" },
        { label: "10th Board Certificate", key: "certificate10" },
        { label: "12th Marksheet", key: "marksheet12" },
        { label: "12th Board Certificate", key: "certificate12" },
    ];
    const identityDocs = [
        { label: "Aadhaar Card", key: "aadhaar" },
        { label: "PAN Card", key: "pan" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Academic Documents</h3>
                <div className="space-y-3">
                    {academicDocs.map(doc => (
                        <DocumentSlot 
                            key={doc.key}
                            label={doc.label}
                            docKey={doc.key}
                            categoryKey="academic"
                            document={profileData.documents?.academic?.[doc.key]}
                            onUpload={handleFileUpload}
                            onDelete={handleFileDelete}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Identity Proofs</h3>
                <div className="space-y-3">
                    {identityDocs.map(doc => (
                        <DocumentSlot 
                            key={doc.key}
                            label={doc.label}
                            docKey={doc.key}
                            categoryKey="identity"
                            document={profileData.documents?.identity?.[doc.key]}
                            onUpload={handleFileUpload}
                            onDelete={handleFileDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentsPage;