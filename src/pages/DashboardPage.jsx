import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Card, StatCard, Button, Badge, ProgressBar, Divider } from '../components/ui';
import { clsx } from 'clsx';

const fileColorMap = {
  blue:    { bg: 'bg-blue-500/10',    text: 'text-blue-400',    dot: 'bg-blue-500',    border: 'border-blue-500/20' },
  purple:  { bg: 'bg-purple-500/10',  text: 'text-purple-400',  dot: 'bg-purple-500',  border: 'border-purple-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-500', border: 'border-emerald-500/20' },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   dot: 'bg-amber-500',   border: 'border-amber-500/20' },
};

const fileTypeIcon = {
  pdf: '📕',
  doc: '📘',
  md:  '📗',
  txt: '📄',
};

function ActivityItem({ icon, title, desc, time, color }) {
  return (
    <div className="flex items-start gap-4 py-4 group hover:bg-[hsl(var(--color-surface-2)/0.5)] -mx-2 px-2 rounded-xl transition-all duration-300">
      <div className={clsx('w-10 h-10 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-inner', fileColorMap[color]?.bg || 'bg-[hsl(var(--color-surface-2))]', fileColorMap[color]?.text)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-semibold text-[hsl(var(--color-text))] truncate group-hover:text-blue-400 transition-colors duration-200">{title}</p>
        <p className="text-sm text-[hsl(var(--color-text-muted))] truncate mt-0.5">{desc}</p>
      </div>
      <span className="text-xs font-medium text-[hsl(var(--color-text-faint))] shrink-0 pt-1">{time}</span>
    </div>
  );
}

export default function DashboardPage() {
  const { uploadedFiles, quizzes } = useApp();
  const navigate = useNavigate();

  const completedQuizzes = quizzes.filter((q) => q.completed);
  const avgScore = completedQuizzes.length
    ? Math.round(completedQuizzes.reduce((a, q) => a + q.score, 0) / completedQuizzes.length)
    : 0;

  return (
    <div className="space-y-8 pb-10">
      
      {/* Premium Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-900/40 via-violet-900/20 to-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] p-8 sm:p-10 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 p-1 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full rounded-[14px] bg-[hsl(var(--color-surface))] flex items-center justify-center text-3xl">
                👋
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold font-['Sora'] tracking-tight">Welcome back, Alex!</h1>
                <Badge variant="blue" className="hidden sm:inline-flex animate-pulse-slow shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-blue-400/30">AI Active</Badge>
              </div>
              <p className="text-[hsl(var(--color-text-muted))] text-lg">You have <strong className="text-blue-400 font-semibold">{uploadedFiles.length} files</strong> indexed and <strong className="text-purple-400 font-semibold">{quizzes.length} pending quizzes</strong>.</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 bg-[hsl(var(--color-surface-2)/0.6)] backdrop-blur-md p-2 rounded-2xl border border-[hsl(var(--color-border))] shadow-inner">
            <div className="px-5 py-2">
              <p className="text-xs font-semibold text-[hsl(var(--color-text-faint))] uppercase tracking-wider mb-1">Today's Goal</p>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[hsl(var(--color-surface-3))] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 w-[60%]" />
                </div>
                <span className="text-sm font-bold text-emerald-400">60%</span>
              </div>
            </div>
            <div className="w-px h-10 bg-[hsl(var(--color-border))]" />
            <Button variant="primary" size="md" className="mr-1 glow-blue" onClick={() => navigate('/chat')}>
              Resume Study
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          { label: 'Study Files',   value: uploadedFiles.length, icon: '📁', color: 'blue',    trend: 12, label: 'vs last month' },
          { label: 'Quizzes Taken', value: quizzes.length,       icon: '🎯', color: 'purple',  trend: 8,  label: 'this week' },
          { label: 'Avg. Score',    value: `${avgScore}%`,       icon: '⚡', color: 'amber',   trend: 5,  label: 'up from 82%' },
          { label: 'Hours Studied', value: '24h',                icon: '⏱', color: 'emerald', trend: 20, label: 'this week' },
        ].map((stat, i) => (
          <div key={i} className="group relative rounded-2xl p-px bg-gradient-to-br from-[hsl(var(--color-border))] to-transparent hover:from-blue-500/30 hover:to-purple-500/10 transition-all duration-300">
            <div className="h-full rounded-2xl bg-[hsl(var(--color-surface))] p-5 hover:bg-[hsl(var(--color-surface)/0.8)] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner', fileColorMap[stat.color].bg, fileColorMap[stat.color].text)}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-3 h-3"><path d="m5 12 7-7 7 7M12 19V5"/></svg>
                  {stat.trend}%
                </div>
              </div>
              <div className="text-3xl font-bold font-['Sora'] mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-[hsl(var(--color-text-muted))]">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Quick Actions */}
      <div>
        <h2 className="text-xl font-bold font-['Sora'] mb-5 flex items-center gap-2">
          <span className="text-2xl">⚡</span> Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Upload Notes', desc: 'Add new study materials', icon: '📤', color: 'blue',    action: () => navigate('/vault') },
            { title: 'Ask AI Assistant', desc: 'Chat with your files', icon: '💬', color: 'purple',  action: () => navigate('/chat') },
            { title: 'Generate Quiz', desc: 'Test your knowledge', icon: '🎯', color: 'amber',   action: () => navigate('/quiz') },
            { title: 'Create Summary', desc: 'Get a quick overview', icon: '✨', color: 'emerald', action: () => navigate('/summary') },
          ].map((qa) => (
            <button
              key={qa.title}
              onClick={qa.action}
              className={clsx(
                'relative overflow-hidden group flex flex-col items-start p-6 rounded-2xl border bg-[hsl(var(--color-surface))]',
                fileColorMap[qa.color].border,
                'hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-left'
              )}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${fileColorMap[qa.color].bg} opacity-20 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-500`} />
              <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm', fileColorMap[qa.color].bg, fileColorMap[qa.color].text)}>
                {qa.icon}
              </div>
              <h3 className="font-bold text-[hsl(var(--color-text))] mb-1 font-['Sora']">{qa.title}</h3>
              <p className="text-sm text-[hsl(var(--color-text-muted))]">{qa.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Recent files + activity */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Interactive Recent Files */}
          <Card className="border-[hsl(var(--color-border)/0.8)] shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-['Sora']">Recent Files</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/vault')} className="text-blue-400 hover:bg-blue-500/10">View all files →</Button>
            </div>
            
            <div className="flex flex-col gap-4">
              {uploadedFiles.slice(0, 3).map((file) => {
                const c = fileColorMap[file.color] || fileColorMap.blue;
                return (
                  <div
                    key={file.id}
                    className="group relative flex items-center gap-4 p-4 rounded-2xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-surface))] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] cursor-pointer transition-all duration-300"
                  >
                    <div className={clsx('w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-inner', c.bg, c.text)}>
                      {fileTypeIcon[file.type] || '📄'}
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-20 transition-opacity duration-300 group-hover:opacity-10 sm:group-hover:opacity-100">
                      <p className="text-base font-bold text-[hsl(var(--color-text))] truncate mb-1">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-[hsl(var(--color-text-muted))]">{file.size}</span>
                        <span className="w-1 h-1 rounded-full bg-[hsl(var(--color-border))]" />
                        <span className="text-xs font-medium text-[hsl(var(--color-text-muted))]">{file.pages} pages</span>
                        <span className="w-1 h-1 rounded-full bg-[hsl(var(--color-border))]" />
                        <span className="text-xs font-medium text-[hsl(var(--color-text-faint))]">{file.uploadedAt}</span>
                      </div>
                    </div>
                    
                    {/* Quick Action Hover Buttons */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-10 bg-[hsl(var(--color-surface))] p-1 rounded-xl shadow-lg border border-[hsl(var(--color-border))]">
                      <button onClick={(e) => { e.stopPropagation(); navigate('/chat'); }} className="p-2 rounded-lg hover:bg-purple-500/10 text-purple-400 transition-colors" title="Chat with file">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); navigate('/summary'); }} className="p-2 rounded-lg hover:bg-emerald-500/10 text-emerald-400 transition-colors" title="Summarize">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); navigate('/quiz'); }} className="p-2 rounded-lg hover:bg-amber-500/10 text-amber-400 transition-colors" title="Generate Quiz">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/></svg>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </Card>
          
          {/* Activity feed */}
          <Card className="p-6 border-[hsl(var(--color-border)/0.8)] shadow-sm">
            <h2 className="text-xl font-bold font-['Sora'] mb-4">Recent Activity</h2>
            <Divider className="mb-2 opacity-50" />
            <ActivityItem icon="📤" title="File Uploaded" desc="Biology Chapter 5 - Cell Division.pdf" time="2h ago" color="blue" />
            <Divider className="opacity-50" />
            <ActivityItem icon="✨" title="Summary Generated" desc="Mitosis & Meiosis — 420 words" time="2h ago" color="emerald" />
            <Divider className="opacity-50" />
            <ActivityItem icon="🎯" title="Quiz Completed" desc="Cell Division Quiz — 87% score" time="1d ago" color="amber" />
            <Divider className="opacity-50" />
            <ActivityItem icon="💬" title="AI Chat Session" desc="12 messages about integration formulas" time="1d ago" color="purple" />
          </Card>

        </div>

        {/* Right column: Analytics & Progress */}
        <div className="flex flex-col gap-6">
          
          {/* Enhanced Study Streak */}
          <Card className="relative overflow-hidden border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-[hsl(var(--color-surface))] p-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-['Sora'] flex items-center gap-2">
                <span className="text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] text-xl">🔥</span> Study Streak
              </h2>
              <Badge variant="amber" className="font-bold border border-amber-500/30">14 Days</Badge>
            </div>
            
            <div className="flex gap-2 mb-6">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={clsx(
                      'w-full h-12 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer',
                      i < 6 
                        ? 'bg-gradient-to-t from-amber-500 to-orange-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]' 
                        : 'bg-[hsl(var(--color-surface-3))] border border-[hsl(var(--color-border))]'
                    )}
                  />
                  <span className="text-[10px] font-bold text-[hsl(var(--color-text-faint))]">{day}</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center bg-[hsl(var(--color-surface-2)/0.5)] p-4 rounded-2xl border border-[hsl(var(--color-border)/0.5)]">
              <div>
                <p className="text-2xl font-black text-[hsl(var(--color-text))]">3.2<span className="text-sm font-medium text-[hsl(var(--color-text-muted))]">h</span></p>
                <p className="text-xs font-semibold text-[hsl(var(--color-text-faint))] uppercase tracking-wider mt-1">Today</p>
              </div>
              <div className="border-l border-[hsl(var(--color-border))]">
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">28<span className="text-sm font-medium text-orange-400/70">h</span></p>
                <p className="text-xs font-semibold text-[hsl(var(--color-text-faint))] uppercase tracking-wider mt-1">This Week</p>
              </div>
            </div>
          </Card>

          {/* Enhanced Subject Progress */}
          <Card className="p-6">
            <h2 className="text-lg font-bold font-['Sora'] mb-6 flex items-center gap-2">
              <span className="text-blue-400">📊</span> Subject Mastery
            </h2>
            <div className="flex flex-col gap-5">
              <ProgressBar label="Biology"   value={82} showValue variant="emerald" />
              <ProgressBar label="Calculus"  value={45} showValue variant="purple" />
              <ProgressBar label="History"   value={89} showValue variant="blue" />
              <ProgressBar label="Physics"   value={60} showValue variant="amber" />
            </div>
          </Card>

          {/* Active quizzes */}
          <Card className="p-6 flex-1 border border-purple-500/10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold font-['Sora'] flex items-center gap-2">
                <span className="text-purple-400">🎯</span> Active Quizzes
              </h2>
              <Button variant="ghost" size="xs" onClick={() => navigate('/quiz')} className="text-purple-400 hover:bg-purple-500/10">See all</Button>
            </div>
            <div className="flex flex-col gap-3">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[hsl(var(--color-surface-2))] border border-transparent hover:border-[hsl(var(--color-border))] cursor-pointer transition-all group" onClick={() => navigate('/quiz')}>
                  <div className={clsx(
                    'w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-inner',
                    quiz.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  )}>
                    {quiz.completed ? '✓' : '📝'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate group-hover:text-purple-400 transition-colors">{quiz.title}</p>
                    <p className="text-xs font-medium text-[hsl(var(--color-text-faint))] mt-0.5">{quiz.questions} questions</p>
                  </div>
                  {quiz.completed ? (
                    <Badge variant="emerald" className="shadow-sm font-bold">{quiz.score}%</Badge>
                  ) : (
                    <Badge variant="amber" className="shadow-sm font-bold">Pending</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  );
}
