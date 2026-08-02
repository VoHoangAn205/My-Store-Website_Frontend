import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProductDetail } from "../redux/productSlice";
import LoadingTableSkeleton from "../components/LoadingTableSkeleton";
import renderStatusColor from "../helpers/renderStatusColor";
import { updateCart } from "../redux/cartSlice";
import { createOrder } from "../redux/orderSlice";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.PRODUCT.productDetail);
  const isLoading = useSelector((state) => state.PRODUCT.isLoading.detailPage);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    productData?.gallery?.images[0].url || "",
  );

  const handleSetSelectedImage = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch]);

  const handleAddToCart = async () => {
    try {
      const res = await dispatch(updateCart({ product: id, quantity }));

      toast.success("Added to your cart");
    } catch (err) {
      const messages = Array.isArray(err.message)
        ? err.message
        : [err.message || "Failed to create order"];

      messages.forEach((msg) => toast.error(msg));
    }
  };

  const handleCreateOrder = async () => {
    try {
      const res = await dispatch(
        createOrder({ cartItems: [{ productId: id, quantity }] }),
      ).unwrap();

      toast.success("Order Successfully");
      navigate("/myPurchases");
    } catch (err) {
      const messages = Array.isArray(err.message)
        ? err.message
        : [err.message || "Failed to create order"];

      messages.forEach((msg) => toast.error(msg));
    }
  };

  useEffect(() => {
    const list = productData?.gallery?.images;
    if (list && list.length > 0) {
      setSelectedImage(list[0].url);
    } else {
      setSelectedImage("");
    }
  }, [productData]);

  if (isLoading || !productData) {
    return <LoadingTableSkeleton rows={8} />;
  }
  // this is mock avatar
  const avatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop";
  const { name, gallery, price, status, user, _id, description, stock } =
    productData;
  const listImages = gallery.images;

  const isOutOfStock = stock <= 0 || status !== "Available";

  return (
    <div className="min-h-screen bg-brand-light py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-brand-sand/40 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-10">
          {/* LEFT COLUMN: Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Featured Image Container */}
            <div className="w-full h-80 sm:h-96 bg-brand-light rounded-xl overflow-hidden border border-brand-sand">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-slate">
                  No Image Available
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {listImages && listImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {listImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSetSelectedImage(img.url)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img.url
                        ? "border-brand-rust ring-2 ring-brand-rust/20"
                        : "border-brand-sand opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Seller / User Information Badge */}
              {user && (
                <div className="flex items-center gap-2 mb-3">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={user.username}
                      className="w-6 h-6 rounded-full object-cover border border-brand-sand"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-brand-sand flex items-center justify-center text-xs text-brand-dark font-bold">
                      {user.username?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="text-xs font-medium text-brand-slate">
                    Sold by{" "}
                    <span className="text-brand-dark font-semibold">
                      {user.username || "Seller"}
                    </span>
                  </span>
                </div>
              )}

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2">
                {name}
              </h1>

              {/* Status Badges */}
              <div className="flex items-center gap-3 mb-4 text-sm">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${renderStatusColor(
                    status,
                  )}`}
                >
                  {status}
                </span>

                <span className="text-xs text-brand-slate font-mono">
                  ID: {_id}
                </span>
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-4 py-3 border-y border-brand-sand/60 mb-6">
                <span className="text-3xl font-extrabold text-brand-rust">
                  ${Number(price).toFixed(2)}
                </span>
                <span className="text-xs text-brand-slate">
                  Stock:{" "}
                  <strong className="text-brand-dark">
                    {stock} items left
                  </strong>
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-brand-dark mb-2">
                  Description
                </h3>
                <p className="text-brand-slate text-sm leading-relaxed whitespace-pre-line">
                  {description || "No description provided for this product."}
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="space-y-4 pt-4 border-t border-brand-sand/60">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-brand-dark">
                  Quantity:
                </label>
                <div className="flex items-center border border-brand-sand rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={isOutOfStock || quantity <= 1}
                    className="px-3 py-1.5 bg-brand-light hover:bg-brand-sand/40 text-brand-dark font-bold disabled:opacity-40 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold text-brand-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.min(stock, prev + 1))
                    }
                    disabled={isOutOfStock || quantity >= stock}
                    className="px-3 py-1.5 bg-brand-light hover:bg-brand-sand/40 text-brand-dark font-bold disabled:opacity-40 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full bg-brand-rust hover:bg-brand-rust/90 disabled:bg-brand-slate/30 text-white font-medium py-3 px-6 rounded-xl transition duration-200 shadow-sm disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>

                <button
                  onClick={handleCreateOrder}
                  disabled={isOutOfStock}
                  className="w-full bg-brand-dark hover:bg-brand-dark/90 disabled:bg-brand-slate/30 text-white font-medium py-3 px-6 rounded-xl transition duration-200 shadow-sm disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
