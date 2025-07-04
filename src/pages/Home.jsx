import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/LoadingShimmer';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

// Home page component - displays the main product listing
const Home = () => {
  // State for managing products data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Function to fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching products from API...'); // This will show in browser console
      
      // Fetch products from FakeStore API
      const response = await fetch('https://fakestoreapi.com/products');
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse JSON response
      const data = await response.json();
      
      console.log('Products fetched successfully:', data.length); // This will show in browser console
      
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err); // This will show in browser console
      setError('Failed to load products. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // useEffect hook to fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this runs only once on mount
  
  // Render loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>
        <ProductGridSkeleton />
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} onRetry={fetchProducts} />
      </div>
    );
  }
  
  // Render empty state (if no products found)
  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="No Products Found"
          message="We couldn't find any products at the moment. Please try again later."
          showShopButton={false}
        />
      </div>
    );
  }
  
  // Render products grid
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-600">
          Discover amazing products at great prices ({products.length} products)
        </p>
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;