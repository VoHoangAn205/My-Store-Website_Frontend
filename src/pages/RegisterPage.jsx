import { useState } from "react";

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", formData);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-brand-light">
      {/* LEFT SIDE: BRAND CONTENT & VISUAL SHOWCASE (Hidden on mobile) */}
      <div className="hidden lg:flex lg:col-span-5 bg-brand-dark relative p-12 flex-col justify-between text-white overflow-hidden border-r border-brand-sand/10">
        {/* Subtle geometric background graphic decorative element */}
        <div className="absolute inset-0 bg-radial from-brand-rust/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* Brand Logo Header */}
        <a
          href="#"
          className="text-2xl font-black tracking-widest text-white relative z-10"
        >
          HOANGAN<span className="text-brand-rust">.</span>
        </a>

        {/* Marketing Value Proposition / Micro Testimonial */}
        <div className="space-y-6 relative z-10 max-w-sm">
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            The destination for elite audio hardware creators.
          </h2>
          <p className="text-sm text-brand-slate leading-relaxed">
            Join a collective of independent salesman and audio engineers
            managing premium studio logistics worldwide.
          </p>
        </div>

        {/* Footer Meta */}
        <div className="text-xs text-brand-slate relative z-10">
          &copy; 2026 HOANGAN Collective. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: THE ACTIONABLE REGISTRATION FORM CANVAS */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center ">
        <div className="w-full max-w-md bg-white border border-brand-sand rounded-2xl p-8 sm:p-10 shadow-xl">
          {/* Mobile Only Brand Header */}
          <div className="block lg:hidden mb-6">
            <span className="text-xl font-black tracking-widest text-brand-dark">
              HOANGAN<span className="text-brand-rust">.</span>
            </span>
          </div>

          {/* Form Header Title Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-brand-dark tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-brand-slate mt-1">
              Already registered?{" "}
              <a
                href="/login"
                className="text-brand-rust font-semibold hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>

          {/* Social Single Sign-On Button Options */}
          {/* <button
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-brand-light border border-brand-sand/70 rounded-xl text-sm font-semibold text-brand-dark hover:bg-brand-sand/30 transition-all duration-150 cursor-pointer mb-6"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Register with Google</span>
          </button> */}

          {/* Form Separator Text Strip */}
          <div className="flex items-center my-6">
            <div className="grow border-t border-brand-sand/60"></div>
            <span className="px-3 text-xs font-bold tracking-wider text-brand-slate uppercase bg-white">
              your secure email
            </span>
            <div className="grow border-t border-brand-sand/60"></div>
          </div>

          {/* Main Input Form Engine */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input 1: Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-brand-slate/60">
                  <i className="fa-solid fa-user text-sm"></i>
                </span>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="David Hoang"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
                />
              </div>
            </div>

            {/* Input 2: Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-brand-slate/60">
                  <i className="fa-solid fa-envelope text-sm"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="david@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
                />
              </div>
            </div>

            {/* Input 3: Password (With Toggle View Support) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-slate mb-1.5">
                Create Secure Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-brand-slate/60">
                  <i className="fa-solid fa-lock text-sm"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-11 py-2.5 bg-brand-light border border-brand-sand/60 rounded-xl text-sm text-brand-dark focus:outline-none focus:border-brand-rust transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-brand-slate/70 hover:text-brand-dark focus:outline-none"
                >
                  <i
                    className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox Flag Block */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="agreeToTerms"
                type="checkbox"
                name="agreeToTerms"
                required
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 mt-0.5 rounded border-brand-sand/60 text-brand-rust focus:ring-brand-rust accent-brand-rust cursor-pointer"
              />
              <label
                htmlFor="agreeToTerms"
                className="text-xs font-medium text-brand-slate leading-relaxed cursor-pointer select-none"
              >
                I authorize registration terms and certify agreements with the{" "}
                <a
                  href="/terms"
                  className="text-brand-dark font-semibold hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-brand-dark font-semibold hover:underline"
                >
                  Privacy Act Policies
                </a>
                .
              </label>
            </div>

            {/* Submission Action Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-brand-dark text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-brand-rust hover:shadow-lg transition-all duration-200 focus:outline-none cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
