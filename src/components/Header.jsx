import { useState } from "react";
import HiddenSearchBar from "./hiddenSearchBar";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/uiSlice";

function Header() {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <header className="bg-brand-dark p-5 border-b border-brand-sand/20 sticky z-50 top-0 shadow-md">
        <div className="mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-3">
            <button className="md:hidden" onClick={handleToggle}>
              <i className="fa-solid fa-bars text-brand-light text-[27px]"></i>
            </button>

            <a
              href="#"
              className="text-xl font-black tracking-widest text-brand-light hover:text-brand-rust transition-colors duration-200"
            >
              HOANGAN<span className="text-brand-rust">.</span>
            </a>
          </div>

          <SearchBar />

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <button className="relative p-2 text-brand-sand hover:text-brand-rust transition-colors duration-200">
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-rust rounded-full"></span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
