import React from "react";

export default function LoadingCardSkeleton({ count = 8 }) {
  // Generate an array based on the count prop to render multiple skeleton cards
  const skeletons = Array.from({ length: count });

  return (
    <div className="max-w-7xl mx-auto px-2 py-2">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm animate-pulse flex flex-col justify-between"
          >
            <div>
              {/* Product Image Skeleton */}
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>

              {/* Category / Tag Skeleton */}
              <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>

              {/* Product Title Skeleton */}
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            </div>

            <div>
              {/* Price and Rating row */}
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>

              {/* Action Button / Add to Cart Skeleton */}
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
