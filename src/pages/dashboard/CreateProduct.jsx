import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/categorySlice";
const CATEGORIES = [
  { id: "audio", name: "Audio Systems" },
  { id: "monitors", name: "Studio Monitors" },
  { id: "headphones", name: "Headphones" },
  { id: "accessories", name: "Accessories" },
];

function CreateProduct() {
  const fetchingCategories = useSelector((state) => state.CATEGORY.categories);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    category: [],
    price: "",
    stock: "",
    description: "",
    status: "",
  });

  // Handler for text, numeric, and select changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting new product payload to Redux/API:", formData);
  };

  const handleToggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const filteredCategories = fetchingCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

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
            onSubmit={handleSubmit}
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
            <div ref={dropdownRef} className="relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Categories *
              </label>

              {/* Input Trigger Button Box */}
              <div
                onClick={() => setIsOpen(true)}
                className="w-full min-h-11 px-3 py-2 bg-brand-light border border-brand-sand/60 rounded-xl text-sm flex flex-wrap gap-1.5 items-center cursor-pointer focus-within:border-brand-rust transition-colors"
              >
                {selectedCategories.length === 0 ? (
                  <span className="text-slate-400 pl-1">
                    Select categories...
                  </span>
                ) : (
                  selectedCategories.map((catId) => {
                    const matchedCat = fetchingCategories.find(
                      (c) => c._id === catId,
                    );
                    return (
                      <span
                        key={catId}
                        className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-indigo-100 flex items-center gap-1.5 animate-fade-in select-none"
                      >
                        {matchedCat?.name}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // Stops dropdown from opening/closing
                            handleToggleCategory(catId);
                          }}
                          className="hover:text-indigo-900 font-bold font-mono transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })
                )}

                <div className="absolute right-4 top-8.75 text-slate-400 pointer-events-none">
                  <i
                    className={`fa-solid fa-chevron-down w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  ></i>
                </div>
              </div>
              {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-60 flex flex-col">
                  {/* Realtime Search Bar Input Header */}
                  <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
                    <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs pl-2"></i>
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                      autoFocus
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="text-xs text-slate-400 hover:text-slate-600 px-1 font-mono"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* List Selection Node View */}
                  <div className="overflow-y-auto div_ide-y div_ide-slate-50 flex-1">
                    {filteredCategories.length === 0 ? (
                      <div className="p-4 text-xs text-slate-400 text-center">
                        No matching categories found
                      </div>
                    ) : (
                      filteredCategories.map((cat) => {
                        const isChecked = selectedCategories.includes(cat._id);
                        return (
                          <div
                            key={cat._id}
                            onClick={() => handleToggleCategory(cat._id)}
                            className={`px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors select-none ${
                              isChecked
                                ? "bg-indigo-50/50 font-medium text-indigo-700"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <span>{cat.name}</span>

                            {/* Interactive Visual Checkbox */}
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                isChecked
                                  ? "bg-indigo-600 border-indigo-600 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isChecked && (
                                <i className="fa-solid fa-check text-[9px] font-black"></i>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
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
                <option value="Available">Available</option>
                <option value="Sold out">Sold out</option>
                <option value="Discontinued">Discontinued</option>
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
      </form>

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
    </div>
  );
}

export default CreateProduct;
