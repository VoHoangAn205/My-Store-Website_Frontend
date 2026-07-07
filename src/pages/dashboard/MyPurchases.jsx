import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserOrder } from "../../redux/orderSlice";
import SubOrderRow from "../../components/subOrderRow";

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
  const orders = useSelector((state) => state.ORDER.parentOrder);
  console.log(orders);

  useEffect(() => {
    dispatch(getAllUserOrder());
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          My Purchases
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 font-medium">
          No transactions recorded on this profile yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((parentOrder) => (
            <div
              key={parentOrder._id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Parent Order Container Master Banner Header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 mb-4 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Order Reference
                  </p>
                  <p className="text-xs font-mono font-bold text-slate-700">
                    {parentOrder._id}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Transaction Date
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    {new Date(parentOrder.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Total Invoice
                  </p>
                  <p className="text-sm font-bold text-indigo-600 font-mono">
                    ${parentOrder.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Nested Sub-Order mapping list using our local state component row above */}
              <div className="bg-white">
                {parentOrder.subOrders?.map((subOrder) => (
                  <SubOrderRow key={subOrder._id} subOrder={subOrder} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPurchases;
