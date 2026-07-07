import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../redux/uiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../redux/userSlice";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.USER.userInfo);
  const isOpen = useSelector((state) => state.UI.sidebarStatus);
  const [activeTab, setActiveTab] = useState("cart");
  const userRoles = userInfo?.roles || [];
  const NAVIGATION_TABS = [
    { id: "cart", label: "Shopping Cart", icon: "fa-shopping-cart" },
    { id: "myPurchases", label: "My Purchases", icon: "fa-clock", count: 2 },
    { id: "history", label: "Order History", icon: "fa-history" },
    { id: "settings", label: "Account Settings", icon: "fa-user-gear" },
    {
      id: "createProduct",
      label: "Create Product",
      icon: "fa-solid fa-file-circle-plus",
      requiredRole: 1984,
    },
    {
      id: "productManager",
      label: "Product Manager",
      icon: "fa-solid fa-shapes",
      requiredRole: 1984,
    },
  ];

  const roleName = () => {
    switch (true) {
      case userRoles.includes(5150):
        return "Admin";
      case userRoles.includes(1984):
        return "Vendor";
      case userRoles.includes(2001):
        return "User";
      default:
        return "Guest";
    }
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  const handleNavigate = (id) => {
    setActiveTab(id);
    navigate(`/${id}`);
  };

  const visibleTabs = NAVIGATION_TABS.filter((tab) => {
    if (!tab.requiredRole) return true;

    return userRoles.includes(tab.requiredRole);
  });

  const RenderTabs = () => {
    return visibleTabs.map((tab) => {
      const isSelected = activeTab === tab.id;
      return (
        <button
          key={tab.id}
          onClick={() => handleNavigate(tab.id)}
          className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 whitespace-nowrap w-full text-left
                    ${
                      isSelected
                        ? "bg-brand-dark text-white shadow-sm"
                        : "text-brand-slate hover:bg-brand-light hover:text-brand-dark"
                    }`}
        >
          <div className="flex items-center gap-3">
            <i className={`fa-solid ${tab.icon} text-base`}></i>
            <span>{tab.label}</span>
          </div>

          {tab.count && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full 
                      ${isSelected ? "bg-brand-rust text-white" : "bg-brand-rust/10 text-brand-rust"}`}
            >
              {tab.count}
            </span>
          )}
        </button>
      );
    });
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
          transform transition-transform duration-300 ease-in-out p-4
          
          
          md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:pt-0 md:border-r md:z-30 
          md:transform-none md:translate-x-0
          
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="w-full bg-brand-dark px-2 mt-3">
          <div className="flex items-center gap-3 pb-6  border-b border-brand-sand/40">
            <i className="fa-solid fa-circle-user text-brand-light text-4xl"></i>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-brand-light">
                {userInfo?.username || "Member"}
              </span>
              <span className="text-xs text-brand-slate">{roleName()}</span>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 overflow-x-auto md:overflow-x-visible scrollbar-none">
          <RenderTabs />
        </nav>

        <div className="block border-t border-brand-sand/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-brand-slate hover:text-brand-rust rounded-xl transition-colors"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log Out Account</span>
          </button>
        </div>
      </aside>
    </>
  );
}
