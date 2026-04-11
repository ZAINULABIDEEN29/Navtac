import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type} fade-in`}>
            {toast.message}
          </div>
        ))}
      </div>
      <style>{`
        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .toast {
          padding: 12px 24px;
          border-radius: 12px;
          color: white;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
          min-width: 200px;
        }
        .toast-success { background: rgba(16, 185, 129, 0.9); border: 1px solid var(--accent); }
        .toast-error { background: rgba(239, 68, 68, 0.9); border: 1px solid var(--danger); }
        .toast-info { background: rgba(99, 102, 241, 0.9); border: 1px solid var(--primary); }
      `}</style>
    </ToastContext.Provider>
  );
};
