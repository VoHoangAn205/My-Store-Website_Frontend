import { useState } from "react";

function UserProfileDashboard() {
  // Local state to track which tab view is currently selected by the user
  const [activeTab, setActiveTab] = useState("cart");

  // Navigation configurations array helper matrix
  const tabs = [
    { id: "cart", label: "Shopping Cart", icon: "fa-shopping-cart" },
    { id: "pending", label: "Pending Orders", icon: "fa-clock", count: 2 },
    { id: "history", label: "Order History", icon: "fa-history" },
    { id: "settings", label: "Account Settings", icon: "fa-user-gear" },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-brand-light flex flex-col md:flex-row">
      {/* 1. INTERNAL ACCOUNT SIDEBAR NAVIGATION BAR */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-brand-sand flex flex-col justify-between shrink-0">
        <div className="p-4">
          {/* Quick User Context Profile Plackard */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-brand-sand/40">
            <i className="fa-solid fa-circle-user text-brand-dark text-4xl"></i>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-brand-dark">David</span>
              <span className="text-xs text-brand-slate">Premium Member</span>
            </div>
          </div>

          {/* Navigation Links Block Rows */}
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible scrollbar-none">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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

                  {/* Alert notification bubble pill badge context layout */}
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
            })}
          </nav>
        </div>

        {/* Lower Utility Logout Area Actions Block Panel */}
        <div className="hidden md:block p-4 border-t border-brand-sand/40">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-brand-slate hover:text-brand-rust rounded-xl transition-colors">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log Out Account</span>
          </button>
        </div>
      </aside>

      {/* 2. DYNAMIC MAIN WORKSPACE OUTLET DISPLAY CANVAS AREA */}
      <main className="grow p-6 sm:p-8 lg:p-10 max-w-5xl w-full">
        {/* Dynamic Display Rendering Engine Condition Logic Context Blocks */}
        {activeTab === "cart" && (
          <div>
            <h1 className="text-2xl font-black text-brand-dark tracking-tight mb-2">
              Your Shopping Cart
            </h1>
            <p className="text-sm text-brand-slate mb-6">
              Review products added to your active acquisition batch lists.
            </p>
            {/* Standard Item Grid Canvas or empty feedback states layout goes here */}
            <div className="bg-white border border-brand-sand rounded-2xl p-8 text-center text-brand-slate text-sm">
              Your cart matrix is empty. Explore our collection lines to load
              hardware components.
            </div>
          </div>
        )}

        {activeTab === "pending" && (
          <div>
            <h1 className="text-2xl font-black text-brand-dark tracking-tight mb-2">
              Pending Escrow Shipments
            </h1>
            <p className="text-sm text-brand-slate mb-6">
              Track live logistical updates and clearance verification queues.
            </p>

            {/* Example Active Order Shipment Tracking Container Card Layout */}
            <div className="bg-white border border-brand-sand rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-sand/40 pb-4 mb-4">
                <div>
                  <span className="text-xs text-brand-slate font-bold uppercase tracking-wider">
                    Order Reference ID
                  </span>
                  <div className="text-sm font-bold text-brand-dark">
                    #AUR-2026-99411
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-sand/40 text-brand-dark border border-brand-sand">
                  In Route Delivery Processing
                </span>
              </div>
              <div className="text-sm text-brand-slate">
                Estimated Cargo Delivery:{" "}
                <span className="font-semibold text-brand-dark">
                  June 26, 2026
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h1 className="text-2xl font-black text-brand-dark tracking-tight mb-2">
              Historical Invoices
            </h1>
            <p className="text-sm text-brand-slate mb-6">
              Review past purchases and access printable receipts.
            </p>
            <div className="bg-white border border-brand-sand rounded-2xl p-8 text-center text-brand-slate text-sm">
              No previous orders found for this account registration file.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserProfileDashboard;
