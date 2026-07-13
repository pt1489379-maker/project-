import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, Button, Badge, EmptyState, ProgressBar } from '../components/ui';
import { clsx } from 'clsx';

const MOCK_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the correct order of phases in mitosis?',
    options: [
      'Prophase → Metaphase → Anaphase → Telophase',
      'Metaphase → Prophase → Telophase → Anaphase',
      'Anaphase → Prophase → Metaphase → Telophase',
      'Telophase → Anaphase → Metaphase → Prophase',
    ],
    correct: 0,
    explanation: 'Mitosis proceeds in the order: Prophase (chromosomes condense), Metaphase (chromosomes align), Anaphase (chromosomes separate), Telophase (nuclear envelope reforms).',
  },
  {
    id: 2,
    question: 'How many daughter cells are produced by meiosis?',
    options: ['1', '2', '4', '8'],
    correct: 2,
    explanation: 'Meiosis produces 4 haploid daughter cells from 1 diploid parent cell through two successive divisions.',
  },
  {
    id: 3,
    question: 'What is the purpose of crossing over during meiosis?',
    options: [
      'To duplicate chromosomes',
      'To create genetic variation',
      'To separate sister chromatids',
      'To form the nuclear envelope',
    ],
    correct: 1,
    explanation: 'Crossing over (recombination) exchanges genetic material between homologous chromosomes, creating new combinations of alleles and thus genetic variation.',
  },
  {
    id: 4,
    question: 'Which type of cell undergoes mitosis?',
    options: ['Gametes only', 'Somatic (body) cells', 'Only stem cells', 'Only cancer cells'],
    correct: 1,
    explanation: 'Mitosis occurs in somatic (body) cells for growth, development, and tissue repair. Gametes are produced by meiosis.',
  },
  {
    id: 5,
    question: 'What is the ploidy of cells produced by meiosis in humans?',
    options: ['Diploid (2n = 46)', 'Triploid (3n)', 'Haploid (n = 23)', 'Tetraploid (4n)'],
    correct: 2,
    explanation: 'Meiosis reduces the chromosome number by half, producing haploid (n) cells. In humans, this means 23 chromosomes per gamete.',
  },
];

