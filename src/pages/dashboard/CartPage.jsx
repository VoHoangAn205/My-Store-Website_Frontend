import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCartList } from "../../redux/cartSlice";
import TableSkeleton from "../../components/LoadingTableSkeleton";
import renderStatusColor from "../../helpers/renderStatusColor";

const CartPage = () => {
  const dispatch = useDispatch();
  const CART_LIST = useSelector((state) => state.CART.cartList);
  const [cartList, setCartList] = useState([...CART_LIST]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRemoveItem = (id) => {
    dispatch(deleteCart(id));
  };

  const handleToggleSelectItem = (item, isSelected) => {
    if (!isSelected) {
      setSelectedItem(selectedItem.filter((elm) => elm.id !== item.id));
    } else {
      setSelectedItem([...selectedItem, item]);
    }
  };

  const subtotal = selectedItem.reduce((acc, item) => {
    const price = item?.price || 0;
    return acc + price * item.quantity;
  }, 0);
  const shippingFee = subtotal > 0 ? 15 : 0; // Example flat shipping
  const grandTotal = subtotal + shippingFee;

  useEffect(() => {
    dispatch(getCartList())
      .then((act) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    setCartList(CART_LIST);
  }, [CART_LIST]);

  if (isLoading) {
    return <TableSkeleton rows={4} cols={5} />;
  }
  return (
    <>
      <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen">
        {/* Header Banner */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-bag-shopping text-indigo-600 text-xl"></i>{" "}
              My Shopping Cart
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review your selected products before proceeding to checkout
            </p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-xl border border-indigo-100">
            {cartList.length} {cartList.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {cartList.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <i className="fa-solid fa-cart-flatbed text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">
              Your cart is empty
            </h3>
            <p className="text-slate-500 max-w-md mx-auto text-sm">
              Looks like you haven't added anything to your cart yet. Explore
              our inventory to find great products!
            </p>
          </div>
        ) : (
          /* Grid Layout: Cart List + Order Summary */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Cart Items Table (Desktop Layout) */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="p-4 w-10 text-center">
                        {/* Optional Select All Checkbox header */}
                      </th>
                      <th className="p-4">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-center">Quantity</th>
                      <th className="p-4 text-right">Total</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cartList.map((item) => {
                      const product = item.product || {};
                      const itemTotal = (product.price || 0) * item.quantity;
                      const isAvailable = product.status === "Available";
                      const isChecked = selectedItem.find(
                        (item) => item.id === product._id,
                      );

                      // Safely get thumbnail/gallery image
                      const thumbnail = Array.isArray(product.gallery?.images)
                        ? product.gallery.images[0]?.url
                        : product.gallery?.images?.url;

                      return (
                        <tr
                          key={item._id || product._id}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          {/* Checkbox Column */}
                          <td className="p-4 text-center">
                            <input
                              type="checkbox"
                              checked={isChecked || false}
                              onChange={(e) =>
                                handleToggleSelectItem(
                                  {
                                    id: product._id,
                                    price: product.price,
                                    quantity: item.quantity,
                                  },
                                  e.target.checked,
                                )
                              }
                              disabled={!isAvailable}
                              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            />
                          </td>

                          {/* Product Info */}
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={thumbnail || "/placeholder.png"}
                                alt={product.name || "Product"}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                              />
                              <div>
                                <p className="font-semibold text-slate-800 text-sm line-clamp-1">
                                  {product.name || "Unknown Product"}
                                </p>
                                <span
                                  className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md mt-1 ${renderStatusColor(
                                    product.status,
                                  )}`}
                                >
                                  {product.status}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="p-4 text-sm font-medium text-slate-600">
                            ${product.price?.toFixed(2) || "0.00"}
                          </td>

                          {/* Quantity Controls */}
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product._id,
                                    item.quantity,
                                    -1,
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                              >
                                <i className="fa-solid fa-minus text-xs text-slate-600"></i>
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product._id,
                                    item.quantity,
                                    1,
                                  )
                                }
                                disabled={!isAvailable}
                                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                              >
                                <i className="fa-solid fa-plus text-xs text-slate-600"></i>
                              </button>
                            </div>
                          </td>

                          {/* Total */}
                          <td className="p-4 text-right text-sm font-semibold text-slate-800">
                            ${itemTotal.toFixed(2)}
                          </td>

                          {/* Delete Action */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleRemoveItem(product._id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <i className="fa-regular fa-trash-can text-sm"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View: Responsive Stacked Cards */}
            <div className="block md:hidden space-y-4">
              {cartList.map((item) => {
                const product = item.product || {};
                const itemTotal = (product.price || 0) * item.quantity;
                const isAvailable = product.status === "Available";

                // Matching your nested gallery schema access
                const thumbnail = Array.isArray(product.gallery?.images)
                  ? product.gallery.images[0]?.url
                  : product.gallery?.images?.url;

                return (
                  <div
                    key={item._id || product._id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3"
                  >
                    {/* Top Section: Checkbox, Thumbnail, Product Details & Remove Button */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={item.selected || false}
                          onChange={(e) =>
                            handleToggleSelectItem(
                              product._id,
                              e.target.checked,
                            )
                          }
                          disabled={!isAvailable}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                        />
                        <img
                          src={thumbnail || "/placeholder.png"}
                          alt={product.name || "Product"}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-800 text-sm line-clamp-1">
                            {product.name || "Unknown Product"}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            ${product.price?.toFixed(2) || "0.00"} each
                          </p>
                          {/* Uses your status badge color helper */}
                          {product.status && (
                            <span
                              className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md mt-1 ${renderStatusColor(
                                product.status,
                              )}`}
                            >
                              {product.status}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(product._id)}
                        className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <i className="fa-regular fa-trash-can text-sm"></i>
                      </button>
                    </div>

                    {/* Bottom Section: Quantity Counter & Item Total */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                      <div className="flex items-center space-x-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
                        <button
                          onClick={() =>
                            handleQuantityChange(product._id, item.quantity, -1)
                          }
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs"
                        >
                          <i className="fa-solid fa-minus text-xs text-slate-600"></i>
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(product._id, item.quantity, 1)
                          }
                          disabled={!isAvailable}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs"
                        >
                          <i className="fa-solid fa-plus text-xs text-slate-600"></i>
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                          Total
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          ${itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Order Summary Sidebar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 h-fit">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-800">
                    ${shippingFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-800">
                  <span>Grand Total</span>
                  <span className="text-indigo-600">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => console.log("Proceeding to checkout...")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                Proceed to Checkout{" "}
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
