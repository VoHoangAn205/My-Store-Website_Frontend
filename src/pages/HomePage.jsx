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
    dispatch(getNewArrivalProducts({ limit: 8 }));
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
              </div>

              {/* 4-Column Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivalsList.data.slice(0, 4).map((product) => {
                  return <ProductCardv2 data={product} key={product._id} />;
                })}
              </div>
            </section>

            {/* SECTION 3: MOST POPULAR */}
            <section>
              {/* Section Header */}
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-brand-sand">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark tracking-tight">
                    Most Popular
                  </h2>
                  <p className="text-sm text-brand-slate mt-1">
                    Most popular items chosen by our customers
                  </p>
                </div>
              </div>

              {/* 4-Column Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivalsList.data.slice(4).map((product) => {
                  return <ProductCardv2 data={product} key={product._id} />;
                })}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
