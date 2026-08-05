import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "../redux/productSlice";
import { useParams, useSearchParams } from "react-router";

const CategoryPage = () => {
  const dispatch = useDispatch;
  const [searchParams, setSearchParams] = useSearchParams();
  const id = useParams().id;
  const page = parseInt(searchParams.get("page") || "1");
  const listProduct = useSelector((state) => state.PRODUCT.listProductByCate);
  const isLoading = useSelector(
    (state) => state.PRODUCT.isLoading.listProductByCate,
  );

  useEffect(() => {
    dispatch(getProductByCategory({ id, page }));
  }, [dispatch]);
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
                Page <strong className="text-brand-dark">1</strong> of{" "}
                <strong className="text-brand-dark">3</strong>
              </span>
              <span className="text-brand-sand">|</span>
              <span>
                <strong className="text-brand-dark">12</strong> items total
              </span>
            </div>

            {/* Sorting Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort"
                  className="text-sm font-medium text-brand-slate flex-shrink-0"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="bg-brand-light border border-brand-sand text-brand-dark text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-brand-rust transition"
                >
                  <option value="createdAt_desc">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                </select>
              </div>

              {/* Limit / Items Per Page Selector */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="limit"
                  className="text-sm font-medium text-brand-slate flex-shrink-0"
                >
                  Show:
                </label>
                <select
                  id="limit"
                  className="bg-brand-light border border-brand-sand text-brand-dark text-sm rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-brand-rust transition"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                </select>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID (Full Width 4-Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {/* PRODUCT CARD 1 */}
            <div className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200">
              <div>
                <div className="w-full h-48 bg-brand-light rounded-lg mb-4 overflow-hidden border border-brand-sand/60">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop"
                    alt="Noise-Canceling Headphones"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-2 bg-brand-slate/15 text-brand-slate">
                  Available
                </span>
                <h3 className="font-semibold text-brand-dark text-base line-clamp-2 mb-2">
                  Wireless Noise-Canceling Headphones
                </h3>
              </div>
              <div className="pt-4 border-t border-brand-sand/60 mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-brand-rust">
                  $199.99
                </span>
                <button
                  type="button"
                  className="bg-brand-dark hover:bg-brand-dark/90 text-white text-xs font-medium py-2 px-3 rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* PRODUCT CARD 2 */}
            <div className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200">
              <div>
                <div className="w-full h-48 bg-brand-light rounded-lg mb-4 overflow-hidden border border-brand-sand/60">
                  <img
                    src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop"
                    alt="Portable Bluetooth Speaker"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-2 bg-brand-slate/15 text-brand-slate">
                  Available
                </span>
                <h3 className="font-semibold text-brand-dark text-base line-clamp-2 mb-2">
                  Waterproof Portable Bluetooth Speaker
                </h3>
              </div>
              <div className="pt-4 border-t border-brand-sand/60 mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-brand-rust">
                  $89.50
                </span>
                <button
                  type="button"
                  className="bg-brand-dark hover:bg-brand-dark/90 text-white text-xs font-medium py-2 px-3 rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* PRODUCT CARD 3 (Out of Stock) */}
            <div className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200">
              <div>
                <div className="w-full h-48 bg-brand-light rounded-lg mb-4 overflow-hidden border border-brand-sand/60">
                  <img
                    src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop"
                    alt="Studio Monitor Earbuds"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-2 bg-brand-rust/15 text-brand-rust">
                  Out of Stock
                </span>
                <h3 className="font-semibold text-brand-dark text-base line-clamp-2 mb-2">
                  In-Ear Studio Monitor Wireless Earbuds
                </h3>
              </div>
              <div className="pt-4 border-t border-brand-sand/60 mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-brand-rust">
                  $129.00
                </span>
                <button
                  type="button"
                  className="bg-brand-dark/50 text-white text-xs font-medium py-2 px-3 rounded-lg cursor-not-allowed"
                >
                  Unavailable
                </button>
              </div>
            </div>

            {/* PRODUCT CARD 4 (SKELETON) */}
            <div className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm animate-pulse flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-brand-light rounded-lg mb-4"></div>
                <div className="h-3 w-1/3 bg-brand-light rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-brand-light rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-brand-light rounded mb-4"></div>
              </div>
              <div className="pt-4 border-t border-brand-sand/60 mt-4 flex items-center justify-between">
                <div className="h-5 w-16 bg-brand-light rounded"></div>
                <div className="h-8 w-24 bg-brand-light rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* TRADITIONAL PAGINATION */}
          <div className="flex items-center justify-center gap-2 pt-6 border-t border-brand-sand">
            {/* Previous Button */}
            <button
              type="button"
              disabled
              className="px-4 py-2 border border-brand-sand bg-white text-sm font-medium text-brand-dark rounded-lg hover:bg-brand-light disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 px-2">
              <button
                type="button"
                className="w-9 h-9 text-sm font-semibold rounded-lg bg-brand-rust text-white shadow-sm"
              >
                1
              </button>
              <button
                type="button"
                className="w-9 h-9 text-sm font-semibold rounded-lg bg-white border border-brand-sand text-brand-dark hover:bg-brand-light"
              >
                2
              </button>
              <button
                type="button"
                className="w-9 h-9 text-sm font-semibold rounded-lg bg-white border border-brand-sand text-brand-dark hover:bg-brand-light"
              >
                3
              </button>
            </div>

            {/* Next Button */}
            <button
              type="button"
              className="px-4 py-2 border border-brand-sand bg-white text-sm font-medium text-brand-dark rounded-lg hover:bg-brand-light transition"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </>
  );
};
export default CategoryPage;
