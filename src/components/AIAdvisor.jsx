import React, { useState } from 'react';
import { Send, User, Bot, Lightbulb, FileText, Target, Briefcase } from 'lucide-react';

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Hi there! I'm your AI Career Advisor. I'm here to help you with your career goals. Ask me anything!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickQuestions = [
    {
      icon: FileText,
      text: "How can I improve my resume?",
      color: "#00C4CC"
    },
    {
      icon: Target,
      text: "What skills should I focus on?",
      color: "#10B981"
    },
    {
      icon: Briefcase,
      text: "Find internships for me",
      color: "#F59E0B"
    },
    {
      icon: Lightbulb,
      text: "Career transition advice",
      color: "#8B5CF6"
    }
  ];

  const recommendations = [
    {
      title: "Data Science Internship",
      company: "TechCorp",
      match: "95%",
      reason: "Matches your Python and Machine Learning skills"
    },
    {
      title: "Machine Learning Engineer",
      company: "AI Solutions",
      match: "88%",
      reason: "Aligns with your data analysis experience"
    }
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: "That's a great question! Based on your profile and current skills, I'd recommend focusing on building more hands-on projects in your portfolio.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    // FIX: Added layout classes for correct positioning within the app shell
    <div className="lg:ml-64 p-6 pt-20 lg:pt-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Advisor</h1>
        <p className="text-gray-400">Get personalized career guidance and recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-[#00C4CC]' 
                      : 'bg-gray-700'
                  }`}>
                    {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div
                    className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#00C4CC] text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00C4CC]"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-[#00C4CC] text-white rounded-lg hover:bg-[#00B8C2] transition-colors duration-200"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Quick Questions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => {
                const Icon = question.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question.text)}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-left transition-colors duration-200"
                  >
                    <Icon size={20} style={{ color: question.color }} />
                    <span className="text-gray-300">{question.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white">{rec.title}</h4>
                    <span 
                      className="text-sm font-bold px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: '#10B98120',
                        color: '#10B981'
                      }}
                    >
                      {rec.match}
                    </span>
                  </div>
                  <p className="text-[#00C4CC] text-sm mb-2">{rec.company}</p>
                  <p className="text-gray-400 text-sm">{rec.reason}</p>
                  <button className="mt-3 w-full px-4 py-2 bg-[#00C4CC] text-white rounded-lg hover:bg-[#00B8C2] transition-colors duration-200">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Career Insights</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1 text-white">Top Skill Gap</h4>
                <p className="text-gray-400 text-sm">Cloud Computing</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1 text-white">Market Demand</h4>
                <p className="text-gray-400 text-sm">High for your skillset</p>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1 text-white">Salary Range</h4>
                <p className="text-gray-400 text-sm">$60k - $85k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;