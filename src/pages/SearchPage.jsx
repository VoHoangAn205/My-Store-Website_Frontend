import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router";
import { searchProduct } from "../redux/productSlice";
import LoadingCardSkeleton from "../components/LoadingCardSkeleton";
import ProductCard from "../components/ProductCard"; //use this for render card
import NoProductFound from "../components/NoProductFound";

function SearchPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10);

  const listRes = useSelector((state) => state.PRODUCT.searchProduct);
  const isLoading = useSelector(
    (state) => state.PRODUCT.isLoading.searchProduct,
  );

  const {
    data = [],
    count = 0,
    currentPage = 1,
    totalPage = 1,
  } = listRes || {};

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPage) return;

    setSearchParams({ query, page: newPage.toString() });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(searchProduct({ page, query, limit: 8 }));
  }, [dispatch, query, page]);

  return (
    <>
      <div className="min-h-screen bg-brand-light">
        <div className="max-w-7xl mx-auto">
          {/* Results Info Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-sand">
            <h1 className="text-2xl font-bold text-brand-dark">
              Search Results for:{" "}
              <span className="text-brand-rust">"{query}"</span>
            </h1>
            {!isLoading && (
              <span className="text-sm text-brand-slate">
                Found <strong className="text-brand-dark">{count}</strong> items
              </span>
            )}
          </div>

          {/* Content Area */}
          {isLoading ? (
            <LoadingCardSkeleton count={8} />
          ) : !query ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-brand-sand shadow-sm">
              <span className="text-4xl">🔍</span>
              <p className="mt-2 text-brand-slate font-medium">
                Please enter a keyword to search for products.
              </p>
            </div>
          ) : data.length === 0 ? (
            <NoProductFound />
          ) : (
            <>
              {/* Product Grid */}
              <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 ">
                {data.map((product) => (
                  <ProductCard data={product} key={product._id} />
                ))}
              </section>

              {/* Pagination Controls */}
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

                  {/* Page Number Buttons */}
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
        </div>
      </div>
    </>
  );
}

export default SearchPage;
