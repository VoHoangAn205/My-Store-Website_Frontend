import React, { useState, useEffect } from "react";
import { privateApi } from "../../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAllUserProducts } from "../../redux/productSlice";
import ProductTableManager from "../../components/ProductTableManager";

export default function ProductManager() {
  const dispatch = useDispatch();
  const navigage = useNavigate();
  const userProducts = useSelector((state) => state.PRODUCT.userProducts);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State mapped to your backend counters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchVendorProducts = async () => {
      setIsLoading(true);

      dispatch(getAllUserProducts())
        .then((res) => {
          const { data } = res.payload;
          console.log(res.payload);

          setProducts(data || []);
          setTotalPages(totalPage || 1);
          setTotalCount(count || 0);
        })
        .catch((error) => {
          console.error("Failed to retrieve inventory data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchVendorProducts();
  }, [currentPage]); // Triggers automatic refetching on page state adjustments

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4">
      {/* Title Header Block */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Store Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Managing{" "}
            <span className="font-semibold text-slate-700">{totalCount}</span>{" "}
            live listings.
          </p>
        </div>
        <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 sm:py-2 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2">
          <i className="fa-solid fa-plus text-xs"></i> Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-mono text-xs animate-pulse">
          Refreshing inventory catalog items...
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium text-sm">
          Your inventory is empty.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* ==================== Render Table ==================== */}
          <ProductTableManager products={userProducts} />

          <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Showing page{" "}
              <span className="font-bold text-slate-700">{currentPage}</span> of{" "}
              <span className="font-bold text-slate-700">{totalPages}</span>
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-40 transition-colors"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>

              {/* Render structural numeric selectors */}
              {[...Array(totalPages)].map((_, index) => {
                const pageIndex = index + 1;
                const isCurrent = pageIndex === currentPage;

                return (
                  <button
                    key={pageIndex}
                    onClick={() => handlePageChange(pageIndex)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                      isCurrent
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {pageIndex}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-40 transition-colors"
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
