import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingCardSkeleton from "../components/LoadingCardSkeleton";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../redux/productSlice";

function HomePage() {
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.PRODUCT.listProducts);
  const loading = useSelector((state) => state.PRODUCT.isLoading);
  const isOpen = useSelector((state) => state.UI.sidebarStatus);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <LoadingCardSkeleton />
      </>
    );
  }
  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 ">
        {listProducts.data.map((item, i) => {
          return <ProductCard data={item} key={i} />;
        })}
      </section>
    </>
  );
}

export default HomePage;
