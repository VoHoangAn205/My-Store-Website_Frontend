import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const isOpen = useSelector((state) => state.UI.sidebarStatus);

  return (
    <>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </>
  );
}

export default HomePage;
