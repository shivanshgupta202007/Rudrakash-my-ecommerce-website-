import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, X, Bot, Sparkles, RefreshCw, ChevronDown, Check } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const { lang, setActivePage, setFilters, setSelectedProduct, products = [] } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  // Initialize with a welcome greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: lang === 'en' 
            ? "Namaste! I am your Rudrakash AI Concierge. I can help you find personalized laser-etched gifts, pure Banarasi silk sarees, premium kitchenware, or track your delivery pincode. What may I discover for you today?"
            : "नमस्ते! मैं आपका रुद्राक्ष एआई गाइड हूँ। मैं आपको उपहार, शुद्ध रेशम साड़ियाँ खोजने या डिलीवरी पिनकोड जांचने में मदद कर सकता हूँ। आज मैं आपकी क्या सहायता करूँ?"
        }
      ]);
    }
  }, [lang]);

  // Keep chat scrolled to bottom
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Append User message
    const userMsg: ChatMessage = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Direct call to our custom Express endpoint `/api/chat`
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history: [] })
      });
      const data = await response.json();
      
      const botMsg: ChatMessage = {
        sender: 'bot',
        text: data.reply || "I apologize, our digital looms are updating. Please try again in a moment!"
      };
      setMessages(prev => [...prev, botMsg]);

      // Simple keyword triggers to automate listing navigation on search query
      const lower = textToSend.toLowerCase();
      if (lower.includes('gift') || lower.includes('frame') || lower.includes('plaque') || lower.includes('wood')) {
        // Recommend gifts category
        setFilters((prev: any) => ({ ...prev, category: 'Personalized Gifts' }));
        setActivePage('listing');
      } else if (lower.includes('saree') || lower.includes('cloth') || lower.includes('silk') || lower.includes('dress')) {
        // Recommend clothing
        setFilters((prev: any) => ({ ...prev, category: 'Clothing' }));
        setActivePage('listing');
      } else if (lower.includes('kitchen') || lower.includes('copper') || lower.includes('brass')) {
        setFilters((prev: any) => ({ ...prev, category: 'Kitchen Items' }));
        setActivePage('listing');
      }

    } catch (err) {
      const botMsg: ChatMessage = {
        sender: 'bot',
        text: "I am having difficulty reaching the central servers. However, you can browse all our 12 categories from the navigation bar above!"
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const QUICK_PROMPTS = [
    { text: "What personalized gifts do you offer?", label: "🎁 Gifts" },
    { text: "Do you sell authentic silk sarees?", label: "🧵 Silks" },
    { text: "Track my delivery pincode 221005", label: "📍 Pincode" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-xs">
      
      {/* 1. FLOATING GLOWING ACTION BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-orange-500 text-white shadow-2xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer relative group"
        >
          {/* Active green pulse indicator */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          
          <Bot className="w-6 h-6 animate-[bounce_3s_infinite]" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 font-extrabold tracking-wide whitespace-nowrap">
            Rudrakash AI
          </span>
        </button>
      )}

      {/* 2. CHAT DRAWER PANEL */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] shadow-2xl w-80 md:w-96 h-[500px] flex flex-col justify-between relative overflow-hidden animate-slide-up">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 p-4 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 rounded-xl">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-extrabold flex items-center gap-1">
                  <span>Rudrakash AI Guide</span>
                  <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  <span>Online • Powered by Gemini 3.5</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list zone */}
          <div 
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/40"
          >
            {messages.map((m, idx) => {
              const isBot = m.sender === 'bot';
              return (
                <div 
                  key={idx} 
                  className={`flex items-end gap-2.5 max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  {isBot && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] shrink-0">
                      🕉️
                    </div>
                  )}
                  
                  <div className={`p-3.5 rounded-2xl leading-relaxed text-[11px] font-medium ${
                    isBot 
                      ? 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 rounded-bl-none shadow-sm' 
                      : 'bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-br-none shadow-md'
                  }`}>
                    {m.text}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-center gap-2 mr-auto max-w-[85%] animate-pulse">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] shrink-0">
                  🤖
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 text-slate-400 border border-slate-100 dark:border-slate-800 rounded-bl-none flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Weaving recommendation...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick prompt templates footer chips */}
          {messages.length < 3 && (
            <div className="px-4 py-2 flex flex-wrap gap-1.5 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 shrink-0">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp.text)}
                  className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 text-[10px] font-semibold border border-slate-200/40 dark:border-slate-700/60 transition-colors cursor-pointer shrink-0"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          )}

          {/* Chat Form entry */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2 shrink-0 items-center"
          >
            <input
              type="text"
              placeholder="Ask Rudrakash AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer disabled:opacity-40 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
