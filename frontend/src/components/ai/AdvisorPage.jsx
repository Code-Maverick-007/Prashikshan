import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot } from 'lucide-react';

const AdvisorPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const quickQuestions = [
      "What career is best for me?",
      "Which college should I choose?",
      "What are the top engineering branches?",
      "How to prepare for medical entrance exams?",
    ];

    const generateAIResponse = (userMessage) => {
        const message = userMessage.toLowerCase();
        if (message.includes('career')) return "Based on your interests, you may want to explore careers in technology, healthcare, or business. Can you share your favorite subjects or activities?";
        if (message.includes('college')) return "The right college depends on your course preference, budget, and location. Which field do you want to study?";
        if (message.includes('engineering')) return "Top branches include CSE, ECE, Mechanical, and Civil Engineering. Which branch excites you the most?";
        if (message.includes('medical')) return "Focus on Biology, Chemistry, and Physics for NEET. Do you want a preparation plan?";
        if (message.includes('scholarship')) return "Many scholarships exist based on merit, need, and category. Are you looking for government or private scholarships?";
        return "I can help with careers, colleges, and study plans. Tell me more about what you're looking for!";
    };

    const handleSendMessage = async (messageText) => {
        if (!messageText.trim() || isTyping) return;

        const userMessage = { id: Date.now(), text: messageText, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const aiResponseText = generateAIResponse(messageText);
            const aiMessage = { id: Date.now() + 1, text: aiResponseText, sender: 'ai', timestamp: new Date() };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="bg-gradient-to-br from-primary to-accent p-0.5 rounded-xl shadow-lg shadow-primary/20">
            <div className="bg-surface dark:bg-dark-surface rounded-[11px] flex flex-col h-[70vh]">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="text-center p-6 flex flex-col items-center justify-center h-full">
                            <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg text-white mb-4">
                                <Bot size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-text dark:text-dark-text">AI Career Advisor</h3>
                            <p className="text-text-secondary dark:text-dark-text-secondary text-sm mt-1 mb-6">Ask me anything or start with a suggestion below.</p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {quickQuestions.map((q, i) => (
                                    <button key={i} onClick={() => handleSendMessage(q)} className="px-4 py-2 text-sm rounded-full bg-bg dark:bg-dark-border hover:bg-border dark:hover:bg-dark-surface text-primary dark:text-accent-light font-medium transition-all duration-300 shadow-sm">
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        messages.map(msg => (
                            <div key={msg.id} className={`flex gap-3 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && <div className="p-2 rounded-full flex-shrink-0 bg-primary text-white"><Bot size={20} /></div>}
                                <div className={`max-w-md md:max-w-lg p-3 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-bg dark:bg-dark-border text-text dark:text-dark-text'}`}>
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                    <p className="text-xs mt-2 opacity-60 text-right">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                {msg.sender === 'user' && <div className="p-2 rounded-full flex-shrink-0 bg-accent text-white"><User size={20} /></div>}
                            </div>
                        ))
                    )}

                    {isTyping && (
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 p-2 rounded-full flex-shrink-0 bg-primary text-white flex items-center justify-center"><Bot size={20} /></div>
                            <div className="bg-bg dark:bg-dark-border px-4 py-3 rounded-2xl shadow-sm">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-border dark:border-dark-border bg-bg/50 dark:bg-dark-border/50 rounded-b-[11px]">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={input} 
                            onChange={e => setInput(e.target.value)} 
                            onKeyPress={e => e.key === 'Enter' && handleSendMessage(input)} 
                            placeholder="Ask me anything..." 
                            className="flex-1 px-4 py-2 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-accent"
                            disabled={isTyping}
                        />
                        <button 
                            onClick={() => handleSendMessage(input)} 
                            disabled={!input.trim() || isTyping} 
                            className="px-4 py-2 bg-accent text-text font-semibold rounded-lg hover:bg-accent-dark disabled:opacity-50 transition-all hover:scale-105 shadow-md shadow-accent/30">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvisorPage;