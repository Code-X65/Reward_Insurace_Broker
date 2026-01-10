import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { CheckCircle, ArrowRight, X } from 'lucide-react';
import { useForm } from '../context/FormContext';
import gsap from 'gsap';

// Insurance data
const lifeInsuranceOptions = [
  'Group Life Insurance',
  'Individual Life Insurance',
  'Group Personal',
  'Annuity Life Policy'
];

const nonLifeInsuranceOptions = [
  'Motor Insurance',
  'Fire and Special Perils',
  'Consequential Loss Insurance',
  'Combined All Risk Insurance',
  'Burglary and House Breaking Insurance',
  'Goods In-Transit Insurance',
  'Cash In Transit Insurance',
  'Fidelity Guarantee Insurance',
  'Public Liability Insurance',
  'Product Liability Insurance',
  'Contractor All Risk Insurance',
  'Engineering Insurance',
  'Industrial All Risk',
  'Professional Indemnity Insurance',
  'Marine Insurance',
  'Aviation Insurance',
  'Energy Insurance'
];

const QuoteForm = () => {
  // Theme logic
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });

  // Use the form context
  const { showForm, closeForm } = useForm();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+234',
    insuranceType: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Refs for animation
  const mobileContainerRef = useRef(null);
  const mobileContentRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const desktopContentRef = useRef(null);

  // GSAP Entry Animation
  useLayoutEffect(() => {
    if (showForm) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });

      // Identify active elements based on visibility
      const isMobile = window.innerWidth < 1024;
      const activeContainer = isMobile ? mobileContainerRef.current : desktopContainerRef.current;
      const activeContent = isMobile ? mobileContentRef.current : desktopContentRef.current;

      if (activeContainer && activeContent) {
        tl.fromTo(activeContainer.querySelector('.active-backdrop'),
          { opacity: 0 },
          { opacity: 1, duration: 0.4 }
        )
          .fromTo(activeContent,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5 },
            '-=0.2'
          );
      }
    }
  }, [showForm]);

  // handleClose handler with animation
  const handleClose = () => {
    const isMobile = window.innerWidth < 1024;
    const activeContainer = isMobile ? mobileContainerRef.current : desktopContainerRef.current;
    const activeContent = isMobile ? mobileContentRef.current : desktopContentRef.current;

    if (activeContainer && activeContent) {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.in', duration: 0.3 },
        onComplete: () => {
          closeForm();
          // Small delay before resetting success state to avoid flash
          setTimeout(() => setShowSuccess(false), 100);
        }
      });

      tl.to(activeContent, { opacity: 0, y: 20, scale: 0.95 })
        .to(activeContainer.querySelector('.active-backdrop'), { opacity: 0 }, '-=0.2');
    } else {
      closeForm();
      setShowSuccess(false);
    }
  };

  // Handle theme changes
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }

    const handleThemeChange = () => {
      const theme = localStorage.getItem("theme");
      setIsDark(theme === "dark");
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          insurance_type: formData.insuranceType,
          interest: formData.service,
          message: formData.message || 'Quote request'
        })
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+234',
          insuranceType: '',
          service: '',
          message: ''
        });

        // Auto-close after 5 seconds
        setTimeout(() => {
          handleClose();
        }, 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if form is not open
  if (!showForm) return null;

  return (
    <>
      {/* Mobile Form */}
      <div
        ref={mobileContainerRef}
        className="lg:hidden fixed inset-0 z-[9999] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div
          className="active-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        ></div>

        {/* Modal Content */}
        <div
          ref={mobileContentRef}
          className={`relative w-full max-w-md max-h-[85vh] overflow-y-auto scrollbar-hide rounded-xl shadow-2xl transform transition-all ${isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            {/* Floating Badge */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Licensed Agents Available
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Get Your Free Quote
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Takes less than 2 minutes. No spam, ever.
              </p>
            </div>

            {showSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h4 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Quote Request Received!
                </h4>
                <p className={`text-base mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Thank you for choosing us for your insurance needs.
                </p>
                <p className={`text-sm max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Our licensed insurance specialists will review your request and contact you within 24 hours to discuss the best coverage options tailored to your needs.
                </p>
                <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Need immediate assistance? Call us at <span className="font-bold text-green-500">+234 703 908 1842</span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-1 text-left">
                    <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Company/Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${isDark
                        ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 placeholder-gray-400 focus:bg-white'
                        }`}
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="john@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${isDark
                        ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 placeholder-gray-400 focus:bg-white'
                        }`}
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Insurance Type</label>
                  <div className="relative">
                    <select
                      required
                      name="insuranceType"
                      value={formData.insuranceType}
                      onChange={(e) => {
                        setFormData({ ...formData, insuranceType: e.target.value, service: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl outline-none border-2 appearance-none transition-all ${isDark
                        ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white'
                        : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 focus:bg-white'
                        }`}
                    >
                      <option value="">Select Insurance Type</option>
                      <option value="life">Life Insurance</option>
                      <option value="non-life">Non-Life Insurance</option>
                    </select>
                    <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Phone</label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className={`px-3 py-3 rounded-xl outline-none border-2 transition-all ${isDark
                        ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white'
                        : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 focus:bg-white'
                        }`}
                    >
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+254">🇰🇪 +254</option>
                      <option value="+233">🇬🇭 +233</option>
                    </select>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="8012345678"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`flex-1 px-4 py-3 rounded-xl outline-none border-2 transition-all ${isDark
                        ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 placeholder-gray-400 focus:bg-white'
                        }`}
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Interest</label>
                  <div className="relative">
                    <select
                      required
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      disabled={!formData.insuranceType}
                      className={`w-full px-4 py-3 rounded-xl outline-none border-2 appearance-none transition-all ${isDark
                        ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white disabled:opacity-50'
                        : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 focus:bg-white disabled:opacity-50'
                        }`}
                    >
                      <option value="">
                        {formData.insuranceType ? "Select your interest..." : "Select insurance type first"}
                      </option>
                      {formData.insuranceType === 'life' && lifeInsuranceOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                      {formData.insuranceType === 'non-life' && nonLifeInsuranceOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 mt-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Start My Quote</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Form */}
      <div
        ref={desktopContainerRef}
        className="hidden lg:flex fixed inset-0 z-[9999] items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div
          className="active-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        ></div>

        {/* Modal Content - Centered and proper size */}
        <div
          ref={desktopContentRef}
          className={`relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-5 right-5 z-10 p-2 rounded-full transition-colors ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left side - Form */}
            <div className="p-8 overflow-y-auto">
              <div className="flex justify-start mb-6">
                <div className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Licensed Agents Available
                </div>
              </div>

              <div className="text-left mb-8">
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Get Your Free Quote
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Takes less than 2 minutes. No spam, ever.
                </p>
              </div>

              {showSuccess ? (
                <div className="py-4 flex flex-col items-start justify-center text-left">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Quote Request Received!
                  </h4>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Thank you for choosing us for your insurance needs.
                  </p>
                  <p className={`text-xs max-w-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Our licensed insurance specialists will review your request and contact you within 24 hours to discuss the best coverage options tailored to your needs.
                  </p>
                  <div className={`p-3 rounded-xl w-full ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Need immediate assistance? Call us at <span className="font-bold text-green-500">+234 703 908 1842</span>
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${isDark
                          ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white placeholder-gray-500'
                          : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 placeholder-gray-400 focus:bg-white'
                          }`}
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email</label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="john@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${isDark
                          ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white placeholder-gray-500'
                          : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 placeholder-gray-400 focus:bg-white'
                          }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Insurance Type</label>
                    <div className="relative">
                      <select
                        required
                        name="insuranceType"
                        value={formData.insuranceType}
                        onChange={(e) => {
                          setFormData({ ...formData, insuranceType: e.target.value, service: '' });
                        }}
                        className={`w-full px-4 py-3 rounded-xl outline-none border-2 appearance-none transition-all ${isDark
                          ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white'
                          : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 focus:bg-white'
                          }`}
                      >
                        <option value="">Select Insurance Type</option>
                        <option value="life">Life Insurance</option>
                        <option value="non-life">Non-Life Insurance</option>
                      </select>
                      <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Phone</label>
                      <div className="flex gap-2">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className={`px-3 py-3 rounded-xl outline-none border-2 transition-all ${isDark
                            ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white'
                            : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 focus:bg-white'
                            }`}
                        >
                          <option value="+234">🇳🇬 +234</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+27">🇿🇦 +27</option>
                          <option value="+254">🇰🇪 +254</option>
                          <option value="+233">🇬🇭 +233</option>
                        </select>
                        <input
                          required
                          type="tel"
                          name="phone"
                          placeholder="8012345678"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`flex-1 px-4 py-3 rounded-xl outline-none border-2 transition-all ${isDark
                            ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white placeholder-gray-500'
                            : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 placeholder-gray-400 focus:bg-white'
                            }`}
                        />
                      </div>
                    </div>


                  </div>
                  <div className="space-y-1 text-left">
                    <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Interest</label>
                    <div className="relative">
                      <select
                        required
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        disabled={!formData.insuranceType}
                        className={`w-full px-4 py-3 rounded-xl outline-none border-2 appearance-none transition-all ${isDark
                          ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white disabled:opacity-50'
                          : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 focus:bg-white disabled:opacity-50'
                          }`}
                      >
                        <option value="">
                          {formData.insuranceType ? "Select interest..." : "Select type first"}
                        </option>
                        {formData.insuranceType === 'life' && lifeInsuranceOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                        {formData.insuranceType === 'non-life' && nonLifeInsuranceOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* <div className="space-y-1 text-left">
                    <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Message (Optional)</label>
                    <textarea
                      name="message"
                      placeholder="Tell us more about your insurance needs..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${
                        isDark 
                          ? 'bg-gray-700/50 border-gray-600 focus:border-green-500 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-100 focus:border-green-400 text-gray-900 placeholder-gray-400 focus:bg-white'
                      }`}
                    />
                  </div> */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 mt-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Start My Quote</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right side - Info */}
            <div className={`hidden lg:flex flex-col justify-between p-8 overflow-y-auto ${isDark ? 'bg-gray-900/50' : 'bg-green-50'
              }`}>
              <div>
                <h4 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Why Choose Rewards?
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                      }`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className={`text-sm flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Expert Advisors:</strong> Licensed professionals with 10+ years experience
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                      }`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className={`text-sm flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Best Rates:</strong> We compare 50+ insurers to find you the best deal
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                      }`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className={`text-sm flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>24/7 Support:</strong> Claims assistance available round the clock
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                      }`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className={`text-sm flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Fast Processing:</strong> Get your policy in as little as 24 hours
                    </span>
                  </li>
                </ul>
              </div>

              <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-green-100/50'}`}>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <strong className="block mb-1">Need help immediately?</strong>
                  Call our support team: <span className="font-bold text-green-600">+234 703 908 1842</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteForm;