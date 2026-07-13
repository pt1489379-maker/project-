import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, Button, Badge } from '../components/ui';
import { clsx } from 'clsx';

const MOCK_MESSAGES = [
  {
    id: '1',
    role: 'assistant',
    content: "Welcome to your AI Study Session! I've indexed all your notes. I can help you understand complex topics, test your knowledge, or generate concise summaries.\n\nWhat would you like to focus on today?",
    time: '11:30 AM',
  },
  {
    id: '2',
    role: 'user',
    content: 'Can you explain the difference between mitosis and meiosis from my biology notes? Keep it simple.',
    time: '11:31 AM',
  },
  {
    id: '3',
    role: 'assistant',
    content: "Based on your **Biology Chapter 5** notes, here is the fundamental difference:\n\n**Mitosis** (Growth & Repair)\nProduces 2 identical daughter cells. This is how your body grows and heals cuts. (Goes through 1 division cycle).\n\n**Meiosis** (Reproduction)\nProduces 4 unique daughter cells. This creates genetic diversity for reproduction. (Goes through 2 division cycles).\n\nWould you like me to generate a quick 5-question quiz to test your memory on this?",
    time: '11:31 AM',
    sources: ['Biology Chapter 5 - Cell Division.pdf'],
  },
];

const SUGGESTIONS = [
  { icon: '📝', text: 'Summarize this chapter' },
  { icon: '💡', text: 'Explain this concept simply' },
  { icon: '🎯', text: 'Create exam questions' },
  { icon: '🔍', text: 'Find important topics' },
];

