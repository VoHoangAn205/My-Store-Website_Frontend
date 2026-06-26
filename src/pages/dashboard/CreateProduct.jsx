import { useState } from "react";

function CreateProduct() {
  // 1. Unified local state tracking form fields
  const [formData, setFormData] = useState({
    name: "",
    category: [],
    price: "",
    stock: "",
    description: "",
    status: "Available", // Default product status
  });

  // Handler for text, numeric, and select changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting new product payload to Redux/API:", formData);
    // This is where you will dispatch an async Thunk action to save the product to your database!
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-brand-dark tracking-tight">
            Add New Product
          </h1>
          <p className="text-sm text-brand-slate">
            List a new item in your digital store inventory catalog.
          </p>
        </div>

        {/* Quick Top Controls */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            type="button"
            className="grow sm:flex-none px-4 py-2.5 text-sm font-semibold border border-brand-sand rounded-xl text-brand-dark hover:bg-brand-dark hover:text-white transition-colors duration-150"
          >
            Save as Draft
          </button>
          <button
            form="product-form"
            type="submit"
            className="grow sm:flex-none px-5 py-2.5 text-sm font-semibold bg-brand-rust text-white rounded-xl shadow-md hover:bg-brand-rust/90 transition-colors duration-150"
          >
            Publish Product
          </button>
        </div>
      </div>

      {/* Main Form Engine */}
      <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
        {/* BLOCK 1: GENERAL APPRAISAL */}
        <div className="bg-white border border-brand-sand rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-brand-dark border-b border-brand-sand/40 pb-2">
            Basic Description
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g., Studio Monitors Monitor Gen 2"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
              >
                <option value="">Select a folder...</option>
                <option value="audio">Audio Systems</option>
                <option value="monitors">Studio Monitors</option>
                <option value="headphones">Headphones</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Status
              </label>
              <select
                name="status"
                required
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
              >
                <option value="">Available</option>
                <option value="audio">Sold out</option>
                <option value="monitors">Discontinued</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
              Full Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Outline technical features, hardware specs, box contents, or dimensions..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors resize-none"
            />
          </div>
        </div>

        {/* BLOCK 2: FINANCIAL & INVENTORY MANAGEMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pricing Box Wrapper */}
          <div className="bg-white border border-brand-sand rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-brand-dark border-b border-brand-sand/40 pb-2">
              Pricing Structure
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Stock Tracking Box */}
          <div className="bg-white border border-brand-sand rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-brand-dark border-b border-brand-sand/40 pb-2">
              Inventory Ledger
            </h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Initial Units in Stock *
              </label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                placeholder="e.g., 50"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
              />
            </div>
          </div>
        </div>

        {/* BLOCK 3: MEDIA UPLOAD AREA GRAPHICS */}
        <div className="bg-white border border-brand-sand rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-brand-dark border-b border-brand-sand/40 pb-2">
            Product Media Gallery
          </h2>

          {/* Mock Drag Drop Field Interactive Frame Wrapper */}
          <div className="border-2 border-dashed border-brand-sand rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-rust hover:bg-brand-light/40 transition-all duration-150">
            <i className="fa-solid fa-cloud-arrow-up text-brand-slate text-3xl mb-3"></i>
            <span className="text-sm font-semibold text-brand-dark">
              Drag and drop images here
            </span>
            <span className="text-xs text-brand-slate mt-1">
              Supports PNG, JPG, or WebP format assets up to 5MB.
            </span>
            <input type="file" className="hidden" multiple accept="image/*" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
