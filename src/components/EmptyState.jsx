import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// EmptyState component - displays empty states (like empty cart)
const EmptyState = ({ title, message, showShopButton = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center">
        {/* Empty state icon */}
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
        
        {/* Empty state title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        {/* Empty state message */}
        <p className="text-gray-500 mb-6 max-w-md">
          {message}
        </p>
        
        {/* Continue shopping button - only shows if showShopButton is true */}
        {showShopButton && (
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;