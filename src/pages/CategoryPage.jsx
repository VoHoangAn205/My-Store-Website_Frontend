import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router";
import { getProductByCategory } from "../redux/productSlice";
import LoadingCardSkeleton from "../components/LoadingCardSkeleton";
import NoProductFound from "../components/NoProductFound";
import ProductCard from "../components/ProductCard";
const limitOptions = ["12", "16", "24"];
const sortOptions = [
  { label: "Newest Arrival", value: "newest" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

const CategoryPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = useParams().id;
  const page = parseInt(searchParams.get("page") || "1");
  const [limit, setLimit] = useState(12);
  const [sortType, setSortType] = useState("");

  const listProduct = useSelector((state) => state.PRODUCT.listProductByCate);
  const isLoading = useSelector(
    (state) => state.PRODUCT.isLoading.listProductByCate,
  );

  const {
    data = [],
    count = 0,
    totalPage = 1,
    currentPage = 1,
  } = listProduct || {};

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };
  console.log("a");

  const handleSortTypeChange = (e) => {
    setSortType(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPage) return;

    setSearchParams({ page: newPage.toString() });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getProductByCategory({ id, page, limit, sort: sortType }));
  }, [dispatch, id, page, limit, sortType]);
  return (
    <>
      <div className="min-h-screen bg-brand-light font-sans text-brand-dark">
        {/* PAGE HEADER & BREADCRUMBS */}
        <header className="bg-white border-b border-brand-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-brand-slate mb-3">
              <a href="#" className="hover:text-brand-rust transition">
                Home
              </a>
              <span>/</span>
              <a href="#" className="hover:text-brand-rust transition">
                Categories
              </a>
              <span>/</span>
              <span className="font-semibold text-brand-dark">Electronics</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-brand-dark">
                  Audio & Sound
                </h1>
                <p className="text-sm text-brand-slate mt-1">
                  Explore top-grade noise-canceling headphones, speakers, and
                  audio gear.
                </p>
              </div>

              {/* Total Item Counter */}
              <span className="text-sm text-brand-slate bg-brand-light border border-brand-sand px-3 py-1.5 rounded-lg self-start sm:self-auto">
                Showing <strong className="text-brand-dark">12</strong> Products
              </span>
            </div>
          </div>
        </header>

        {/* MAIN CATEGORY CONTAINER */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* FULL-WIDTH SORT & CONTROL BAR */}
          <div className="bg-white border border-brand-sand rounded-2xl p-4 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Items Count & Status */}
            <div className="flex items-center gap-4 text-sm text-brand-slate">
              <span>
                Page <strong className="text-brand-dark">{currentPage}</strong>{" "}
                of <strong className="text-brand-dark">{totalPage}</strong>
              </span>
              <span className="text-brand-sand">|</span>
              <span>
                <strong className="text-brand-dark">{count}</strong> items total
              </span>
            </div>

            {/* Sorting Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort"
                  className="text-sm font-medium text-brand-slate shrink-0"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  onChange={handleSortTypeChange}
                  className="bg-brand-light border border-brand-sand text-brand-dark text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-brand-rust transition"
                >
                  {sortOptions.map((opt) => {
                    return (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Limit / Items Per Page Selector */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="limit"
                  className="text-sm font-medium text-brand-slate shrink-0"
                >
                  Show:
                </label>
                <select
                  id="limit"
                  onChange={handleLimitChange}
                  className="bg-brand-light border border-brand-sand text-brand-dark text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-brand-rust transition"
                >
                  {limitOptions.map((idx) => {
                    return (
                      <option key={idx} value={idx}>
                        {idx}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <LoadingCardSkeleton />
          ) : data.length === 0 ? (
            <NoProductFound />
          ) : (
            <>
              {/* PRODUCT GRID (Full Width 4-Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                {data.map((item) => {
                  return <ProductCard data={item} key={item._id} />;
                })}
              </div>

              {/* TRADITIONAL PAGINATION */}
              {totalPage > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-brand-sand">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-brand-sand bg-white text-sm font-medium text-brand-dark rounded-lg hover:bg-brand-light disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 px-2">
                    {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`w-9 h-9 text-sm font-semibold rounded-lg transition ${
                            p === currentPage
                              ? "bg-brand-rust text-white shadow-sm"
                              : "bg-white border border-brand-sand text-brand-dark hover:bg-brand-light"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPage}
                    className="px-4 py-2 border border-brand-sand bg-white text-sm font-medium text-brand-dark rounded-lg hover:bg-brand-light disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};
export default CategoryPage;
