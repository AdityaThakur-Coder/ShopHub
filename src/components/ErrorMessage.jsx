import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

// ErrorMessage component - displays error states with optional retry button
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
        {/* Error icon */}
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        
        {/* Error message */}
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600 mb-4">
          {message}
        </p>
        
        {/* Retry button - only shows if onRetry function is provided */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 mx-auto focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;