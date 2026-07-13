import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from '../components/ui';

/* ─── Animated gradient orbs in the background ─── */
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-60 -right-20 w-[700px] h-[700px] rounded-full bg-violet-600/8 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[80px]" />
    </div>
  );
}

/* ─── 3D Elements using CSS and emoji ─── */
function FloatingElement({ icon, className, delay = '0s', animation = 'animate-float' }) {
  return (
    <div
      className={`absolute ${animation} ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="glass-dark rounded-2xl p-4 shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-500/20 text-4xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
    </div>
  );
}

function FloatingCard({ className, delay = '0s', children }) {
  return (
    <div
      className={`glass rounded-2xl p-4 shadow-xl animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({ icon, title, description, color }) {
  const colorMap = {
    blue:    'from-blue-500/20 to-blue-600/5 border-blue-500/20 group-hover:border-blue-500/40',
    purple:  'from-purple-500/20 to-purple-600/5 border-purple-500/20 group-hover:border-purple-500/40',
    emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 group-hover:border-emerald-500/40',
    amber:   'from-amber-500/20 to-amber-600/5 border-amber-500/20 group-hover:border-amber-500/40',
  };
  const iconColor = {
    blue: 'text-blue-400', purple: 'text-purple-400', emerald: 'text-emerald-400',
    amber: 'text-amber-400',
  };
  return (
    <div className={`group relative rounded-3xl border bg-gradient-to-br ${colorMap[color]} p-px transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]`}>
      <div className="rounded-3xl bg-[hsl(var(--color-surface))] p-8 h-full flex flex-col items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-[hsl(var(--color-surface-2))] flex items-center justify-center text-3xl shadow-inner ${iconColor[color]}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mb-2 font-['Sora']">{title}</h3>
          <p className="text-[hsl(var(--color-text-muted))] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Testimonial card ─── */
function TestimonialCard({ name, role, avatar, quote }) {
  return (
    <div className="glass-dark rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-[hsl(var(--color-text-faint)/0.4)] transition-colors">
      <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl group-hover:opacity-20 transition-opacity">"</div>
      <p className="text-[hsl(var(--color-text-muted))] leading-relaxed italic relative z-10 text-lg">"{quote}"</p>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
          {avatar}
        </div>
        <div>
          <p className="font-bold text-[hsl(var(--color-text))]">{name}</p>
          <p className="text-sm text-[hsl(var(--color-text-faint))]">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--color-bg))] text-[hsl(var(--color-text))] relative overflow-x-hidden">
      <GradientOrbs />

      {/* ── NAVBAR ── */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 h-24 border-b border-[hsl(var(--color-border)/0.5)] glass sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-2xl font-bold font-['Sora'] text-gradient">MindVault</span>
          <span className="text-sm font-semibold text-[hsl(var(--color-text-faint))]">AI</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Features', 'How it works', 'Showcase', 'Pricing'].map((item) => (
            <a key={item} href="#" className="text-[hsl(var(--color-text-muted))] hover:text-white font-medium transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="md" onClick={() => navigate('/dashboard')}>Log in</Button>
          <Button variant="gradient" size="md" onClick={() => navigate('/dashboard')}>Start Learning</Button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-12 text-center max-w-7xl mx-auto">
        
        {/* Subtle 3D Floating Elements */}
        <FloatingElement icon="📚" className="top-20 left-[10%] hidden lg:block" delay="0s" animation="animate-float" />
        <FloatingElement icon="🔮" className="top-40 right-[15%] hidden lg:block" delay="1s" animation="animate-pulse-slow" />
        <FloatingElement icon="📄" className="bottom-20 left-[20%] hidden lg:block" delay="2s" animation="animate-float" />

        <Badge variant="purple" dot className="mb-8 mx-auto px-4 py-1.5 text-sm shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          MindVault AI 2.0 is live
        </Badge>

        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black font-['Sora'] leading-[1.05] mb-8 tracking-tight">
          Your Personal <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 glow-text">
            AI Study Companion
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-[hsl(var(--color-text-muted))] max-w-3xl mx-auto leading-relaxed mb-12">
          Upload your notes, ask questions in natural language, generate instant summaries, and create smart quizzes. Elevate your academic performance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Button
            variant="gradient"
            size="xl"
            rightIcon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 ml-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto min-w-56 text-lg glow-blue py-4"
          >
            Start Learning
          </Button>
          <Button variant="secondary" size="xl" className="w-full sm:w-auto min-w-56 text-lg py-4 border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface)/0.5)] backdrop-blur-md">
            Explore Features
          </Button>
        </div>
      </section>

      {/* ── STUDENT PRODUCTIVITY SHOWCASE ── */}
      <section className="relative z-20 px-6 lg:px-12 max-w-7xl mx-auto mb-32 -mt-10">
        <div className="relative rounded-[2rem] border border-[hsl(var(--color-border)/0.5)] bg-[hsl(var(--color-surface)/0.6)] backdrop-blur-2xl p-2 shadow-[0_0_100px_rgba(59,130,246,0.15)] overflow-hidden group">
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[hsl(var(--color-border)/0.5)]">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            <div className="flex-1 mx-6 h-8 bg-black/40 rounded-xl flex items-center justify-center gap-2 border border-white/5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-[hsl(var(--color-text-faint))]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="text-sm text-[hsl(var(--color-text-muted))]">app.mindvault.ai</span>
            </div>
          </div>

          {/* Mock dashboard */}
          <div className="flex h-[500px] sm:h-[600px] overflow-hidden rounded-b-[1.75rem] relative">
            {/* Overlay gradient on mock dashboard for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none z-10" />
            
            {/* Mini sidebar */}
            <div className="w-16 sm:w-64 bg-[hsl(var(--color-surface))] border-r border-[hsl(var(--color-border))] p-4 flex flex-col gap-2 shrink-0 relative z-0">
              <div className="flex items-center gap-3 p-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shrink-0 shadow-lg" />
                <span className="hidden sm:block text-lg font-bold text-gradient">MindVault</span>
              </div>
              {[
                { icon: '▦', label: 'Dashboard', active: true },
                { icon: '🗄', label: 'My Vault' },
                { icon: '💬', label: 'AI Chat', badge: 'New' },
                { icon: '❓', label: 'Quizzes' },
                { icon: '📄', label: 'Summaries' },
              ].map((item) => (
                <div key={item.label} className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${item.active ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))]'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="hidden sm:block">{item.label}</span>
                  </div>
                  {item.badge && <span className="hidden sm:block text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full uppercase tracking-wider">{item.badge}</span>}
                </div>
              ))}
            </div>

            {/* Main area */}
            <div className="flex-1 p-6 sm:p-10 bg-[#0A0C10] overflow-hidden relative z-0">
              
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-bold font-['Sora'] mb-1">Welcome back, Student</h2>
                  <p className="text-[hsl(var(--color-text-muted))]">Here is your study overview for today.</p>
                </div>
                <div className="hidden sm:flex bg-[hsl(var(--color-surface-2))] rounded-xl p-1 border border-[hsl(var(--color-border))]">
                  <div className="px-4 py-2 bg-[hsl(var(--color-surface-3))] rounded-lg text-sm font-medium shadow">Overview</div>
                  <div className="px-4 py-2 text-sm text-[hsl(var(--color-text-muted))]">Analytics</div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Notes', value: '42', icon: '📚', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { label: 'Avg Quiz Score', value: '91%', icon: '🎯', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { label: 'Summaries', value: '18', icon: '✨', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { label: 'Study Streak', value: '14 Days', icon: '🔥', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-5 hover:border-white/20 transition-colors">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center text-xl mb-4`}>{s.icon}</div>
                    <div className="text-2xl font-bold mb-1">{s.value}</div>
                    <div className="text-sm text-[hsl(var(--color-text-muted))]">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Activity area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] p-6">
                  <h3 className="font-semibold mb-6 font-['Sora']">Recent Processing</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Advanced Machine Learning.pdf', status: 'Summarized', color: 'text-emerald-400' },
                      { name: 'Neuroscience Chapter 4.docx', status: 'Quiz Generated', color: 'text-purple-400' },
                      { name: 'World History - Renaissance.md', status: 'Indexed for Chat', color: 'text-blue-400' },
                    ].map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[hsl(var(--color-surface-3))] flex items-center justify-center text-sm">📄</div>
                          <span className="font-medium text-sm">{f.name}</span>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider ${f.color}`}>{f.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="rounded-2xl border border-[hsl(var(--color-border))] bg-gradient-to-b from-[hsl(var(--color-surface))] to-blue-900/10 p-6 flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-4xl mb-4 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                     🤖
                   </div>
                   <h3 className="font-bold mb-2">AI Assistant Ready</h3>
                   <p className="text-sm text-[hsl(var(--color-text-muted))] mb-6">Ask questions about your uploaded materials.</p>
                   <Button variant="primary" size="sm" fullWidth>Open Chat</Button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Floating cards over the dashboard */}
        <FloatingCard className="absolute -left-6 top-1/4 hidden xl:block w-64 border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] bg-[#0A0C10]/80 backdrop-blur-xl" delay="0s">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">✨</div>
            <div>
              <p className="text-sm font-bold">Summary Ready</p>
              <p className="text-xs text-[hsl(var(--color-text-muted))]">Just now</p>
            </div>
          </div>
          <p className="text-xs text-[hsl(var(--color-text))] leading-relaxed bg-[hsl(var(--color-surface))] p-3 rounded-xl border border-[hsl(var(--color-border))]">
            "Machine learning is a subset of AI that focuses on building systems that learn from data..."
          </p>
        </FloatingCard>

        <FloatingCard className="absolute -right-6 top-1/3 hidden xl:block w-56 border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] bg-[#0A0C10]/80 backdrop-blur-xl" delay="2s">
          <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--color-text-muted))] mb-2">Quiz Results</p>
          <div className="text-5xl font-black text-amber-400 mb-2 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">94%</div>
          <p className="text-sm font-medium mb-1">Neuroscience Ch. 4</p>
          <p className="text-xs text-[hsl(var(--color-text-faint))]">Excellent work! 🌟</p>
        </FloatingCard>

      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold font-['Sora'] mb-6">Unleash your potential</h2>
          <p className="text-xl text-[hsl(var(--color-text-muted))] max-w-2xl mx-auto leading-relaxed">
            A comprehensive suite of AI tools designed specifically for students and lifelong learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard 
            color="blue"    
            icon="💬" 
            title="AI Document Chat"         
            description="Converse with your textbooks and notes. Ask complex questions and get precise, cited answers extracted directly from your uploaded materials." 
          />
          <FeatureCard 
            color="emerald" 
            icon="📝" 
            title="Smart Summaries"       
            description="Don't have time to read 50 pages? Our AI digests dense academic texts into beautifully formatted, high-yield summary notes in seconds." 
          />
          <FeatureCard 
            color="amber"   
            icon="🎯" 
            title="Quiz Generator"        
            description="Test your knowledge before the exam. Instantly generate multiple-choice, flashcards, or short-answer quizzes based on your specific curriculum." 
          />
          <FeatureCard 
            color="purple"  
            icon="📅" 
            title="Study Planner"      
            description="Organize your learning journey. AI analyzes your syllabi and creates an optimized daily study schedule to ensure you ace your finals." 
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto py-24 border-y border-[hsl(var(--color-border)/0.5)] bg-[hsl(var(--color-surface-2)/0.3)]">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold font-['Sora'] mb-6">How MindVault works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20" />
          
          {[
            { step: '01', icon: '📤', title: 'Upload', desc: 'Drag and drop your PDFs, Word documents, or Markdown notes into your secure vault.' },
            { step: '02', icon: '🧠', title: 'AI Understands', desc: 'Our advanced embedding engine reads, indexes, and comprehends your entire knowledge base.' },
            { step: '03', icon: '🚀', title: 'Learn Faster', desc: 'Chat, summarize, and quiz yourself. Retain information faster and score higher.' },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] flex items-center justify-center text-4xl shadow-xl group-hover:border-blue-500 transition-colors">
                {s.icon}
              </div>
              <div>
                <Badge variant="default" className="mb-3">{s.step}</Badge>
                <h3 className="text-2xl font-bold font-['Sora'] mb-3">{s.title}</h3>
                <p className="text-[hsl(var(--color-text-muted))] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold font-['Sora'] mb-6">Loved by top students</h2>
          <p className="text-xl text-[hsl(var(--color-text-muted))]">Join thousands of students upgrading their GPAs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Elena Rodriguez" 
            role="Medical Student at Stanford" 
            avatar="ER" 
            quote="MindVault AI is literally a lifesaver. I upload 200-page pathology slide decks and it creates instant, highly accurate summaries and quizzes. My study time is cut in half." 
          />
          <TestimonialCard 
            name="David Chen" 
            role="Computer Science Undergrad" 
            avatar="DC" 
            quote="The ability to chat with my discrete math textbook is mind-blowing. Whenever I'm stuck on a proof, I just ask the AI and it points me to the exact page and explains it simply." 
          />
          <TestimonialCard 
            name="Sarah Jenkins" 
            role="Law Student at Harvard" 
            avatar="SJ" 
            quote="Law school requires reading thousands of pages of cases. MindVault extracts the facts, issues, and rulings instantly. It's the ultimate competitive advantage." 
          />
        </div>
      </section>

      {/* ── FINAL CTA SECTION ── */}
      <section className="relative z-10 px-6 lg:px-12 max-w-5xl mx-auto pb-32">
        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-violet-900/30 to-[#0A0C10] z-0" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent z-0" />
          
          <div className="relative z-10 p-12 sm:p-20 text-center">
            <h2 className="text-5xl sm:text-6xl font-black font-['Sora'] mb-6 tracking-tight">
              Ready to ace your <br className="hidden sm:block"/> next exam?
            </h2>
            <p className="text-xl text-blue-100/70 mb-10 max-w-2xl mx-auto">
              Stop struggling with messy notes. Build your personal AI brain today. Free forever for students.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gradient"
                size="xl"
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-10 py-5 text-lg shadow-[0_0_40px_rgba(59,130,246,0.5)]"
              >
                Get Started For Free
              </Button>
            </div>
            <p className="text-sm text-[hsl(var(--color-text-faint))] mt-6">
              No credit card required. 50GB free storage included.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-[hsl(var(--color-border))] px-6 lg:px-12 py-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-4 h-4">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-gradient font-['Sora']">MindVault AI</span>
          </div>
          <p className="text-sm text-[hsl(var(--color-text-faint))]">© 2026 MindVault AI Inc. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Help Center'].map((l) => (
              <a key={l} href="#" className="text-sm text-[hsl(var(--color-text-muted))] hover:text-white transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
