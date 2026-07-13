import React, { useState, useCallback, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, Button, Badge } from '../components/ui';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

const fileColorMap = {
  blue:    { bg: 'bg-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/20' },
  purple:  { bg: 'bg-purple-500/10',  text: 'text-purple-400',  border: 'border-purple-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20' },
};

const fileTypeIcon = { pdf: '📕', doc: '📘', docx: '📘', md: '📗', txt: '📄' };

function FileCard({ file, onDelete }) {
  const c = fileColorMap[file.color] || fileColorMap.blue;
  const navigate = useNavigate();

  return (
    <div className={clsx(
      'group relative rounded-3xl border bg-[hsl(var(--color-surface))] p-5',
      'hover:border-[hsl(var(--color-text-faint)/0.4)] hover:bg-[hsl(var(--color-surface-2))]',
      'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]',
      c.border
    )}>
      
      <div className="flex justify-between items-start mb-4">
        <div className={clsx('w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner', c.bg)}>
          {fileTypeIcon[file.type] || '📄'}
        </div>
        <Badge variant="emerald" className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5 inline-block" />
          Indexed
        </Badge>
      </div>

      <h3 className="text-base font-bold text-[hsl(var(--color-text))] truncate mb-1 group-hover:text-blue-400 transition-colors">{file.name}</h3>
      <div className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--color-text-faint))] mb-5">
        <span>{file.size}</span>
        <span className="w-1 h-1 rounded-full bg-[hsl(var(--color-border))]" />
        <span>{file.pages} pages</span>
        <span className="w-1 h-1 rounded-full bg-[hsl(var(--color-border))]" />
        <span>{file.uploadedAt}</span>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => navigate('/chat')} className="flex-1 py-2 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
          <span>💬</span> Chat
        </button>
        <button onClick={() => navigate('/quiz')} className="flex-1 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
          <span>🎯</span> Quiz
        </button>
        <button onClick={() => navigate('/summary')} className="flex-1 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
          <span>✨</span> Summary
        </button>
      </div>

      <button
        onClick={() => onDelete(file.id)}
        className="absolute top-4 right-4 w-8 h-8 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
        title="Delete Document"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
      </button>
    </div>
  );
}

