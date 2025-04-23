import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 mt-10 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-xl font-bold text-indigo-800">TravelPool</span>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-100 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} TravelPool. All rights reserved.</p>
          <p className="mt-2">Connect with fellow students for affordable and convenient rides.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;