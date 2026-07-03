export default function ProductCard(params) {
  return (
    <>
      <article className="relative w-full bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-brand-sand group">
        <div className="relative aspect-square overflow-hidden bg-brand-light">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
            alt="Premium Wireless Headphones"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />

          <span className="absolute top-3 left-3 z-10 bg-brand-rust text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            New Arrival
          </span>
        </div>

        <div className="p-3">
          <span className="text-xs font-bold text-brand-slate uppercase tracking-wide">
            Audio Architecture
          </span>

          <h2 className="mt-2 text-xl font-bold text-brand-dark tracking-tight line-clamp-2 group-hover:text-brand-rust transition-colors duration-200">
            <a
              href="#"
              className="after:absolute after:inset-0 focus:outline-none"
            >
              StudioPro Wireless Noise-Cancelling Headphones
            </a>
          </h2>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-base sm:text-2xl font-extrabold text-brand-dark">
                299.000d
              </span>

              {/* <span className="text-xs text-brand-slate line-through">$349.00</span> */}
            </div>

            <button className="relative z-10 pointer-events-none bg-brand-dark group-hover:bg-brand-rust text-white text-xs sm:text-sm font-medium px-2 py-2.5 rounded-xl transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
