import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Ticket, BookOpen, ChevronDown, ChevronUp, Send, Paperclip, Plus, X, Clock, Loader, CheckCircle } from 'lucide-react';

// --- Mock Data ---
const faqData = [
  { id: 1, question: "How do I apply for an internship?", answer: "Navigate to the 'Internships' page from the sidebar. You can browse, filter, and click 'Apply Now' on any internship card to start the process." },
  { id: 2, question: "How do I download my certificate?", answer: "Once an internship is completed and verified, a download link for your certificate will appear on the 'Dashboard' and in your 'Profile' section." },
  { id: 3, question: "What is NEP credit eligibility?", answer: "NEP Credit Eligible internships are recognized by the university and contribute to your academic credits as per the National Education Policy guidelines." },
];

const resourcesData = [
  { title: "User Guide: Getting Started", link: "#" },
  { title: "Video Tutorial: How to Generate a Report", link: "#" },
  { title: "NEP Internship Guidelines (PDF)", link: "#" },
];

const initialMessages = [
    { id: 1, sender: 'mentor', text: "Hi there! Let me know if you have any questions about your internship progress.", timestamp: "10:30 AM" },
    { id: 2, sender: 'student', text: "Hello! I have a question about my weekly report.", timestamp: "10:32 AM" },
];

const initialTickets = [
    { id: 1, title: 'Profile picture not updating', category: 'Profile Issue', status: 'Resolved' },
    { id: 2, title: 'Question about credit calculation', category: 'Credits', status: 'In Progress' },
    { id: 3, title: 'Unable to apply for internship', category: 'Technical', status: 'Open' },
];

// --- Sub-Components ---
const NewTicketModal = ({ isOpen, onClose, onRaiseTicket }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl w-full max-w-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Raise a Support Ticket</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700"><X size={20}/></button>
          </div>
          <form onSubmit={onRaiseTicket} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white">
                <option>Technical</option><option>Internship</option><option>Credits</option><option>Profile Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Describe your issue</label>
              <textarea rows="4" placeholder="Please provide as much detail as possible..." className="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-[#00C4CC] text-gray-900 font-semibold hover:bg-[#00B8C2]">Submit Ticket</button>
            </div>
          </form>
        </div>
      </div>
    );
};

// --- Main Support Component ---
const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [tickets, setTickets] = useState(initialTickets);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMessage = { id: Date.now(), sender: 'student', text: inputMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) };
    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    alert("Support ticket raised!");
    setIsTicketModalOpen(false);
  };

  const statusConfig = {
    'Open': { color: 'bg-blue-500' },
    'In Progress': { color: 'bg-yellow-500' },
    'Resolved': { color: 'bg-green-500' },
  };

  return (
    <>
      <NewTicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} onRaiseTicket={handleRaiseTicket} />
      <div className="lg:ml-64 p-6 pt-20 lg:pt-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-gray-400">Find answers to your questions and get guidance from your mentor.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chat with Mentor */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl">
              <h2 className="text-xl font-semibold text-white p-6 border-b border-gray-800 flex items-center gap-2"><MessageCircle size={22}/> Chat with Mentor</h2>
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.sender === 'student' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-3 rounded-lg max-w-lg ${msg.sender === 'student' ? 'bg-[#00C4CC] text-gray-900' : 'bg-gray-800 text-white'}`}>
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'student' ? 'text-gray-700' : 'text-gray-400'} text-right`}>{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 flex items-center gap-2">
                <button type="button" className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700"><Paperclip size={20} className="text-gray-400"/></button>
                <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} type="text" placeholder="Type your message..." className="flex-1 px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-[#00C4CC]"/>
                <button type="submit" className="p-3 bg-[#00C4CC] rounded-lg hover:bg-[#00B8C2]"><Send size={20} className="text-gray-900"/></button>
              </form>
            </div>
            
            {/* Ticket System */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Ticket size={22}/> My Support Tickets</h2>
                <button onClick={() => setIsTicketModalOpen(true)} className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700"><Plus size={16}/> Raise Ticket</button>
              </div>
              <div className="space-y-3">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="p-4 bg-gray-800/50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">{ticket.title}</p>
                      <p className="text-xs text-gray-400">{ticket.category}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[ticket.status].color}`}></div>
                      {ticket.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* FAQs */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2"><HelpCircle size={22}/> FAQs</h2>
              <div className="space-y-2">
                {faqData.map(faq => (
                  <div key={faq.id} className="border-b border-gray-800 last:border-b-0">
                    <button onClick={() => toggleFaq(faq.id)} className="w-full flex justify-between items-center text-left py-3">
                      <span className="font-medium text-white">{faq.question}</span>
                      {openFaq === faq.id ? <ChevronUp size={20} className="text-gray-400"/> : <ChevronDown size={20} className="text-gray-400"/>}
                    </button>
                    {openFaq === faq.id && <p className="pb-3 text-sm text-gray-300">{faq.answer}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2"><BookOpen size={22}/> Resources</h2>
              <div className="space-y-3">
                {resourcesData.map(res => (
                  <a key={res.title} href={res.link} className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 text-sm font-medium text-white transition-colors">{res.title}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;