function Message({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={clsx('flex gap-4 animate-slide-up opacity-0', isUser && 'flex-row-reverse')} style={{ animationFillMode: 'forwards' }}>
      {/* Avatar */}
      <div className={clsx(
        'w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0 mt-1 shadow-lg',
        isUser
          ? 'bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-blue-500/20'
          : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-purple-500/20 border border-purple-400/30'
      )}>
        {isUser ? 'A' : <span className="text-xl">🤖</span>}
      </div>

      {/* Bubble */}
      <div className={clsx('flex flex-col gap-2 max-w-[85%] md:max-w-[75%]', isUser && 'items-end')}>
        <div className={clsx(
          'px-5 py-4 text-[15px] leading-relaxed shadow-sm transition-all',
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-3xl rounded-tr-md'
            : 'bg-[hsl(var(--color-surface))] text-[hsl(var(--color-text))] border border-[hsl(var(--color-border))] rounded-3xl rounded-tl-md shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
        )}>
          {message.content.split('\n').map((line, i) => {
            if (!line) return <div key={i} className="h-2" />;
            const parts = line.split(/\*\*(.+?)\*\*/g);
            return (
              <p key={i} className={i > 0 ? 'mt-1' : ''}>
                {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className={isUser ? "text-white" : "text-blue-400"}>{part}</strong> : part)}
              </p>
            );
          })}
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.sources.map((src) => (
              <Badge key={src} variant="purple" className="text-xs border border-purple-500/20 shadow-sm px-2.5 py-1 gap-1.5 cursor-pointer hover:bg-purple-500/20 transition-colors">
                <span>📄</span> {src.length > 35 ? src.slice(0, 33) + '…' : src}
              </Badge>
            ))}
          </div>
        )}

        <div className={clsx("flex items-center gap-2 px-1 mt-1", isUser && "justify-end")}>
          <span className="text-[11px] font-medium text-[hsl(var(--color-text-faint))]">{message.time}</span>
          {isUser && <span className="text-[10px] text-blue-400">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-4 animate-fade-in">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20 shrink-0 mt-1 border border-purple-400/30">
        🤖
      </div>
      <div className="bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-3xl rounded-tl-md px-5 py-4 flex flex-col gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">AI is thinking...</span>
        <div className="flex items-center gap-1.5 mt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { uploadedFiles } = useApp();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState('all');
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "That's a fantastic question. Based on the selected context, here is the breakdown you need. I've highlighted the most crucial parts for your exam.\n\nKeep up the great work with your studies! Let me know if you want to dive deeper into this.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: selectedFile !== 'all' ? [uploadedFiles.find(f => f.id === selectedFile)?.name].filter(Boolean) : [],
        },
      ]);
    }, 2000 + Math.random() * 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-6rem)]">
      
      {/* Left Sidebar: Context & Tutor Options */}
      <div className="lg:w-[320px] shrink-0 flex flex-col gap-6">
        
        {/* Tutor Personality Panel */}
        <Card className="shrink-0 bg-gradient-to-br from-blue-900/10 to-[hsl(var(--color-surface))] border-blue-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full pointer-events-none" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl border border-blue-500/30 shadow-inner">
              🎓
            </div>
            <div>
              <h3 className="text-sm font-bold text-[hsl(var(--color-text))]">Tutor Mode</h3>
              <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Active</p>
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--color-text-muted))] leading-relaxed mb-4">
            I'm currently optimizing responses for <strong className="text-blue-400">deep learning</strong> and <strong className="text-blue-400">retention</strong>.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium bg-[hsl(var(--color-surface-2))] p-2 rounded-xl border border-[hsl(var(--color-border))]">
            <span className="text-amber-400">💡</span>
            <span className="text-[hsl(var(--color-text-muted))]">Tip: Ask me to quiz you!</span>
          </div>
        </Card>

        {/* Document Context Selector */}
        <Card className="shrink-0 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <span>📚</span> Document Context
            </h3>
            <Badge variant="blue" className="text-[10px]">Indexed</Badge>
          </div>
          <p className="text-xs text-[hsl(var(--color-text-faint))] mb-4">
            Select files for the AI to analyze:
          </p>
          
          <div className="flex-1 overflow-y-auto -mx-2 px-2 flex flex-col gap-2 custom-scrollbar">
            <label className={clsx(
              'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border',
              selectedFile === 'all' 
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                : 'bg-[hsl(var(--color-surface-2))] border-transparent hover:border-[hsl(var(--color-border))] text-[hsl(var(--color-text-muted))]'
            )}>
              <input type="radio" name="context" value="all" checked={selectedFile === 'all'} onChange={() => setSelectedFile('all')} className="hidden" />
              <div className="w-8 h-8 rounded-lg bg-[hsl(var(--color-surface-3))] flex items-center justify-center text-lg shrink-0">🌐</div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-sm block truncate">All Documents</span>
                <span className="text-[10px] opacity-70">Search across everything</span>
              </div>
              {selectedFile === 'all' && <span className="text-blue-400">✓</span>}
            </label>
            
            <div className="h-px bg-[hsl(var(--color-border))] my-1" />
            
            {uploadedFiles.map((file) => (
              <label key={file.id} className={clsx(
                'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border group',
                selectedFile === file.id 
                  ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                  : 'bg-transparent border-transparent hover:bg-[hsl(var(--color-surface-2))] text-[hsl(var(--color-text-muted))]'
              )}>
                <input type="radio" name="context" value={file.id} checked={selectedFile === file.id} onChange={() => setSelectedFile(file.id)} className="hidden" />
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--color-surface-2))] group-hover:bg-[hsl(var(--color-surface-3))] transition-colors flex items-center justify-center text-lg shrink-0">
                  {{ pdf: '📕', doc: '📘', md: '📗' }[file.type] || '📄'}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm block truncate text-[hsl(var(--color-text))]">{file.name}</span>
                  <span className="text-[10px] text-[hsl(var(--color-text-faint))]">{file.size}</span>
                </div>
                {selectedFile === file.id && <span className="text-purple-400">✓</span>}
              </label>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 rounded-3xl border border-[hsl(var(--color-border)/0.6)] bg-[hsl(var(--color-surface))] overflow-hidden shadow-2xl relative">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[100px] pointer-events-none" />

        {/* Chat Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface)/0.8)] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-[14px] bg-[hsl(var(--color-surface))] flex items-center justify-center text-2xl">
                  🤖
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[hsl(var(--color-surface))] flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold font-['Sora'] text-[hsl(var(--color-text))]">MindVault AI</h2>
              <p className="text-xs font-medium text-[hsl(var(--color-text-muted))] flex items-center gap-1.5 mt-0.5">
                <span className="text-emerald-400">Online</span> 
                <span className="text-[hsl(var(--color-border))]">•</span> 
                <span>Gemini 1.5 Pro Model</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-[hsl(var(--color-text-muted))]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Export
            </Button>
            <Button variant="secondary" size="sm" className="text-[hsl(var(--color-text))] border-[hsl(var(--color-border))]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 mr-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Clear
            </Button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 scroll-smooth relative z-10 custom-scrollbar">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} className="h-2" />
        </div>

        {/* Prompts & Input Area */}
        <div className="relative z-10 p-6 pt-2 bg-gradient-to-t from-[hsl(var(--color-surface))] via-[hsl(var(--color-surface))] to-transparent">
          
          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setInput(s.text)}
                className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--color-text-muted))] bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))] px-3 py-2 rounded-xl hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 transition-all shadow-sm transform hover:-translate-y-0.5"
              >
                <span>{s.icon}</span> {s.text}
              </button>
            ))}
          </div>

          {/* Premium Input Box */}
          <div className="relative bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))] rounded-2xl p-2 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all shadow-md flex items-end gap-2">
            
            {/* Attachment Button */}
            <button className="w-10 h-10 shrink-0 flex items-center justify-center text-[hsl(var(--color-text-muted))] hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question or type '/' for commands..."
              rows={1}
              className="flex-1 bg-transparent text-[15px] text-[hsl(var(--color-text))] placeholder:text-[hsl(var(--color-text-faint))] resize-none outline-none leading-relaxed max-h-[150px] overflow-y-auto py-2.5 custom-scrollbar"
            />
            
            {/* Voice Input / Send Button */}
            <div className="shrink-0 flex gap-2">
              {!input.trim() ? (
                <button className="w-10 h-10 flex items-center justify-center text-[hsl(var(--color-text-muted))] hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                </button>
              ) : (
                <button
                  onClick={sendMessage}
                  disabled={isTyping}
                  className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 ml-0.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 text-[11px] font-medium text-[hsl(var(--color-text-faint))]">
            <span>Powered by Gemini 1.5 Pro</span>
            <span className="w-1 h-1 bg-[hsl(var(--color-border))] rounded-full" />
            <span>Shift + Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
}
