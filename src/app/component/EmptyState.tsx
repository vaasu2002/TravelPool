import React from 'react';

interface EmptyStateProps {
  hasPoolsButFiltered?: boolean;
  onAddNew: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasPoolsButFiltered = false, onAddNew }) => {
  return (
    <div className="text-gray-500 text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      <p className="text-xl mb-2">No matching taxi pools found.</p>
      <p className="max-w-md mx-auto">
        {hasPoolsButFiltered
          ? "Try adjusting your search filters or create a new pool."
          : "There are no taxi pools available. Be the first to add one!"
        }
      </p>
      <button 
        onClick={onAddNew} 
        className="mt-6 bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors font-medium"
      >
        Create New Pool
      </button>
    </div>
  );
};

export default EmptyState;