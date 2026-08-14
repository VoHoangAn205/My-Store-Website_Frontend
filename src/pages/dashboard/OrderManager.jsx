import React, { useState, useEffect, useMemo } from "react";
import getStatusBadgeStyle from "../../helpers/getStatusBadgeStyle";
import { useDispatch } from "react-redux";

// Mock MongoDB Data with multiple items to demonstrate pagination
const INITIAL_ORDERS = [
  {
    _id: "6a7b349780d832dce275f986",
    shopId: "6a22fc5feb5f681bc0ecd327",
    historicalShopSnapshot: { username: "Join", email: "dcgame205@gmail.com" },
    parentOrder: { _id: "6a7b349780d832dce275f985", totalPrice: 3600000 },
    user: {
      _id: "6a761b7decbc1e3bafc940ef",
      username: "Alter",
      email: "hoanganvo1812@gmail.com",
    },
    orderItems: [
      {
        _id: "item1",
        name: "jacket",
        quantity: 3,
        price: 1200000,
        product: "6a4e04b2",
      },
    ],
    subStatus: "pending",
    subTotalPrice: 3600000,
    createdAt: "2026-08-11T14:41:27.608Z",
  },
  {
    _id: "6a7b349780d832dce275f987",
    shopId: "6a22fc5feb5f681bc0ecd327",
    historicalShopSnapshot: { username: "Join", email: "dcgame205@gmail.com" },
    parentOrder: { _id: "6a7b349780d832dce275f985", totalPrice: 5200000 },
    user: {
      _id: "6a761b7decbc1e3bafc940e0",
      username: "Sarah",
      email: "sarah.m@gmail.com",
    },
    orderItems: [
      {
        _id: "item2",
        name: "denim jeans",
        quantity: 2,
        price: 800000,
        product: "6a4e04b3",
      },
    ],
    subStatus: "processing",
    subTotalPrice: 1600000,
    createdAt: "2026-08-11T13:20:10.100Z",
  },
  {
    _id: "6a7b349780d832dce275f988",
    shopId: "6a22fc5feb5f681bc0ecd327",
    historicalShopSnapshot: { username: "Join", email: "dcgame205@gmail.com" },
    parentOrder: { _id: "6a7b349780d832dce275f989", totalPrice: 2400000 },
    user: {
      _id: "6a761b7decbc1e3bafc940e1",
      username: "Michael",
      email: "mike99@gmail.com",
    },
    orderItems: [
      {
        _id: "item3",
        name: "leather boots",
        quantity: 1,
        price: 2400000,
        product: "6a4e04b4",
      },
    ],
    subStatus: "shipped",
    subTotalPrice: 2400000,
    createdAt: "2026-08-10T18:15:00.000Z",
  },
  {
    _id: "6a7b349780d832dce275f989",
    shopId: "6a22fc5feb5f681bc0ecd327",
    historicalShopSnapshot: { username: "Join", email: "dcgame205@gmail.com" },
    parentOrder: { _id: "6a7b349780d832dce275f990", totalPrice: 900000 },
    user: {
      _id: "6a761b7decbc1e3bafc940e2",
      username: "Elena",
      email: "elena.v@gmail.com",
    },
    orderItems: [
      {
        _id: "item4",
        name: "cotton t-shirt",
        quantity: 3,
        price: 300000,
        product: "6a4e04b5",
      },
    ],
    subStatus: "delivered",
    subTotalPrice: 900000,
    createdAt: "2026-08-09T10:05:44.000Z",
  },
  {
    _id: "6a7b349780d832dce275f990",
    shopId: "6a22fc5feb5f681bc0ecd327",
    historicalShopSnapshot: { username: "Join", email: "dcgame205@gmail.com" },
    parentOrder: { _id: "6a7b349780d832dce275f991", totalPrice: 1500000 },
    user: {
      _id: "6a761b7decbc1e3bafc940e3",
      username: "David",
      email: "david_k@gmail.com",
    },
    orderItems: [
      {
        _id: "item5",
        name: "hoodie",
        quantity: 1,
        price: 1500000,
        product: "6a4e04b6",
      },
    ],
    subStatus: "cancelled",
    subTotalPrice: 1500000,
    createdAt: "2026-08-08T16:50:20.000Z",
  },
  {
    _id: "6a7b349780d832dce275f991",
    shopId: "6a22fc5feb5f681bc0ecd327",
    historicalShopSnapshot: { username: "Join", email: "dcgame205@gmail.com" },
    parentOrder: { _id: "6a7b349780d832dce275f992", totalPrice: 4500000 },
    user: {
      _id: "6a761b7decbc1e3bafc940e4",
      username: "Chloe",
      email: "chloe_dev@gmail.com",
    },
    orderItems: [
      {
        _id: "item6",
        name: "winter coat",
        quantity: 1,
        price: 4500000,
        product: "6a4e04b7",
      },
    ],
    subStatus: "pending",
    subTotalPrice: 4500000,
    createdAt: "2026-08-08T09:12:10.000Z",
  },
  {
    _id: "6a7b349780d832dce275f992",
    shopId: "6a22fc5feb5f681bc0ecd327",
    historicalShopSnapshot: { username: "Join", email: "dcgame205@gmail.com" },
    parentOrder: { _id: "6a7b349780d832dce275f993", totalPrice: 700000 },
    user: {
      _id: "6a761b7decbc1e3bafc940e5",
      username: "Lucas",
      email: "lucas_b@gmail.com",
    },
    orderItems: [
      {
        _id: "item7",
        name: "beanie",
        quantity: 2,
        price: 350000,
        product: "6a4e04b8",
      },
    ],
    subStatus: "processing",
    subTotalPrice: 700000,
    createdAt: "2026-08-07T11:00:00.000Z",
  },
];

