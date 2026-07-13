import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeVault, setActiveVault] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: '1',
      name: 'Biology Chapter 5 - Cell Division.pdf',
      type: 'pdf',
      size: '2.4 MB',
      pages: 18,
      uploadedAt: '2 hours ago',
      tags: ['biology', 'cells'],
      color: 'blue',
    },
    {
      id: '2',
      name: 'Calculus Notes - Integration.docx',
      type: 'doc',
      size: '856 KB',
      pages: 12,
      uploadedAt: '1 day ago',
      tags: ['math', 'calculus'],
      color: 'purple',
    },
    {
      id: '3',
      name: 'History - World War II Timeline.md',
      type: 'md',
      size: '124 KB',
      pages: 5,
      uploadedAt: '3 days ago',
      tags: ['history'],
      color: 'emerald',
    },
    {
      id: '4',
      name: 'Physics Formulas Sheet.pdf',
      type: 'pdf',
      size: '1.2 MB',
      pages: 8,
      uploadedAt: '5 days ago',
      tags: ['physics', 'formulas'],
      color: 'amber',
    },
  ]);

  const [quizzes, setQuizzes] = useState([
    {
      id: '1',
      title: 'Cell Division Quiz',
      questions: 15,
      completed: true,
      score: 87,
      createdAt: '1 day ago',
      sourceFile: 'Biology Chapter 5 - Cell Division.pdf',
    },
    {
      id: '2',
      title: 'Integration Techniques',
      questions: 10,
      completed: false,
      score: null,
      createdAt: '2 days ago',
      sourceFile: 'Calculus Notes - Integration.docx',
    },
  ]);

  const [summaries, setSummaries] = useState([
    {
      id: '1',
      title: 'Cell Division - Key Concepts',
      wordCount: 420,
      createdAt: '2 hours ago',
      sourceFile: 'Biology Chapter 5 - Cell Division.pdf',
    },
  ]);

  const addFile = useCallback((file) => {
    setUploadedFiles((prev) => [file, ...prev]);
  }, []);

  const removeFile = useCallback((id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((v) => !v);
  }, []);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        setSidebarOpen,
        activeVault,
        setActiveVault,
        uploadedFiles,
        addFile,
        removeFile,
        quizzes,
        setQuizzes,
        summaries,
        setSummaries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
