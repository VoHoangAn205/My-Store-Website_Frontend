export default function ProductDetailPage(params) {
  return (
    <>
      <main>
        <a
          href="#"
          class="inline-flex items-center text-sm font-medium text-brand-slate hover:text-brand-rust mb-8 transition-colors duration-200 group"
        >
          <svg
            class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to collection
        </a>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div class="space-y-4">
            <div class="aspect-square bg-white rounded-3xl overflow-hidden border border-brand-sand shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                alt="StudioPro Headphones Main View"
                class="w-full h-full object-cover object-center"
              />
            </div>
            <div class="grid grid-cols-4 gap-4">
              <button class="aspect-square rounded-xl overflow-hidden border-2 border-brand-rust bg-white">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80"
                  class="w-full h-full object-cover"
                />
              </button>
              <button class="aspect-square rounded-xl overflow-hidden border border-brand-sand bg-white opacity-60 hover:opacity-100 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80"
                  class="w-full h-full object-cover"
                />
              </button>
              <button class="aspect-square rounded-xl overflow-hidden border border-brand-sand bg-white opacity-60 hover:opacity-100 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=200&q=80"
                  class="w-full h-full object-cover"
                />
              </button>
              <button class="aspect-square rounded-xl overflow-hidden border border-brand-sand bg-white opacity-60 hover:opacity-100 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=200&q=80"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="flex items-center justify-between gap-4">
              <span class="text-xs font-bold text-brand-slate uppercase tracking-widest">
                Audio Architecture
              </span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-sand/30 text-brand-dark border border-brand-sand">
                In Stock
              </span>
            </div>

            <h1 class="mt-4 text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
              StudioPro Wireless Noise-Cancelling Headphones
            </h1>

            <div class="mt-4 flex items-baseline space-x-4">
              <span class="text-3xl font-black text-brand-dark">$299.00</span>
              <span class="text-lg text-brand-slate line-through">$349.00</span>
              <span class="text-xs font-bold text-brand-rust uppercase tracking-wider">
                Save $50.00
              </span>
            </div>

            <p class="mt-6 text-base text-brand-slate leading-relaxed">
              Engineered for pure fidelity. Experience pristine high-definition
              audio profile rendering mixed with advanced, hybrid adaptive
              active noise cancellation technology. Designed with architectural
              grade premium hardware built to survive heavy travel schedules.
            </p>

            <div class="mt-8 border-t border-brand-sand/40 pt-6">
              <h3 class="text-sm font-bold text-brand-dark uppercase tracking-wider">
                Colorway
              </h3>
              <div class="mt-3 flex items-center space-x-3">
                <button
                  class="w-8 h-8 rounded-full bg-[#161925] ring-2 ring-offset-2 ring-brand-rust focus:outline-none"
                  title="Charcoal Dark"
                ></button>
                <button
                  class="w-8 h-8 rounded-full bg-[#5a7684] ring-1 ring-brand-sand/60 hover:ring-brand-slate focus:outline-none"
                  title="Slate Blue"
                ></button>
                <button
                  class="w-8 h-8 rounded-full bg-[#e2dbbe] ring-1 ring-brand-sand/60 hover:ring-brand-slate focus:outline-none"
                  title="Alabaster Sand"
                ></button>
              </div>
            </div>

            <div class="mt-6">
              <div class="flex items-center justify-between text-sm">
                <h3 class="font-bold text-brand-dark uppercase tracking-wider">
                  Carry Case Style
                </h3>
                <a href="#" class="text-brand-rust hover:underline font-medium">
                  View specs
                </a>
              </div>
              <div class="mt-3 grid grid-cols-2 gap-3">
                <button class="border-2 border-brand-dark p-3 rounded-xl text-left bg-white font-medium text-sm flex justify-between items-center">
                  <span>Slim Leather Travel Shell</span>
                  <span class="w-2 h-2 bg-brand-dark rounded-full"></span>
                </button>
                <button class="border border-brand-sand p-3 rounded-xl text-left bg-white text-brand-slate hover:border-brand-slate transition-colors text-sm font-medium">
                  <span>Premium Hardbox Stand</span>
                </button>
              </div>
            </div>

            <div class="mt-8 flex flex-col sm:flex-row items-stretch gap-4">
              <div class="flex items-center justify-between border border-brand-sand rounded-xl bg-white px-4 py-3.5 sm:w-32">
                <button class="text-brand-slate hover:text-brand-dark font-bold text-lg">
                  -
                </button>
                <span class="text-sm font-bold text-brand-dark select-none">
                  1
                </span>
                <button class="text-brand-slate hover:text-brand-dark font-bold text-lg">
                  +
                </button>
              </div>

              <button class="flex-grow bg-brand-rust hover:bg-brand-dark text-white text-base font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-brand-rust/20">
                Add to Shopping Bag
              </button>
            </div>

            <div class="mt-8 border-t border-brand-sand/40 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-brand-slate">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-brand-rust mr-2.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.318-5.185a3.375 3.375 0 0 0-2.453-3.043L16.5 4.875A3.375 3.375 0 0 0 13.5 1.5h-3m-3.375 0H1.5m1.5 13.5h17.25c.621 0 1.125-.504 1.125-1.125V9.75M8.25 13.5h7.5M12 10.5V3.75"
                  />
                </svg>
                Free Worldwide Cargo Shipping
              </div>
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-brand-rust mr-2.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z"
                  />
                </svg>
                3 Year Full Coverage Warranty
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
