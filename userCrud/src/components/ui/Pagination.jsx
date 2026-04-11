import React from 'react';
import Button from './Button';

const Pagination = ({ total = 0, currentPage = 1, itemsPerPage = 8, onPageChange }) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  
  const start = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, total);

  // Generate page numbers
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // Slicing logic for brevity
  if (totalPages > 5) {
     if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
     } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
     } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
     }
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-6 px-1 sm:flex-row pb-6">
      <div className="text-sm font-medium text-gray-500 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200/60 shadow-sm">
        Showing <span className="font-bold text-gray-900 mx-1">{start}</span> to <span className="font-bold text-gray-900 mx-1">{end}</span> of <span className="font-bold text-gray-900 ml-1">{total}</span> records
      </div>
      
      <div className="flex items-center gap-1 bg-white border border-gray-200/60 p-1.5 rounded-full shadow-sm">
        <Button 
          variant="ghost" 
          className="rounded-full px-5 text-sm font-semibold hover:bg-gray-50 text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent" 
          disabled={currentPage === 1 || total === 0}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <div className="hidden sm:flex items-center gap-1 mx-1">
          {pages.map((page, idx) => (
             <React.Fragment key={idx}>
               {page === '...' ? (
                 <span className="w-9 h-9 flex items-center justify-center text-gray-400 font-bold tracking-widest text-sm pointer-events-none">...</span>
               ) : (
                 <button 
                   onClick={() => onPageChange(page)}
                   className={`w-9 h-9 rounded-full font-bold text-sm transition-all focus:outline-none flex items-center justify-center ${
                     currentPage === page 
                       ? 'bg-black text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:scale-105'
                       : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-black'
                   }`}
                 >
                   {page}
                 </button>
               )}
             </React.Fragment>
          ))}
        </div>
        <Button 
          variant="ghost" 
          className="rounded-full px-5 text-sm font-semibold hover:bg-gray-100 text-gray-800 disabled:opacity-30 disabled:hover:bg-transparent"
          disabled={currentPage === totalPages || total === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
