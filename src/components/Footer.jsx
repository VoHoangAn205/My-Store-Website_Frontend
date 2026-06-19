export default function Footer(params) {
  return (
    <>
      <footer className="bg-brand-dark text-brand-slate border-t border-brand-sand/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <span className="text-lg font-black tracking-widest text-white">
              HOANGAN<span className="text-brand-rust">.</span>
            </span>
            <p className="mt-4 text-sm text-brand-slate/80 leading-relaxed max-w-sm">
              Crafting premium modular audio assets designed for functional
              minimalism, aesthetic harmony, and acoustic precision.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-brand-sand uppercase tracking-widest mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Manifesto
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability Commitments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Retail Locations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-brand-sand uppercase tracking-widest mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping & Global Logistics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Warranty & Return Policies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Direct Technical Help
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-slate/60 gap-4">
          <p>
            &copy; 2026 AURA Inc. Architectural Sound Labs. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
