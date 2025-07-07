import React from 'react';

// LoadingShimmer component - creates a placeholder loading effect
const LoadingShimmer = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 rounded-lg h-64 w-full mb-4"></div>
      <div className="space-y-3">
        <div className="bg-gray-300 rounded h-4 w-3/4"></div>
        <div className="bg-gray-300 rounded h-4 w-1/2"></div>
        <div className="bg-gray-300 rounded h-4 w-1/4"></div>
      </div>
    </div>
  );
};

// ProductGridSkeleton component - shows multiple loading shimmers for product grid
export const ProductGridSkeleton = () => {
  // Create an array of 8 items to show 8 loading skeletons
  const skeletonItems = Array.from({ length: 8 }, (_, index) => index);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonItems.map((index) => (
        <LoadingShimmer key={index} />
      ))}
    </div>
  );
};

export default LoadingShimmer;