const STATUS_OPTIONS = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const ShopOrderManager = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeOrderModal, setActiveOrderModal] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Status Change Handler
  const handleStatusChange = (orderId, newSubStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, subStatus: newSubStatus } : order,
      ),
    );

    if (activeOrderModal && activeOrderModal._id === orderId) {
      setActiveOrderModal((prev) => ({ ...prev, subStatus: newSubStatus }));
    }
  };

  // Filter Logic
  const filteredOrders = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesTab =
        selectedTab === "all" || selectedTab === order.subStatus;
      const matchesSearch =
        order._id.toLowerCase().includes(term) ||
        order.user?.username.toLocaleLowerCase().includes(term) ||
        order.user?.email.toLocaleLowerCase().includes(term);

      return matchesSearch && matchesTab;
    });
  }, [orders, searchTerm, searchTerm]);

  const getNextStatusConfig = (currentStatus) => {
    switch (currentStatus?.toLowerCase()) {
      case "pending":
        return {
          nextStatus: "processing",
          label: "Start Processing Order",
          buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
        };
      case "processing":
        return {
          nextStatus: "shipped",
          label: "Ship Order",
          buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
        };
      default:
        return null;
    }
  };

  // Reset to page 1 whenever filters or itemsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchTerm, itemsPerPage]);

  // Pagination Calculations
  const totalItems = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-3 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop Order Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage incoming sub-orders and update delivery progress.
            </p>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-sm space-y-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
            {["all", ...STATUS_OPTIONS].map((tab) => {
              const isActive = selectedTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl capitalize whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Order ID, Username, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 sm:py-2.5 pl-10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            />
            <span className="absolute left-3 top-2 sm:top-2.5 text-slate-400 text-sm sm:text-base">
              🔍
            </span>
          </div>
        </div>

        {/* ORDERS LIST CONTAINER */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          {/* 1. DESKTOP / TABLET TABLE VIEW (Hidden on small screens) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4">Sub-Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Sub-Total</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order._id}
                      onClick={() => setActiveOrderModal(order)}
                      className="hover:bg-slate-50/80 cursor-pointer transition duration-150"
                    >
                      <td className="py-4 px-4 font-mono font-bold text-slate-900 text-xs">
                        #{order._id.slice(-8)}
                        <span className="block text-[10px] text-slate-400 font-sans font-normal">
                          Parent: #{order.parentOrder?._id?.slice(-8)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-900">
                          {order.user?.username || "Unknown"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {order.user?.email}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-600 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-xs font-medium text-slate-800 space-y-0.5">
                          {order.orderItems?.map((item, idx) => (
                            <div
                              key={item._id || idx}
                              className="truncate max-w-45"
                            >
                              • <span className="capitalize">{item.name}</span>{" "}
                              (x{item.quantity})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                        ${order.subTotalPrice?.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-block text-xs font-bold py-1 px-3 rounded-full border capitalize ${getStatusBadgeStyle(
                            order.subStatus,
                          )}`}
                        >
                          {order.subStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-slate-400 text-sm"
                    >
                      No matching orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 2. MOBILE CARD VIEW (Shown only on small screens) */}
          <div className="block sm:hidden divide-y divide-slate-100">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => setActiveOrderModal(order)}
                  className="p-4 space-y-3 active:bg-slate-50 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      #{order._id.slice(-8)}
                    </span>
                    <span
                      className={`text-[10px] font-bold py-0.5 px-2.5 rounded-full border capitalize ${getStatusBadgeStyle(
                        order.subStatus,
                      )}`}
                    >
                      {order.subStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {order.user?.username}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {order.user?.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-slate-900 text-sm">
                        ${order.subTotalPrice?.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg text-xs text-slate-700 space-y-1 border border-slate-100">
                    {order.orderItems?.map((item, idx) => (
                      <div
                        key={item._id || idx}
                        className="flex justify-between items-center text-[11px]"
                      >
                        <span className="capitalize font-medium">
                          • {item.name}
                        </span>
                        <span className="text-slate-500">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No matching orders found.
              </div>
            )}
          </div>

          {/* PAGINATION FOOTER */}
          <div className="px-3 sm:px-4 py-3 bg-slate-50/60 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Range Text & Per-Page Selector */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 text-xs text-slate-600">
              <span>
                Showing <strong>{totalItems > 0 ? startIndex + 1 : 0}</strong>-
                <strong>{endIndex}</strong> of <strong>{totalItems}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                <label htmlFor="perPage" className="text-slate-500">
                  Per page:
                </label>
                <select
                  id="perPage"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center justify-center gap-1 w-full md:w-auto">
              {/* Desktop First Page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="hidden sm:block p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition text-xs font-bold"
                title="First Page"
              >
                «
              </button>

              {/* Prev */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition text-xs font-medium flex-1 sm:flex-none text-center"
              >
                Prev
              </button>

              {/* Number Buttons (Hidden on mobile to save space) */}
              <div className="hidden sm:flex items-center gap-1 px-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                      currentPage === page
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-200/60"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Mobile Page Indicator */}
              <span className="sm:hidden text-xs text-slate-500 px-2 font-medium">
                {currentPage} / {totalPages}
              </span>

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalItems === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition text-xs font-medium flex-1 sm:flex-none text-center"
              >
                Next
              </button>

              {/* Desktop Last Page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalItems === 0}
                className="hidden sm:block p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition text-xs font-bold"
                title="Last Page"
              >
                »
              </button>
            </div>
          </div>
        </div>

        {/* ORDER DETAILS MODAL */}
        {activeOrderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveOrderModal(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-700 text-lg font-bold p-1 rounded-lg transition"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="border-b border-slate-100 pb-3 mb-4 pr-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 font-mono">
                    #{activeOrderModal._id}
                  </h2>
                  <span
                    className={`text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border capitalize ${getStatusBadgeStyle(
                      activeOrderModal.subStatus,
                    )}`}
                  >
                    {activeOrderModal.subStatus}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                  Placed on{" "}
                  {new Date(activeOrderModal.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200/80 mb-5 text-xs">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Customer Information
                  </h3>
                  <p className="font-semibold text-slate-900">
                    {activeOrderModal.user?.username}
                  </p>
                  <p className="text-slate-600">
                    {activeOrderModal.user?.email}
                  </p>
                  <p className="text-slate-400 mt-1 font-mono text-[10px]">
                    User ID: {activeOrderModal.user?._id}
                  </p>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Parent Reference
                  </h3>
                  <p className="text-slate-700 font-mono text-[11px]">
                    ID: #{activeOrderModal.parentOrder?._id}
                  </p>
                  <p className="text-slate-700 mt-0.5">
                    Parent Total:{" "}
                    <strong>
                      $
                      {activeOrderModal.parentOrder?.totalPrice?.toLocaleString()}
                    </strong>
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="mb-5">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 sm:mb-3">
                  Order Items ({activeOrderModal.orderItems?.length})
                </h3>
                <div className="space-y-2">
                  {activeOrderModal.orderItems?.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between p-2.5 sm:p-3 border border-slate-100 rounded-xl bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-sm sm:text-base">
                          🛍️
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-900 capitalize">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            ${item.price?.toLocaleString()} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] sm:text-xs text-slate-500 block">
                    Sub-Order Total
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                    ${activeOrderModal.subTotalPrice?.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {["pending", "processing"].includes(
                    activeOrderModal.subStatus?.toLowerCase(),
                  ) && (
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(activeOrderModal._id, "cancelled")
                      }
                      className="px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition text-center"
                    >
                      Cancel Order
                    </button>
                  )}

                  {(() => {
                    const nextConfig = getNextStatusConfig(
                      activeOrderModal.subStatus,
                    );

                    if (nextConfig) {
                      return (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              activeOrderModal._id,
                              nextConfig.nextStatus,
                            )
                          }
                          className={`px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5 ${nextConfig.buttonStyle}`}
                        >
                          <span>{nextConfig.label}</span>
                          <span>→</span>
                        </button>
                      );
                    }

                    const status = activeOrderModal.subStatus?.toLowerCase();

                    if (status === "shipped") {
                      return (
                        <div className="px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 text-center flex items-center justify-center gap-1.5">
                          <span>🚚 Awaiting Buyer Confirmation</span>
                        </div>
                      );
                    }

                    if (status === "delivered") {
                      return (
                        <div className="px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 text-center">
                          Order Delivered ✅
                        </div>
                      );
                    }

                    return (
                      <div className="px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-500 text-center">
                        Order Cancelled ❌
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopOrderManager;
