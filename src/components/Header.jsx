import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Header component - displays at the top of every page
const Header = () => {
  const { state } = useCart(); // Get cart state from context
  const location = useLocation(); // Get current route to highlight active nav
  
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Store className="h-8 w-8" />
              <span className="text-xl font-bold">ShopHub</span>
            </Link>
          </div>
          
          {/* Navigation section */}
          <nav className="flex items-center space-x-8">
            {/* Home link - highlighted when on home page */}
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            
            {/* Cart link - shows item count badge */}
            <Link
              to="/cart"
              className={`relative flex items-center space-x-1 text-sm font-medium transition-colors ${
                location.pathname === '/cart' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {/* Cart count badge - only shows if there are items in cart */}
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {state.itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;