import React, { useState, useMemo } from 'react';
import { HelpCircle, Search, ChevronDown, Mail, SearchX } from 'lucide-react';
import { faqData } from '../data/faqData.js';

// --- Reusable FAQ Item Component with Accordion Logic ---
const FAQItem = ({ faq, isOpen, onToggle }) => (
    <div className={`bg-surface dark:bg-dark-surface rounded-lg border border-border dark:border-dark-border shadow-sm transition-all duration-300 ${isOpen ? 'ring-2 ring-accent' : 'ring-0'}`}>
        <button
            onClick={onToggle}
            className="flex justify-between items-center w-full p-4 text-left font-semibold text-text dark:text-dark-text"
        >
            <span>{faq.question}</span>
            <ChevronDown
                className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`}
                size={20}
            />
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
        >
            <p className="pt-0 p-4 text-text-secondary dark:text-dark-text-secondary">
                {faq.answer}
            </p>
        </div>
    </div>
);

// --- Main Help Page Component ---
const HelpPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openFaq, setOpenFaq] = useState(null); // Tracks which FAQ is open

    const handleToggle = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    const filteredFaqData = useMemo(() => {
        if (!searchTerm) return faqData;
        
        return faqData
            .map(category => ({
                ...category,
                questions: category.questions.filter(
                    q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                )
            }))
            .filter(category => category.questions.length > 0);
    }, [searchTerm]);

    return (
        <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 space-y-8">
            {/* --- Header & Search Bar --- */}
            <div className="text-center py-12 bg-gradient-to-br from-primary to-accent rounded-xl text-white shadow-lg shadow-primary/20">
                <HelpCircle size={48} className="mx-auto" strokeWidth={1.5} />
                <h1 className="text-4xl font-bold mt-4">Help & Support</h1>
                <p className="opacity-80 mt-2">How can we help you today?</p>
                <div className="relative mt-6 max-w-lg mx-auto">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50"/>
                    <input 
                        type="text"
                        placeholder="Search for questions..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                </div>
            </div>

            {/* --- FAQ Section --- */}
            <div className="max-w-4xl mx-auto">
                {filteredFaqData.length > 0 ? (
                    filteredFaqData.map(category => (
                        <div key={category.category} className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-primary dark:text-primary-300">{category.category}</h2>
                            <div className="space-y-3">
                                {category.questions.map(faq => (
                                    <FAQItem
                                        key={faq.id}
                                        faq={faq}
                                        isOpen={openFaq === faq.id}
                                        onToggle={() => handleToggle(faq.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 px-4 bg-surface/50 dark:bg-dark-surface/30 border-2 border-dashed border-border dark:border-dark-border rounded-xl">
                        <SearchX size={48} className="mx-auto text-text-secondary dark:text-dark-text-secondary" strokeWidth={1.5} />
                        <p className="mt-4 text-lg font-semibold text-text dark:text-dark-text">No results found for "{searchTerm}"</p>
                        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">Try searching for a different term.</p>
                    </div>
                )}
            </div>

            {/* --- Contact Support Card --- */}
            <div className="max-w-4xl mx-auto text-center p-8 bg-gradient-to-r from-primary-50 to-accent-50/50 dark:from-dark-surface dark:to-primary-900/20 border border-border dark:border-dark-border rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-text dark:text-dark-text">Still need help?</h3>
                <p className="text-text-secondary dark:text-dark-text-secondary mt-2">If you can't find the answer, please don't hesitate to reach out to our support team.</p>
                <button className="mt-6 flex items-center gap-2 mx-auto px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary/30">
                    <Mail size={18} /> Contact Support
                </button>
            </div>
        </div>
    );
};

export default HelpPage;