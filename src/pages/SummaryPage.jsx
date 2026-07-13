import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, Button, Badge, EmptyState } from '../components/ui';
import { clsx } from 'clsx';

const MOCK_SUMMARY_CONTENT = {
  '1': {
    title: 'Cell Division — Key Concepts',
    wordCount: 420,
    readTime: '2 min',
    sections: [
      {
        heading: '🔬 Overview',
        content: 'Cell division is the fundamental process by which a parent cell divides into two or more daughter cells. It is essential for growth, repair, and reproduction in all living organisms. There are two primary types: mitosis (for somatic cells) and meiosis (for gametes).',
      },
      {
        heading: '⚡ Mitosis',
        content: 'Mitosis produces two genetically identical diploid daughter cells. The process proceeds through four main phases: **Prophase** (chromatin condenses), **Metaphase** (chromosomes align at the cell plate), **Anaphase** (sister chromatids separate), and **Telophase** (nuclear envelopes reform). This is followed by cytokinesis.',
      },
      {
        heading: '🧬 Meiosis',
        content: 'Meiosis produces four genetically diverse haploid gametes. It involves two successive divisions: Meiosis I (homologous chromosomes separate) and Meiosis II (sister chromatids separate). Crossing over during Prophase I generates genetic variation critical for evolution.',
      },
      {
        heading: '📌 Key Differences',
        content: '| Feature | Mitosis | Meiosis |\n|---|---|---|\n| Daughter cells | 2 | 4 |\n| Ploidy | Diploid (2n) | Haploid (n) |\n| Genetic variation | No | Yes (crossing over) |\n| Purpose | Growth & repair | Sexual reproduction |',
      },
    ],
    keyPoints: [
      'Mitosis = 2 identical diploid cells',
      'Meiosis = 4 unique haploid gametes',
      'Crossing over creates genetic diversity',
      'Interphase is preparation, not division',
      'Cytokinesis follows both types',
    ],
    sourceFile: 'Biology Chapter 5 - Cell Division.pdf',
    createdAt: '2 hours ago',
  },
};

function SummaryCard({ summary, onView }) {
  return (
    <Card hover className="flex flex-col gap-4 cursor-pointer" onClick={() => onView(summary)}>
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl">
          ✨
        </div>
        <Badge variant="emerald">{summary.wordCount} words</Badge>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[hsl(var(--color-text))] mb-1">{summary.title}</h3>
        <p className="text-xs text-[hsl(var(--color-text-faint))] truncate">From: {summary.sourceFile}</p>
        <p className="text-xs text-[hsl(var(--color-text-faint))] mt-0.5">{summary.createdAt}</p>
      </div>
      <Button variant="secondary" size="sm" fullWidth>
        View Summary →
      </Button>
    </Card>
  );
}