function DropZone({ onUploadComplete }) {
  const [dragging, setDragging] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, processing, success, error
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (uploadState === 'idle') setDragging(true);
  }, [uploadState]);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  const simulateUpload = (file) => {
    setUploadState('uploading');
    setCurrentFile(file);
    setProgress(0);

    const uploadInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(uploadInterval);
          setUploadState('processing');
          
          setTimeout(() => {
            setUploadState('success');
            setTimeout(() => {
              onUploadComplete(file);
              setUploadState('idle');
              setCurrentFile(null);
            }, 1000);
          }, 2000);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    if (uploadState !== 'idle') return;
    
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) simulateUpload(file);
  }, [uploadState, onUploadComplete]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        'relative rounded-[2rem] border-2 border-dashed p-10 text-center transition-all duration-300 overflow-hidden min-h-[280px] flex flex-col items-center justify-center',
        uploadState === 'idle' && dragging ? 'border-blue-500/60 bg-blue-500/5 scale-[1.02]' : '',
        uploadState === 'idle' && !dragging ? 'border-[hsl(var(--color-border))] hover:border-blue-500/40 hover:bg-[hsl(var(--color-surface-2))] cursor-pointer' : '',
        uploadState !== 'idle' ? 'border-blue-500/30 bg-[hsl(var(--color-surface-2))]' : ''
      )}
      onClick={() => { if (uploadState === 'idle') document.getElementById('file-input').click(); }}
    >
      <input
        id="file-input"
        type="file"
        accept=".pdf,.doc,.docx,.txt,.md"
        className="hidden"
        onChange={handleDrop}
      />
      
      {uploadState === 'idle' && (
        <div className="animate-fade-in flex flex-col items-center">
          <div className={clsx('w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl transition-all shadow-inner border border-blue-500/20', dragging ? 'bg-blue-500/20 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'bg-[hsl(var(--color-surface))]')}>
            📤
          </div>
          <h3 className="text-2xl font-bold font-['Sora'] text-[hsl(var(--color-text))] mb-2">
            {dragging ? 'Drop it here!' : 'Drag & drop to upload'}
          </h3>
          <p className="text-[hsl(var(--color-text-muted))] mb-6">
            Supported formats: PDF, DOCX, TXT, Markdown (Max 50MB)
          </p>
          <Button variant="primary" size="md" className="glow-blue px-8">Browse Files</Button>
        </div>
      )}

      {uploadState === 'uploading' && (
        <div className="animate-fade-in flex flex-col items-center w-full max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--color-surface))] shadow-inner flex items-center justify-center text-3xl mb-4 border border-[hsl(var(--color-border))]">
            {fileTypeIcon[currentFile?.name.split('.').pop().toLowerCase()] || '📄'}
          </div>
          <h3 className="font-bold text-[hsl(var(--color-text))] mb-1 truncate w-full">{currentFile?.name}</h3>
          <p className="text-sm text-[hsl(var(--color-text-muted))] mb-6">Uploading... {progress}%</p>
          <div className="w-full h-2 bg-[hsl(var(--color-surface-3))] rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {uploadState === 'processing' && (
        <div className="animate-fade-in flex flex-col items-center w-full">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(168,85,247,0.4)]">
              🤖
            </div>
            {/* Scanning beam effect */}
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden pointer-events-none">
              <div className="w-full h-1 bg-white/50 blur-[2px] shadow-[0_0_10px_#fff] animate-[scan_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mb-2 font-['Sora']">AI is analyzing your document</h3>
          <p className="text-purple-400 font-medium animate-pulse">Creating knowledge index and extracting key concepts...</p>
        </div>
      )}

      {uploadState === 'success' && (
        <div className="animate-fade-in flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-4xl mb-4 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            ✓
          </div>
          <h3 className="text-xl font-bold text-[hsl(var(--color-text))] mb-1 font-['Sora']">Upload Complete</h3>
          <p className="text-emerald-400 font-medium">Ready for AI Interaction</p>
        </div>
      )}
      
      {/* Background styling for processing state */}
      {uploadState === 'processing' && (
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] pointer-events-none opacity-50" />
      )}
    </div>
  );
}

