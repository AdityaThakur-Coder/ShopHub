import React from 'react';
import { Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

// ProductCard component - displays a single product with add to cart functionality
const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Get addToCart function from context
  
  // Handler function for adding product to cart
  const handleAddToCart = () => {
    addToCart(product);
    // You could add a toast notification here in a real app
    console.log(`Added ${product.title} to cart`); // This will show in browser console
  };
  
  // Format price to show 2 decimal places
  const formattedPrice = product.price.toFixed(2);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Product image container */}
      <div className="relative overflow-hidden h-64 bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy" // Lazy load images for better performance
        />
      </div>
      
      {/* Product information */}
      <div className="p-4">
        {/* Product title - truncated if too long */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
          {product.title}
        </h3>
        
        {/* Product category */}
        <p className="text-sm text-gray-500 mb-2 capitalize">
          {product.category}
        </p>
        
        {/* Rating section */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating.rate}
            </span>
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.rating.count} reviews)
          </span>
        </div>
        
        {/* Price and add to cart section */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${formattedPrice}
          </span>
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;