function SummaryViewer({ summary, onBack }) {
  const content = MOCK_SUMMARY_CONTENT[summary.id];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) return null;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Back + actions */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))] transition-colors"
        >
          ← Back to Summaries
        </button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </Button>
          <Button variant="secondary" size="sm">⬇ Export</Button>
          <Button variant="primary" size="sm">🎯 Create Quiz</Button>
        </div>
      </div>

      {/* Summary header */}
      <Card className="mb-5 bg-gradient-to-br from-emerald-600/10 to-teal-600/8 border-emerald-500/20">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold font-['Sora'] text-[hsl(var(--color-text))] mb-2">{content.title}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="emerald">{content.wordCount} words</Badge>
              <Badge variant="default">⏱ {content.readTime} read</Badge>
              <span className="text-xs text-[hsl(var(--color-text-faint))]">From: {content.sourceFile}</span>
            </div>
          </div>
        </div>

        {/* Key points */}
        <div>
          <h2 className="text-xs font-semibold text-[hsl(var(--color-text-muted))] uppercase tracking-wider mb-2">Key Takeaways</h2>
          <ul className="flex flex-col gap-1.5">
            {content.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--color-text-muted))]">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Summary content sections */}
      <div className="flex flex-col gap-4">
        {content.sections.map((section, i) => (
          <Card key={i}>
            <h2 className="text-base font-semibold font-['Sora'] mb-3">{section.heading}</h2>
            <div className="text-sm text-[hsl(var(--color-text-muted))] leading-relaxed space-y-2">
              {section.content.includes('|') ? (
                // simple table rendering
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    {section.content.split('\n').filter(Boolean).map((row, ri) => {
                      if (row.includes('---')) return null;
                      const cells = row.split('|').filter(Boolean);
                      const Tag = ri === 0 ? 'th' : 'td';
                      return (
                        <tr key={ri} className={ri === 0 ? 'border-b border-[hsl(var(--color-border))]' : ''}>
                          {cells.map((cell, ci) => (
                            <Tag key={ci} className={clsx('px-3 py-2 text-left', ri === 0 ? 'font-semibold text-[hsl(var(--color-text))]' : 'text-[hsl(var(--color-text-muted))]', ci > 0 && 'border-l border-[hsl(var(--color-border))]')}>
                              {cell.trim()}
                            </Tag>
                          ))}
                        </tr>
                      );
                    })}
                  </table>
                </div>
              ) : (
                section.content.split('**').map((part, pi) =>
                  pi % 2 === 1 ? (
                    <strong key={pi} className="text-[hsl(var(--color-text))] font-semibold">{part}</strong>
                  ) : (
                    <span key={pi}>{part}</span>
                  )
                )
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function SummaryPage() {
  const { uploadedFiles, summaries, setSummaries } = useApp();
  const [activeSummary, setActiveSummary] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [summaryType, setSummaryType] = useState('concise');

  const handleGenerate = () => {
    if (!selectedFile) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const file = uploadedFiles.find((f) => f.id === selectedFile);
      const newSummary = {
        id: '1', // reuses mock content
        title: `${file?.name.split('.')[0]} — AI Summary`,
        wordCount: summaryType === 'concise' ? 280 : summaryType === 'detailed' ? 650 : 150,
        sourceFile: file?.name,
        createdAt: 'just now',
      };
      setSummaries((prev) => [newSummary, ...prev.filter(s => s.id !== '1')]);
      setActiveSummary(newSummary);
    }, 2500);
  };

  if (activeSummary) {
    return (
      <div className="animate-fade-in">
        <SummaryViewer summary={activeSummary} onBack={() => setActiveSummary(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Generate summary */}
      <Card className="bg-gradient-to-br from-emerald-600/10 to-teal-600/8 border-emerald-500/20">
        <h2 className="text-base font-semibold font-['Sora'] mb-4">Generate New Summary</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            className="flex-1 bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))] rounded-xl px-4 py-2.5 text-sm text-[hsl(var(--color-text))] focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10 transition-all"
          >
            <option value="" disabled>Select a file to summarize…</option>
            {uploadedFiles.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <select
            value={summaryType}
            onChange={(e) => setSummaryType(e.target.value)}
            className="bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))] rounded-xl px-4 py-2.5 text-sm text-[hsl(var(--color-text))] focus:outline-none focus:border-emerald-500/50 transition-all sm:w-40"
          >
            <option value="bullet">Bullet points</option>
            <option value="concise">Concise</option>
            <option value="detailed">Detailed</option>
          </select>
          <Button
            variant="gradient"
            loading={generating}
            disabled={!selectedFile}
            onClick={handleGenerate}
          >
            {generating ? 'Generating…' : '✨ Generate'}
          </Button>
        </div>
        {generating && (
          <div className="mt-4">
            <p className="text-xs text-[hsl(var(--color-text-muted))] mb-2">AI is reading and summarizing your notes…</p>
            <div className="h-1.5 bg-[hsl(var(--color-surface-3))] rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse" />
            </div>
          </div>
        )}
      </Card>

      {/* Tip card */}
      <div className="glass rounded-2xl p-4 flex items-start gap-3 border-blue-500/15">
        <span className="text-xl shrink-0">💡</span>
        <div>
          <p className="text-sm font-medium text-[hsl(var(--color-text))]">Pro tip: Use summaries to revise faster</p>
          <p className="text-xs text-[hsl(var(--color-text-muted))] mt-0.5">Generate a quiz from any summary to test your understanding right after reading.</p>
        </div>
      </div>

      {/* Summaries grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold font-['Sora']">Your Summaries</h2>
          <Badge variant="default">{summaries.length} generated</Badge>
        </div>
        {summaries.length === 0 ? (
          <EmptyState
            icon="✨"
            title="No summaries yet"
            description="Select a file and let AI create a concise summary for you."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {summaries.map((s) => (
              <SummaryCard key={s.id} summary={s} onView={setActiveSummary} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
