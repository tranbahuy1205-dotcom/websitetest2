
import React from 'react';
import { BotIcon, XIcon } from './IconComponents';

interface HeaderProps {
  onToggleGenerator: () => void;
  isGeneratorVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleGenerator, isGeneratorVisible }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Storefront</h1>
        </div>
        <button
          onClick={onToggleGenerator}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          aria-label="Toggle AI Product Generator"
        >
          {isGeneratorVisible ? <XIcon /> : <BotIcon />}
          <span className="hidden sm:inline">{isGeneratorVisible ? 'Close Generator' : 'AI Product Generator'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
