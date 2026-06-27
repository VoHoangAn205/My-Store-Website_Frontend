import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserOrder } from "../../redux/orderSlice";

// Mock Data structure modeling exactly what comes from your buyer_id backend queries
const MOCK_PURCHASES = [
  {
    orderId: "ORD-2026-9941",
    purchaseDate: "June 24, 2026 • 02:14 PM",
    totalPrice: 145.0,
    status: "Delivered",
    statusColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    items: [
      {
        id: "p1",
        name: "Minimalist Leather Cardholder",
        price: 45.0,
        shopName: "UrbanCraft Studio",
        shopUrl: "/shops/urbancraft-studio",
      },
      {
        id: "p2",
        name: "Raw Denim Work Jacket",
        price: 100.0,
        shopName: "IndieWeave Co.",
        shopUrl: "/shops/indieweave-co",
      },
    ],
  },
  {
    orderId: "ORD-2026-8812",
    purchaseDate: "June 18, 2026 • 10:05 AM",
    totalPrice: 29.99,
    status: "In Transit",
    statusColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    items: [
      {
        id: "p3",
        name: "Organic Soy Wax Candle (Sandalwood)",
        price: 29.99,
        shopName: "AromaTerra",
        shopUrl: "/shops/aromaterra",
      },
    ],
  },
];

function MyPurchases() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.USER.token);
  const [expandedOrders, setExpandedOrders] = useState({
    "ORD-2026-9941": true,
  });

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  useEffect(() => {
    dispatch(getAllUserOrder());
  }, []);

  return (
    <div className="min-h-screen bg-brand-light p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">
            My Purchases
          </h1>
          <p className="text-sm text-brand-slate mt-1">
            Track shipments, review receipt totals, and revisit your favorite
            merchant storefronts.
          </p>
        </div>

        {/* Orders Stack Wrapper */}
        <div className="space-y-4">
          {MOCK_PURCHASES.map((order) => {
            const isExpanded = !!expandedOrders[order.orderId];

            return (
              <div
                key={order.orderId}
                className="bg-white border border-brand-sand rounded-2xl shadow-xs overflow-hidden transition-all duration-200"
              >
                {/* 1. ORDER SUMMARY MASTER ROW (Clickable to Toggle) */}
                <div
                  onClick={() => toggleOrder(order.orderId)}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-brand-light/40 select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-brand-dark">
                        {order.orderId}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 font-bold rounded-full border ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-brand-slate font-medium">
                      {order.purchaseDate}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-left sm:text-right">
                      <span className="block text-xs uppercase font-bold tracking-wider text-brand-slate">
                        Total Spent
                      </span>
                      <span className="text-base font-black text-brand-dark">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Expand/Collapse Chevron icon */}
                    <div className="text-brand-slate/80 p-1">
                      <i
                        className={`fa-solid ${isExpanded ? "fa-chevron-up" : "fa-chevron-down"} transition-transform duration-200`}
                      ></i>
                    </div>
                  </div>
                </div>

                {/* 2. EXPANDABLE ITEMIZED ITEM DRAWER */}
                {isExpanded && (
                  <div className="border-t border-brand-sand/60 bg-brand-light/20 p-5 sm:p-6 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-slate mb-2">
                      Itemized Breakdown
                    </h3>

                    <div className="divide-y divide-brand-sand/40">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          {/* Product Details & Shop Link */}
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-brand-dark leading-tight">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-brand-slate font-medium">
                              <span>Sold by:</span>
                              <a
                                href={item.shopUrl}
                                className="text-brand-rust font-semibold hover:underline flex items-center gap-1"
                              >
                                {item.shopName}
                                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                              </a>
                            </div>
                          </div>

                          {/* Individual Item Pricing */}
                          <div className="text-right">
                            <span className="text-sm font-bold text-brand-dark">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Row inside Drawer */}
                    <div className="pt-4 border-t border-brand-sand/60 flex justify-end gap-3">
                      <button className="px-4 py-2 bg-white border border-brand-sand text-xs font-bold text-brand-dark rounded-xl shadow-xs hover:bg-brand-light transition-colors cursor-pointer">
                        Get Invoice PDF
                      </button>
                      <button className="px-4 py-2 bg-brand-dark text-white text-xs font-bold rounded-xl shadow-xs hover:bg-brand-rust transition-colors cursor-pointer">
                        Contact Support
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyPurchases;