function QuizRunner({ quiz, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const question = MOCK_QUIZ_QUESTIONS[currentQ];
  const isAnswered = selected !== null;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelected(idx);
  };

  const handleNext = () => {
    const newAnswers = [...answers, { questionId: question.id, selected, correct: question.correct }];
    if (currentQ < MOCK_QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ((q) => q + 1);
      setSelected(null);
    } else {
      setAnswers(newAnswers);
      setShowResult(true);
    }
  };

  const score = Math.round(
    (answers.filter((a) => a.selected === a.correct).length / MOCK_QUIZ_QUESTIONS.length) * 100
  );

  if (showResult) {
    return (
      <Card className="text-center py-10">
        <div className="text-6xl mb-4">{score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}</div>
        <h2 className="text-2xl font-bold font-['Sora'] mb-2">Quiz Complete!</h2>
        <div className="text-5xl font-bold text-gradient mb-4">{score}%</div>
        <p className="text-[hsl(var(--color-text-muted))] mb-6">
          You answered {answers.filter((a) => a.selected === a.correct).length} out of {MOCK_QUIZ_QUESTIONS.length} questions correctly.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => { setCurrentQ(0); setSelected(null); setAnswers([]); setShowResult(false); }}>
            Retake Quiz
          </Button>
          <Button variant="primary" onClick={onComplete}>Back to Quizzes</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* Progress */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[hsl(var(--color-text-muted))]">Question {currentQ + 1} of {MOCK_QUIZ_QUESTIONS.length}</span>
          <Badge variant="blue">{quiz.title}</Badge>
        </div>
        <ProgressBar value={currentQ + 1} max={MOCK_QUIZ_QUESTIONS.length} variant="rainbow" />
      </Card>

      {/* Question */}
      <Card>
        <h2 className="text-lg font-semibold font-['Sora'] mb-6 leading-snug">{question.question}</h2>
        <div className="flex flex-col gap-3 mb-6">
          {question.options.map((option, idx) => {
            let state = 'default';
            if (isAnswered) {
              if (idx === question.correct) state = 'correct';
              else if (idx === selected) state = 'wrong';
            } else if (idx === selected) {
              state = 'selected';
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={clsx(
                  'flex items-center gap-4 px-4 py-3.5 rounded-xl border text-sm font-medium text-left transition-all duration-200',
                  state === 'default'   && 'border-[hsl(var(--color-border))] hover:border-blue-500/40 hover:bg-blue-500/5 text-[hsl(var(--color-text-muted))]',
                  state === 'selected'  && 'border-blue-500/60 bg-blue-500/10 text-blue-400',
                  state === 'correct'   && 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400',
                  state === 'wrong'     && 'border-red-500/60 bg-red-500/10 text-red-400',
                )}
              >
                <span className={clsx(
                  'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 border',
                  state === 'default'   && 'border-[hsl(var(--color-border))] text-[hsl(var(--color-text-faint))]',
                  state === 'selected'  && 'border-blue-500/50 bg-blue-500/20 text-blue-400',
                  state === 'correct'   && 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400',
                  state === 'wrong'     && 'border-red-500/50 bg-red-500/20 text-red-400',
                )}>
                  {state === 'correct' ? '✓' : state === 'wrong' ? '✗' : String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className={clsx(
            'p-4 rounded-xl border text-sm',
            selected === question.correct
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
          )}>
            <strong>{selected === question.correct ? '✓ Correct! ' : '✗ Not quite. '}</strong>
            <span className="text-[hsl(var(--color-text-muted))]">{question.explanation}</span>
          </div>
        )}

        <div className="flex justify-end mt-5">
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!isAnswered}
          >
            {currentQ < MOCK_QUIZ_QUESTIONS.length - 1 ? 'Next Question →' : 'See Results'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

function QuizCard({ quiz, onStart }) {
  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={clsx(
          'w-10 h-10 rounded-xl flex items-center justify-center text-xl',
          quiz.completed ? 'bg-emerald-500/10' : 'bg-amber-500/10'
        )}>
          {quiz.completed ? '✅' : '📝'}
        </div>
        {quiz.completed ? (
          <Badge variant="emerald">{quiz.score}%</Badge>
        ) : (
          <Badge variant="amber">Pending</Badge>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[hsl(var(--color-text))] mb-1">{quiz.title}</h3>
        <p className="text-xs text-[hsl(var(--color-text-faint))]">
          {quiz.questions} questions · Created {quiz.createdAt}
        </p>
        <p className="text-xs text-[hsl(var(--color-text-faint))] truncate mt-0.5">
          From: {quiz.sourceFile}
        </p>
      </div>
      {quiz.completed && (
        <ProgressBar value={quiz.score} variant={quiz.score >= 80 ? 'emerald' : quiz.score >= 60 ? 'amber' : 'blue'} />
      )}
      <Button
        variant={quiz.completed ? 'secondary' : 'primary'}
        size="sm"
        fullWidth
        onClick={() => onStart(quiz)}
      >
        {quiz.completed ? 'Retake Quiz' : 'Start Quiz →'}
      </Button>
    </Card>
  );
}

export default function QuizPage() {
  const { quizzes, uploadedFiles } = useApp();
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');

  const handleGenerate = () => {
    if (!selectedFile) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const file = uploadedFiles.find((f) => f.id === selectedFile);
      setActiveQuiz({ title: `${file?.name.split('.')[0]} Quiz`, questions: MOCK_QUIZ_QUESTIONS.length });
    }, 2000);
  };

  if (activeQuiz) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setActiveQuiz(null)}
            className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))] transition-colors"
          >
            ← Back
          </button>
          <h2 className="text-base font-semibold font-['Sora']">{activeQuiz.title}</h2>
        </div>
        <QuizRunner quiz={activeQuiz} onComplete={() => setActiveQuiz(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Generate quiz */}
      <Card className="bg-gradient-to-br from-blue-600/10 to-violet-600/8 border-blue-500/20">
        <h2 className="text-base font-semibold font-['Sora'] mb-4">Generate New Quiz</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            className="flex-1 bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))] rounded-xl px-4 py-2.5 text-sm text-[hsl(var(--color-text))] focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
          >
            <option value="" disabled>Select a file to quiz on…</option>
            {uploadedFiles.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <select
            className="bg-[hsl(var(--color-surface-2))] border border-[hsl(var(--color-border))] rounded-xl px-4 py-2.5 text-sm text-[hsl(var(--color-text))] focus:outline-none focus:border-blue-500/50 transition-all sm:w-36"
          >
            <option>10 questions</option>
            <option>15 questions</option>
            <option>20 questions</option>
            <option>30 questions</option>
          </select>
          <Button
            variant="gradient"
            loading={generating}
            disabled={!selectedFile}
            onClick={handleGenerate}
            className="sm:w-auto"
          >
            {generating ? 'Generating…' : '✨ Generate Quiz'}
          </Button>
        </div>
        {generating && (
          <div className="mt-4">
            <p className="text-xs text-[hsl(var(--color-text-muted))] mb-2">AI is analyzing your notes…</p>
            <div className="h-1.5 bg-[hsl(var(--color-surface-3))] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-bold text-gradient">{quizzes.length}</div>
          <div className="text-xs text-[hsl(var(--color-text-faint))] mt-1">Total Quizzes</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-gradient">{quizzes.filter(q => q.completed).length}</div>
          <div className="text-xs text-[hsl(var(--color-text-faint))] mt-1">Completed</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-gradient">
            {quizzes.filter(q => q.completed).length
              ? Math.round(quizzes.filter(q => q.completed).reduce((a, q) => a + q.score, 0) / quizzes.filter(q => q.completed).length) + '%'
              : '—'}
          </div>
          <div className="text-xs text-[hsl(var(--color-text-faint))] mt-1">Avg Score</div>
        </Card>
      </div>

      {/* Quiz grid */}
      <div>
        <h2 className="text-base font-semibold font-['Sora'] mb-4">Your Quizzes</h2>
        {quizzes.length === 0 ? (
          <EmptyState
            icon="🎯"
            title="No quizzes yet"
            description="Generate your first quiz from an uploaded file."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} onStart={setActiveQuiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
