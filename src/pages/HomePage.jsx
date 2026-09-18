import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from "../components/CategoryCard";
import { CategoryCardSkeleton } from "../components/CategoryCardSkeleton";
import LoadingCardSkeleton from "../components/LoadingCardSkeleton";
import NoProductFound from "../components/NoProductFound";
import ProductCardv2 from "../components/ProductCardv2";
import { getNewArrivalProducts } from "../redux/productSlice";

function HomePage() {
  const dispatch = useDispatch();
  const newArrivalsList = useSelector((state) => state.PRODUCT.newArrivalsList);
  const homePageCategories = useSelector(
    (state) => state.CATEGORY.homePageCategories,
  );
  const categoryIsLoading = useSelector(
    (state) => state.CATEGORY.isLoading.categories,
  );
  const isLoading = useSelector(
    (state) => state.PRODUCT.isLoading.newArrivalsList,
  );

  useEffect(() => {
    dispatch(getNewArrivalProducts({ limit: 4 }));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingCardSkeleton />
      ) : newArrivalsList.length === 0 ? (
        <NoProductFound />
      ) : (
        <div className="min-h-screen bg-brand-light font-sans text-brand-dark py-12 space-y-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* SECTION 1: FEATURED CATEGORIES (Quick Hub) */}
            <section>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-brand-sand">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark tracking-tight">
                    Shop by Category
                  </h2>
                  <p className="text-sm text-brand-slate mt-1">
                    Browse our main collections
                  </p>
                </div>
                {/* View All Link */}
                <a
                  href="/categories"
                  className="text-sm font-semibold text-brand-rust hover:underline flex items-center gap-1 group"
                >
                  All Categories
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categoryIsLoading ? (
                  <CategoryCardSkeleton />
                ) : (
                  homePageCategories.map((cate) => {
                    return <CategoryCard data={cate} />;
                  })
                )}
              </div>
            </section>

            {/* SECTION 2: NEW ARRIVALS (Limit to 4 items) */}
            <section>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-brand-sand">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-rust/10 text-brand-rust text-xs font-bold px-2 py-0.5 rounded">
                      NEW
                    </span>
                    <h2 className="text-2xl font-bold text-brand-dark tracking-tight">
                      New Arrivals
                    </h2>
                  </div>
                  <p className="text-sm text-brand-slate mt-1">
                    Just landed in our store this week
                  </p>
                </div>

                {/* View All Link -> Navigates to full sorted page */}
                <a
                  href="/products?sort=createdAt_desc"
                  className="text-sm font-semibold text-brand-rust hover:underline flex items-center gap-1 group"
                >
                  View All New
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>

              {/* 4-Column Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivalsList.data.map((product) => {
                  return <ProductCardv2 data={product} key={product._id} />;
                })}
              </div>
            </section>

            {/* SECTION 3: TOP SELLERS / FEATURED */}
            <section>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-brand-sand">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark tracking-tight">
                    Best Sellers
                  </h2>
                  <p className="text-sm text-brand-slate mt-1">
                    Most popular items chosen by our customers
                  </p>
                </div>

                <a
                  href="/products?sort=sales_desc"
                  className="text-sm font-semibold text-brand-rust hover:underline flex items-center gap-1 group"
                >
                  View All Best Sellers
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>

              {/* 4-Column Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Item 1 */}
                <div className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="w-full h-44 bg-brand-light rounded-lg mb-3 overflow-hidden border border-brand-sand/60">
                      <img
                        src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop"
                        alt="Laptop"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-brand-dark text-sm line-clamp-2 mb-1">
                      Ultra-Slim 14" Laptop Pro
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-brand-sand/60 mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-brand-rust">
                      $899.00
                    </span>
                    <button
                      type="button"
                      className="bg-brand-dark hover:bg-brand-dark/90 text-white text-xs font-medium py-1.5 px-3 rounded-lg transition"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="w-full h-44 bg-brand-light rounded-lg mb-3 overflow-hidden border border-brand-sand/60">
                      <img
                        src="https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop"
                        alt="Earbuds"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-brand-dark text-sm line-clamp-2 mb-1">
                      True Wireless Charging Earbuds
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-brand-sand/60 mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-brand-rust">
                      $79.99
                    </span>
                    <button
                      type="button"
                      className="bg-brand-dark hover:bg-brand-dark/90 text-white text-xs font-medium py-1.5 px-3 rounded-lg transition"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="w-full h-44 bg-brand-light rounded-lg mb-3 overflow-hidden border border-brand-sand/60">
                      <img
                        src="https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&auto=format&fit=crop"
                        alt="Controller"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-brand-dark text-sm line-clamp-2 mb-1">
                      Ergonomic Wireless Gamepad
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-brand-sand/60 mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-brand-rust">
                      $59.00
                    </span>
                    <button
                      type="button"
                      className="bg-brand-dark hover:bg-brand-dark/90 text-white text-xs font-medium py-1.5 px-3 rounded-lg transition"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="bg-white border border-brand-sand rounded-xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="w-full h-44 bg-brand-light rounded-lg mb-3 overflow-hidden border border-brand-sand/60">
                      <img
                        src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop"
                        alt="Keyboard"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-brand-dark text-sm line-clamp-2 mb-1">
                      Compact Mechanical Keyboard
                    </h3>
                  </div>
                  <div className="pt-3 border-t border-brand-sand/60 mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-brand-rust">
                      $119.50
                    </span>
                    <button
                      type="button"
                      className="bg-brand-dark hover:bg-brand-dark/90 text-white text-xs font-medium py-1.5 px-3 rounded-lg transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
