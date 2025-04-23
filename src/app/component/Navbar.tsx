import React from 'react';

interface NavbarProps {
  activeView: 'view' | 'add';
  setActiveView: (view: 'view' | 'add') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-800">TravelPool</h1>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={() => setActiveView('view')}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-md font-medium transition-colors ${
                activeView === 'view' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              View Pools
            </button>
            
            <button 
              onClick={() => setActiveView('add')}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-md font-medium transition-colors ${
                activeView === 'add' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              Add Pool
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;