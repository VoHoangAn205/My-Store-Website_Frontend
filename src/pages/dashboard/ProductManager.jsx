import React, { useState, useEffect } from "react";
import { privateApi } from "../../services/axiosInstance";
import { useSelector } from "react-redux";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State mapped to your backend counters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10; // Items per page configuration

  useEffect(() => {
    const fetchVendorProducts = async () => {
      setIsLoading(true);
      try {
        // Appending standard query pagination variables down to your endpoint
        const response = await privateApi.get(
          `http://localhost:3500/products/myOwn?page=${currentPage}&limit=${limit}`,
        );

        // Adjust these paths depending on how your backend controller outputs data objects
        const { items, totalPage, count } = response.data || {};

        setProducts(items || []);
        setTotalPages(totalPage || 1);
        setTotalCount(count || 0);
      } catch (error) {
        console.error("Failed to retrieve inventory data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorProducts();
  }, [currentPage]); // Triggers automatic refetching on page state adjustments

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title Header Block */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Store Inventory
          </h1>
          <p className="text-sm text-slate-500">
            Managing{" "}
            <span className="font-semibold text-slate-700">{totalCount}</span>{" "}
            live marketplace listings.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i> Add New Product
        </button>
      </div>

      {/* Main Content Loading Wrapper */}
      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-mono text-xs animate-pulse">
          Refreshing inventory catalog items...
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium">
          Your inventory is empty. Click "Add New Product" to list your first
          item.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Inventory Data Table Layout */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[11px] font-mono uppercase tracking-wider">
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Inventory Code</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="divide-y divide-slate-100">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex flex-wrap md:flex-nowrap items-center justify-between p-6 gap-4 hover:bg-slate-50/50 transition-colors"
              >
                {/* Title & Product Info */}
                <div className="flex items-center gap-4 min-w-[280px]">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i className="fa-solid fa-image text-lg"></i>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm capitalize">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      {product._id}
                    </p>
                  </div>
                </div>

                {/* Financial Fields */}
                <div className="text-sm font-mono font-semibold text-slate-700 min-w-[100px]">
                  ${(product.price || 0).toLocaleString()}
                </div>

                {/* Product References */}
                <div className="text-xs font-mono text-slate-500 min-w-[120px]">
                  {product.sku || "N/A"}
                </div>

                {/* Quick Functional Dashboard Controls */}
                <div className="flex items-center gap-2 justify-end grow md:grow-0">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DYNAMIC PAGINATION CONTROLS HUB */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
            {/* Range Output Metrics Tracking Text */}
            <p className="text-xs text-slate-500">
              Showing page{" "}
              <span className="font-bold text-slate-700">{currentPage}</span> of{" "}
              <span className="font-bold text-slate-700">{totalPages}</span>
            </p>

            {/* Pagination Button Navigation Track */}
            <div className="flex items-center gap-1.5">
              {/* Previous Control Arrow Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>

              {/* Render Numeric Layout Buttons Dynamically */}
              {[...Array(totalPages)].map((_, index) => {
                const pageIndex = index + 1;
                const isCurrent = pageIndex === currentPage;

                return (
                  <button
                    key={pageIndex}
                    onClick={() => handlePageChange(pageIndex)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors select-none ${
                      isCurrent
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageIndex}
                  </button>
                );
              })}

              {/* Next Control Arrow Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed transition-colors"
              >
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
