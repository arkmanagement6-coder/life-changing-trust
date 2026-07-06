import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I am LIFE Assist, your AI fundraising guide. How can I help you support our healthcare & education missions today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const qaDatabase = [
    {
      keywords: ["80g", "tax", "exemption", "benefit", "receipt"],
      reply: "All donations to the Life Changing Educational & Charitable Trust are eligible for a 50% tax deduction under Section 80G of the Income Tax Act. Provide your PAN number during checkout to automatically sync the receipt under your e-filing profile."
    },
    {
      keywords: ["where", "money", "leakage", "disbursed", "direct"],
      reply: "We enforce direct-to-vendor settlements. For healthcare, we disburse funds directly to the hospital (e.g. Apollo, Tata Memorial). For education, we settle bills directly with the laptop suppliers and school boards. 85.4% of funds go straight to the cause!"
    },
    {
      keywords: ["volunteer", "join", "tasks"],
      reply: "You can become a volunteer by selecting 'Role: Volunteer' in the navigation bar. You will get immediate access to our Task Board, where you can claim translation, event organizing, or auditing tasks and earn points!"
    },
    {
      keywords: ["corporate", "csr", "alliance"],
      reply: "We are MCA-certified (Form CSR-1: CSR00012345). Corporate partners can register, download custom co-branded proposals, and track project milestones through our CSR Dashboard."
    }
  ];

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const newMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      const query = textToSend.toLowerCase();
      let matchedReply = "I am a compliance-focused assistant. I can answer questions about 80G tax certificates, direct hospital disbursals, volunteering, and CSR programs. Try asking: 'How do I claim 80G tax benefit?'";

      for (const item of qaDatabase) {
        if (item.keywords.some(keyword => query.includes(keyword))) {
          matchedReply = item.reply;
          break;
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: matchedReply }]);
    }, 1000);
  };

  const handlePresetClick = (prompt) => {
    handleSend(prompt);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999 }}>
      
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(15, 138, 95, 0.3)',
            transition: 'transform 0.2s',
            color: 'white'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageSquare size={26} color="white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{
          background: 'white',
          width: '350px',
          height: '480px',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          border: '1px solid #cbd5e1',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          textAlign: 'left'
        }}>
          
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            padding: '16px 20px',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="white" />
              <div>
                <strong style={{ display: 'block', fontSize: '14.5px' }}>LIFE AI Assist</strong>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Active Support agent</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div style={{ flexGrow: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                style={{
                  alignSelf: m.sender === 'bot' ? 'flex-start' : 'flex-end',
                  maxWidth: '80%',
                  background: m.sender === 'bot' ? '#f1f5f9' : 'var(--primary)',
                  color: m.sender === 'bot' ? 'var(--text)' : 'white',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'bot' ? '4px 16px 16px 16px' : '16px 16px 4px 16px',
                  lineHeight: '1.4'
                }}
              >
                {m.text}
              </div>
            ))}
            
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '10px 14px', borderRadius: '4px 16px 16px 16px', display: 'flex', gap: '4px' }}>
                <span className="dot-typing" style={{ animationDelay: '0s' }}></span>
                <span className="dot-typing" style={{ animationDelay: '0.2s' }}></span>
                <span className="dot-typing" style={{ animationDelay: '0.4s' }}></span>
                <style>{`
                  .dot-typing {
                    width: 6px; height: 6px; background-color: #94a3b8; border-radius: 50%; display: inline-block;
                    animation: dotPulse 1.2s infinite ease-in-out;
                  }
                  @keyframes dotPulse {
                    0%, 100% { transform: scale(0.8); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 1; }
                  }
                `}</style>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '8px 16px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid #f1f5f9', whiteSpace: 'nowrap' }}>
            {['How do I claim 80G tax benefit?', 'Where do donations go?', 'How do I volunteer?'].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(prompt)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '6px 10px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: 'var(--text)'
                }}
              >
                {prompt.substring(0, 20)}...
              </button>
            ))}
          </div>

          {/* Input field */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
            style={{ padding: '12px 16px', borderTop: '1px solid #cbd5e1', display: 'flex', gap: '8px' }}
          >
            <input 
              type="text" 
              placeholder="Ask about 80G tax, safety..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flexGrow: 1,
                border: '1px solid #cbd5e1',
                borderRadius: '50px',
                padding: '8px 16px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'var(--font-body)'
              }}
            />
            <button 
              type="submit"
              style={{
                backgroundColor: 'var(--primary)',
                border: 'none',
                borderRadius: '50%',
                width: '34px', height: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <Send size={14} color="white" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
