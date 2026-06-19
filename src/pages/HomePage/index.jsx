import ProductCard from "../../components/productCard";

function HomePage() {
  return (
    <>
      <section className="flex flex-wrap justify-center gap-3">
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
