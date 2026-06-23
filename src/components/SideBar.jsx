import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../redux/uiSlice";

export default function SideBar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.UI.sidebarStatus);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={handleCloseSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      <aside
        className={`
          bg-brand-dark text-white border-brand-sand/10
          fixed inset-y-0 left-0 w-64 h-full z-50 top-20
          transform transition-transform duration-300 ease-in-out
          
          
          md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:pt-0 md:border-r md:z-30 
          md:transform-none md:translate-x-0
          
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col p-4 gap-1">
          <a
            href="#"
            className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl bg-brand-rust text-white"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-brand-slate hover:bg-white/5 hover:text-white transition-colors"
          >
            Products
          </a>
        </nav>
      </aside>
    </>
  );
}
