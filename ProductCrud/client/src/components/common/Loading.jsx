import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ fullPage = false }) => {
  return (
    <div className={`loading-container ${fullPage ? 'full-page' : ''}`}>
      <Loader2 className="spinning" size={48} color="var(--primary)" />
      <style>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          width: 100%;
        }
        .full-page {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          background: var(--bg);
          z-index: 2000;
        }
        .spinning {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
