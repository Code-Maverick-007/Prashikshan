import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// UPDATED: Corrected import path
import { learningPathsData } from '../data/learningPaths.js';
import { Layers, Clock, CheckCircle, PlayCircle, ArrowLeft } from 'lucide-react';

const LearningPathDetailPage = () => {
    const { pathId } = useParams();
    const path = learningPathsData.find(p => p.id === parseInt(pathId));
    const [currentModule, setCurrentModule] = useState(path?.modules[0]);

    if (!path) {
        return (
            <div className="lg:ml-64 p-8 text-center">
                <h2 className="text-2xl font-bold text-danger">Learning Path Not Found</h2>
                <Link to="/learning-hub" className="mt-4 inline-block text-primary hover:underline">
                    &larr; Back to Learning Hub
                </Link>
            </div>
        );
    }

    return (
        <div className="lg:ml-64 p-4 sm:p-6 lg:p-8">
            <Link to="/learning-hub" className="flex items-center gap-2 text-sm font-semibold text-text-secondary dark:text-dark-text-secondary hover:text-accent transition-colors mb-4">
                <ArrowLeft size={16} /> Back to all paths
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-video w-full bg-dark-surface rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
                        <iframe
                            className="w-full h-full"
                            src={currentModule.videoUrl}
                            title={currentModule.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="bg-surface dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{path.title}</h1>
                        <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">{path.description}</p>
                        <div className="mt-4 flex items-center gap-6 text-sm">
                            <span className={`flex items-center gap-1.5 font-medium ${path.level === 'Beginner' ? 'text-success' : path.level === 'Intermediate' ? 'text-warning' : 'text-primary'}`}><CheckCircle size={16}/> {path.level}</span>
                            <span className="flex items-center gap-1.5"><Layers size={16}/> {path.totalModules} Modules</span>
                            <span className="flex items-center gap-1.5"><Clock size={16}/> Approx. {path.hours} hours</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-surface dark:bg-dark-surface p-4 rounded-xl border border-border dark:border-dark-border">
                    <h3 className="text-lg font-semibold mb-4 p-2">Course Content</h3>
                    <div className="space-y-2">
                        {path.modules.map((module, index) => (
                            <button 
                                key={index} 
                                onClick={() => setCurrentModule(module)}
                                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${currentModule.title === module.title ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-bg dark:hover:bg-dark-border'}`}
                            >
                                {currentModule.title === module.title ? (
                                    <PlayCircle size={24} className="text-primary mt-1 flex-shrink-0" />
                                ) : (
                                    <span className="text-lg font-bold text-text-secondary/50 mt-0.5">{index + 1}</span>
                                )}
                                <div>
                                    <h4 className={`font-semibold ${currentModule.title === module.title ? 'text-primary' : 'text-text dark:text-dark-text'}`}>{module.title}</h4>
                                    <p className="text-xs text-text-secondary">{module.duration}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningPathDetailPage;