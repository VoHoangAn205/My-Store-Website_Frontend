import { useEffect, useRef, useState } from "react";
import HiddenSearchBar from "./hiddenSearchBar";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/uiSlice";
import { useNavigate } from "react-router";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const categories = [
    { name: "All Products", href: "/shop" },
    { name: "Audio Systems", href: "/shop/audio" },
    { name: "Studio Monitors", href: "/shop/monitors" },
    { name: "Headphones", href: "/shop/headphones" },
    { name: "Cables & Accessories", href: "/shop/accessories" },
  ];
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <header className="bg-brand-dark p-5 border-b border-brand-sand/20 sticky z-50 top-0 shadow-md">
        <div className="mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-6 items-baseline">
            <button className="md:hidden" onClick={handleToggle}>
              <i className="fa-solid fa-bars text-brand-light text-[27px]"></i>
            </button>

            <a
              onClick={() => {
                navigate("/");
              }}
              className="text-xl font-black tracking-widest text-brand-light hover:text-brand-rust transition-colors duration-200"
            >
              HOANGAN<span className="text-brand-rust">.</span>
            </a>

            {/* dropdown menu */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm font-semibold text-brand-light hover:text-brand-rust transition-colors duration-200 focus:outline-none cursor-pointer"
              >
                <span>Categories</span>
                <i
                  className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                ></i>
              </button>

              {/* THE ACTUAL DROPDOWN FLOATING CARD */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-4 w-56 bg-brand-dark border border-brand-sand/20 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.map((cat, idx) => (
                    <a
                      key={idx}
                      href={cat.href}
                      className="flex items-center px-4 py-2.5 text-sm font-medium text-brand-slate hover:bg-white/5 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)} // Close menu when an option is clicked
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <SearchBar />

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <button className="relative p-2 text-brand-sand hover:text-brand-rust transition-colors duration-200">
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-rust rounded-full"></span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375’ .375 0 1 1-.75 0 .375 .375 0 0 1 .75 0Zm7.5 0a.375 .375 0 1 1-.75 0 .375 .375 0 0 1 .75 0Z"
                ></path>
              </svg>
            </button>
          </nav>
        </div>
      </header>
      <HiddenSearchBar />
    </>
  );
}

export default Header;
