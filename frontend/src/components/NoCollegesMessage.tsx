import React from 'react';
import { BookX } from 'lucide-react';

/**
 * Enhanced NoCollegesMessage component
 * 
 * @param {Object} props - Component props
 * @param {string} props.typeOfCollege - Type of college (engineering, medical, etc.)
 * @param {Function} props.capitalize - Function to capitalize text
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} The NoCollegesMessage component
 */

interface NoCollegesMessageProps {
  typeOfCollege: string;
  className?: string;
}
const NoCollegesMessage = ({ typeOfCollege, className }: NoCollegesMessageProps) => {
  return (
    <div className={`col-span-full flex flex-col items-center justify-center py-12 px-6 bg-gray-50 rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <BookX className="w-16 h-16 text-gray-400 mb-4" />
      
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No {typeOfCollege} colleges found
      </h3>
      
      <p className="text-gray-500 text-center max-w-md mb-6">
        We couldn't find any {typeOfCollege} colleges matching your criteria. 
        Try adjusting your filters or check back later.
      </p>
      
      <button 
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
        onClick={() => window.location.reload()}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh Results
      </button>
    </div>
  );
};

export default NoCollegesMessage;