export default function HiddenSearchBar() {
  return (
    <>
      <div className="w-full max-w-md md:hidden mb-10">
        <form
          action="/search"
          method="GET"
          className="relative flex items-center group"
        >
          <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-brand-slate group-focus-within:text-brand-rust transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search collection..."
            className="w-full pl-12 pr-4 py-3 bg-white text-brand-dark placeholder-brand-slate/60 rounded-xl border border-brand-sand shadow-sm focus:outline-none focus:border-brand-rust focus:ring-4 focus:ring-brand-rust/10"
          />
        </form>
      </div>
    </>
  );
}
