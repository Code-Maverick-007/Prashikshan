import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Briefcase, Zap, FileText, ChevronRight, Bot, User, Send, Loader2, Mic, XCircle } from 'lucide-react';

// --- The New Interactive Interview Panel ---
const InterviewPanel = ({ role, onEndInterview }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const messagesEndRef = useRef(null);

    const mockInterviewFlow = [
        { type: 'question', text: `Great! Let's start your mock interview for the **${role}** position. \n\nTell me about a challenging project you've worked on.` },
        { type: 'feedback', text: "That's a good start. When you describe a project, try using the STAR method (Situation, Task, Action, Result) to structure your answer clearly. It really helps recruiters understand your impact." },
        { type: 'question', text: `Next question: How do you handle tight deadlines and pressure?` },
        { type: 'feedback', text: "Excellent. Highlighting your ability to prioritize and communicate is key. Always give a specific example if you can." },
        { type: 'question', text: `Final question: Why are you interested in the **${role}** field?` },
        { type: 'feedback', text: "Thank you for completing the mock interview! You did great. Remember to review your answers and practice them out loud." }
    ];
    
    useEffect(() => {
        // Start the interview
        setTimeout(() => {
            setMessages([mockInterviewFlow[0]]);
            setIsTyping(false);
        }, 1000);
    }, [role]); // Added role dependency

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);
    
    const handleSendMessage = () => {
        if (!input.trim() || isTyping) return;
        
        const userMessage = { type: 'answer', text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const nextStepIndex = messages.filter(m => m.type !== 'answer').length * 2;
            const feedback = mockInterviewFlow[nextStepIndex];
            const nextQuestion = mockInterviewFlow[nextStepIndex + 1];
            
            let newAiMessages = [];
            if (feedback) newAiMessages.push(feedback);
            if (nextQuestion) newAiMessages.push(nextQuestion);
            
            setMessages(prev => [...prev, ...newAiMessages]);
            setIsTyping(false);

            if (!nextQuestion) { // End of interview
                setTimeout(onEndInterview, 4000);
            }
        }, 2000);
    };

    return (
        <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl flex flex-col h-[70vh] shadow-xl animate-fade-in">
            <div className="p-4 border-b border-border dark:border-dark-border flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Bot size={20} className="text-primary"/> AI Interviewer</h3>
                <button onClick={onEndInterview} className="text-sm flex items-center gap-1.5 px-3 py-1 bg-danger/10 text-danger rounded-full hover:bg-danger/20 transition-colors">
                    <XCircle size={14}/> End Interview
                </button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                         {msg.sender !== 'user' && <div className="p-2 rounded-full flex-shrink-0 bg-primary text-white"><Bot size={20} /></div>}
                         <div className={`max-w-md md:max-w-lg p-3 rounded-lg shadow-sm ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-bg dark:bg-dark-border'}`}>
                             <p className="whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary dark:text-primary-300">$1</strong>') }} />
                         </div>
                         {msg.sender === 'user' && <div className="p-2 rounded-full flex-shrink-0 bg-accent text-white"><User size={20} /></div>}
                    </div>
                ))}
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
            <div className="p-4 border-t border-border dark:border-dark-border bg-bg/50 dark:bg-dark-border/50">
                <div className="flex gap-2">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type your answer..." className="flex-1 px-4 py-2 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" disabled={isTyping} />
                    <button onClick={handleSendMessage} disabled={isTyping} className="p-3 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-all hover:scale-105 shadow-md shadow-primary/30"><Send size={20} /></button>
                </div>
            </div>
        </div>
    );
};

// --- Main Mock Interview Page Component ---
const MockInterviewPage = () => {
  const [interviewState, setInterviewState] = useState('idle'); // 'idle', 'in_progress', 'finished'
  const { selectedRole } = useOutletContext(); // Get role from parent layout

  if (interviewState === 'in_progress') {
      return <InterviewPanel role={selectedRole || 'General'} onEndInterview={() => setInterviewState('finished')} />;
  }
  
  if (interviewState === 'finished') {
      return (
          <div className="text-center p-8 bg-surface dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border animate-fade-in">
              <h2 className="text-2xl font-bold text-success">Interview Complete!</h2>
              <p className="mt-2 text-text-secondary dark:text-dark-text-secondary">Great work! You can review your performance or start a new interview.</p>
              <button onClick={() => setInterviewState('idle')} className="mt-6 px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-700">
                  Back to Menu
              </button>
          </div>
      )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <div className="bg-gradient-to-br from-primary-50 to-bg dark:from-dark-surface dark:to-primary-900/20 border border-border dark:border-dark-border rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-lg font-semibold text-text dark:text-dark-text">Become a Smart Applicant</h3>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">The more you practice, the closer you get to acing your dream job interview!</p>
        
        <h4 className="font-semibold pt-4 border-t border-border dark:border-dark-border text-primary dark:text-primary-300">Start mock interview based on:</h4>
        <div className="space-y-3">
          <button onClick={() => setInterviewState('in_progress')} className="w-full flex justify-between items-center p-3 bg-surface dark:bg-dark-surface hover:bg-white dark:hover:bg-dark-border hover:shadow-lg hover:border-accent border border-border dark:border-dark-border transition-all rounded-lg text-left shadow-sm">
            <span className="flex items-center gap-3 font-semibold"><Briefcase size={18} className="text-accent"/> Your Target Job ({selectedRole || 'General'})</span>
            <ChevronRight size={16} className="text-text-secondary"/>
          </button>
          <button onClick={() => setInterviewState('in_progress')} className="w-full flex justify-between items-center p-3 bg-surface dark:bg-dark-surface hover:bg-white dark:hover:bg-dark-border hover:shadow-lg hover:border-accent border border-border dark:border-dark-border transition-all rounded-lg text-left shadow-sm">
            <span className="flex items-center gap-3 font-semibold"><Zap size={18} className="text-accent"/> Specific Skills</span>
            <ChevronRight size={16} className="text-text-secondary"/>
          </button>
          <button onClick={() => setInterviewState('in_progress')} className="w-full flex justify-between items-center p-3 bg-surface dark:bg-dark-surface hover:bg-white dark:hover:bg-dark-border hover:shadow-lg hover:border-accent border border-border dark:border-dark-border transition-all rounded-lg text-left shadow-sm">
            <span className="flex items-center gap-3 font-semibold"><FileText size={18} className="text-accent"/> Your Resume</span>
            <ChevronRight size={16} className="text-text-secondary"/>
          </button>
        </div>
      </div>

      <div className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-4">Your Attempted Interviews</h3>
        <div className="text-center py-12 border-2 border-dashed border-border dark:border-dark-border rounded-lg">
          <Briefcase size={32} className="mx-auto text-text-secondary/50 dark:text-dark-text-secondary/50" />
          <p className="mt-4 text-text-secondary dark:text-dark-text-secondary">No Mock Interviews Attempted Yet</p>
          <p className="text-xs text-text-secondary/70 dark:text-dark-text-secondary/70 mt-1">Your past attempts will show up here.</p>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;