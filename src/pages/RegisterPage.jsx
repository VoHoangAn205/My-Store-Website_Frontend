import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { register, requestOtpRegister } from "../redux/userSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestOtpRegister({ email: formData.email }));
    setIsOtpOpen(true);
  };

  const handleResendOTP = () => {
    dispatch(requestOtpRegister({ email: formData.email }));
  };

  // Auto-focus the first input field when the modal opens
  useEffect(() => {
    if (isOtpOpen) {
      // Small timeout ensures the DOM element is mounted before focusing
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 50);
    }
  }, [isOtpOpen]);

  // Handle typing a digit & auto-advancing focus
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take the last character typed
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto focus next input box if a digit was entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace to jump to the previous input box
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle pasting a 6-digit code
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    // Check if pasted value is numeric
    if (!/^\d+$/.test(pasteData)) return;

    const digits = pasteData.slice(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    // Focus the last filled box or next box
    const focusIndex = Math.min(digits.length, 5);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleCallRegister = async (otpValue) => {
    try {
      formData.otp = otpValue;

      const res = await dispatch(register(formData)).unwrap();

      setErrMessage("");
      toast.success("Register successful");
      navigate("/login");
    } catch (err) {
      setErrMessage(err.message);
      toast.error(err.message || "Register failed");
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.warning("Please enter all 6 digits.");
      return;
    }
    handleCallRegister(otpValue);
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
                  name="username"
                  required
                  placeholder="David Hoang"
                  value={formData.username}
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
            {errMessage.length > 0 && (
              <span className="text-red-500 bg-red-200 font-bold block w-full rounded-xl text-sm p-2">
                {errMessage}
              </span>
            )}
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

      {/* 2. OTP MODAL POPUP */}
      {isOtpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          {/* Modal Container */}
          <div className="bg-white border border-brand-sand rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            {/* Close Button (X) */}
            <button
              type="button"
              onClick={() => setIsOtpOpen(false)}
              className="absolute top-4 right-4 text-brand-slate hover:text-brand-dark text-xl font-bold p-1 rounded-lg transition"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-brand-rust/10 text-brand-rust rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                🔒
              </div>
              <h2 className="text-2xl font-bold text-brand-dark">Verify OTP</h2>
              <p className="text-sm text-brand-slate mt-1">
                We sent a 6-digit code to your email. Enter it below to complete
                registration.
              </p>
            </div>

            {/* OTP Input Form */}
            <form onSubmit={handleVerifyOTP}>
              {/* 6 Digit Input Boxes */}
              <div
                className="flex items-center justify-center gap-2 sm:gap-3 mb-6"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-extrabold text-brand-dark bg-brand-light border border-brand-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-rust focus:border-brand-rust transition duration-200"
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand-dark hover:bg-brand-rust text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
              >
                Verify & Finish Registration
              </button>
            </form>

            {/* Resend Link */}
            <div className="text-center mt-4">
              <p className="text-xs text-brand-slate">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-brand-rust font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
