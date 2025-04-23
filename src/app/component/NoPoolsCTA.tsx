// app/components/NoPoolsCTA.tsx
import React from 'react';

interface NoPoolsCTAProps {
  onCreatePool: () => void;
}

const NoPoolsCTA: React.FC<NoPoolsCTAProps> = ({ onCreatePool }) => {
  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg text-center max-w-2xl">
      <div className="p-8">
        <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">No Taxi Pools Yet</h3>
        <p className="text-gray-600 mb-8">Be the first to create a taxi pool and help build our community of student travelers!</p>
        <button 
          onClick={onCreatePool} 
          className="bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium text-lg shadow-md inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create First Pool
        </button>
      </div>
    </div>
  );
};

export default NoPoolsCTA;