export default function VaultPage() {
  const { uploadedFiles, addFile, removeFile } = useApp();
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const handleUploadComplete = useCallback((rawFile) => {
    const colors = ['blue', 'purple', 'emerald', 'amber'];
    const ext = rawFile.name.split('.').pop().toLowerCase();
    const typeMap = { pdf: 'pdf', doc: 'doc', docx: 'doc', md: 'md', txt: 'txt' };
    addFile({
      id: Date.now().toString(),
      name: rawFile.name,
      type: typeMap[ext] || 'txt',
      size: rawFile.size > 1e6 ? `${(rawFile.size / 1e6).toFixed(1)} MB` : `${Math.round(rawFile.size / 1e3)} KB`,
      pages: Math.floor(Math.random() * 20) + 1,
      uploadedAt: 'just now',
      tags: ['Indexed', ext.toUpperCase()],
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }, [addFile]);

  const filtered = uploadedFiles.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || f.type === filter || (filter === 'doc' && f.type === 'docx');
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Header & Upload Zone */}
      <div className="bg-[hsl(var(--color-surface))] rounded-[2.5rem] border border-[hsl(var(--color-border))] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2">
          <div>
            <h1 className="text-3xl font-bold font-['Sora'] tracking-tight mb-1">Document Vault</h1>
            <p className="text-[hsl(var(--color-text-muted))]">Manage and interact with your AI knowledge base.</p>
          </div>
          <Badge variant="blue" className="self-start sm:self-center px-4 py-1.5 text-sm shadow-inner">{uploadedFiles.length} Indexed Files</Badge>
        </div>
        
        <DropZone onUploadComplete={handleUploadComplete} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter pills */}
        <div className="flex gap-2 p-1.5 bg-[hsl(var(--color-surface))] rounded-2xl border border-[hsl(var(--color-border))] w-full md:w-auto overflow-x-auto">
          {[
            { value: 'all', label: 'All files', icon: '📚' },
            { value: 'pdf', label: 'PDFs', icon: '📕' },
            { value: 'doc', label: 'Documents', icon: '📘' },
            { value: 'md',  label: 'Markdown', icon: '📗' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap',
                filter === f.value
                  ? 'bg-[hsl(var(--color-surface-3))] text-[hsl(var(--color-text))] shadow-sm'
                  : 'text-[hsl(var(--color-text-muted))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))]'
              )}
            >
              <span>{f.icon}</span> {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:flex-none md:w-64">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--color-text-faint))]">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2.5 bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-xl text-[15px] text-[hsl(var(--color-text))] placeholder:text-[hsl(var(--color-text-faint))] focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
            />
          </div>

          {/* View toggle */}
          <div className="hidden sm:flex items-center bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-xl p-1 gap-1 shadow-sm">
            {[
              { mode: 'grid', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg> },
              { mode: 'list', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><rect x="3" y="5" width="2" height="2" rx="0.5"/><rect x="3" y="11" width="2" height="2" rx="0.5"/><rect x="3" y="17" width="2" height="2" rx="0.5"/></svg> },
            ].map(({ mode, icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={clsx(
                  'w-9 h-9 rounded-lg flex items-center justify-center transition-all',
                  viewMode === mode
                    ? 'bg-[hsl(var(--color-surface-3))] text-[hsl(var(--color-text))] shadow-sm'
                    : 'text-[hsl(var(--color-text-faint))] hover:bg-[hsl(var(--color-surface-2))] hover:text-[hsl(var(--color-text))]'
                )}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* File grid/list */}
      {filtered.length === 0 ? (
        <div className="bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-[2rem] p-12 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-5xl mb-6 shadow-inner text-blue-400">
            🗄️
          </div>
          <h2 className="text-2xl font-bold font-['Sora'] mb-2">Upload your first document</h2>
          <p className="text-[hsl(var(--color-text-muted))] max-w-md mx-auto mb-8">
            Start building your knowledge base. Upload a syllabus, lecture notes, or textbook chapter and let the AI do the heavy lifting.
          </p>
          <Button variant="primary" size="lg" className="glow-blue px-8" onClick={() => document.getElementById('file-input').click()}>
            Upload Document
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((file) => (
            <FileCard key={file.id} file={file} onDelete={removeFile} />
          ))}
        </div>
      ) : (
        <Card padding={false} className="overflow-hidden border-[hsl(var(--color-border)/0.8)] shadow-sm">
          {filtered.map((file, i) => {
            const c = fileColorMap[file.color] || fileColorMap.blue;
            return (
              <React.Fragment key={file.id}>
                <div className="flex items-center gap-4 px-6 py-4 hover:bg-[hsl(var(--color-surface-2))] cursor-pointer transition-all group relative">
                  <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-inner', c.bg, c.text)}>
                    {fileTypeIcon[file.type] || '📄'}
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-base font-bold text-[hsl(var(--color-text))] truncate mb-1 group-hover:text-blue-400 transition-colors">{file.name}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="emerald" className="text-[10px] py-0 border-emerald-500/20 bg-emerald-500/5">Indexed</Badge>
                      <span className="text-xs text-[hsl(var(--color-text-faint))]">{file.size} · {file.pages} pages · {file.uploadedAt}</span>
                    </div>
                  </div>
                  
                  {/* Action buttons (List view) */}
                  <div className="hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => window.location.href='/chat'}>💬 Chat</Button>
                    <Button variant="ghost" size="sm" onClick={() => window.location.href='/summary'}>✨ Summarize</Button>
                    <Button variant="danger" size="sm" onClick={() => removeFile(file.id)}>🗑</Button>
                  </div>
                </div>
                {i < filtered.length - 1 && <div className="h-px bg-[hsl(var(--color-border))]" />}
              </React.Fragment>
            );
          })}
        </Card>
      )}

      {/* Internal CSS for processing animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-40px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
