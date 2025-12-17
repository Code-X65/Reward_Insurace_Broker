import React, { useState, useEffect, useRef } from 'react';
import { Shield, Phone, Heart, Home, Briefcase, Car, CheckCircle, ArrowRight, Star, Menu, X, Sun, Moon } from 'lucide-react';

const InsuranceHero = () => {
  // --- 1. THEME LOGIC (Preserved from original) ---
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });


// 4. Add these imports at the top for insurance data
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

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "theme") {
        const newTheme = e.newValue === "dark";
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark", newTheme);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  // --- 2. STATE & REFS ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [insuranceType, setInsuranceType] = useState('');
  const [showMobileForm, setShowMobileForm] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  countryCode: '+234', // Default to Nigeria
  insuranceType: '',
  service: '',
  message: ''
});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  const formRef = useRef(null);

  // Updated "Welcoming" Image Set (Lifestyle & Human focused)
 const backgroundImages = [
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80', // Business documents and planning
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80', // Modern office building
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80', // Business team collaboration
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80', // Professional business person
  ];

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000); // Slowed down slightly for a calmer feel
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Entrance Animations
  useEffect(() => {
    const elements = [
      { ref: titleRef, delay: 100 },
      { ref: subtitleRef, delay: 300 },
      { ref: descriptionRef, delay: 500 },
      { ref: buttonsRef, delay: 700 },
      { ref: featuresRef, delay: 900 },
      { ref: formRef, delay: 1100 }
    ];

    elements.forEach(({ ref, delay }) => {
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.opacity = '1';
          ref.current.style.transform = 'translateY(0)';
        }
      }, delay);
    });
  }, []);
  useEffect(() => {
  if (showMobileForm) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
  return () => {
    document.body.style.overflow = 'unset';
  };
}, [showMobileForm]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE', // Replace with your actual key
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
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        countryCode: '+234',
        insuranceType: '',
        service: '', 
        message: '' 
      });
      setTimeout(() => setShowSuccess(false), 5000);
    }
  } catch (error) {
    console.error('Form submission error:', error);
  } finally {
    setIsSubmitting(false);
  }
};


  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  

  return (
    <div className={`relative min-h-screen font-sans selection:bg-green-300 selection:text-green-900 ${isDark ? 'dark' : ''}`}>
      
      {/* Navigation / Header Area */}
      <nav className="absolute top-20 left-0 right-0 z-50 px-6 py-6">
        <div className="container mx-auto flex justify-between items-center">
       
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative min-h-screen overflow-hidden flex items-center ${
        isDark ? 'bg-slate-950' : 'bg-gray-50'
      } transition-colors duration-500`}>
        
        {/* Background Images with Improved Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
              style={{
                opacity: currentImageIndex === index ? 1 : 0,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
          {/* Enhanced Gradient for readability while keeping image visible */}
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-r from-gray-900 via-gray-900/95 to-green-900/40' 
              : 'bg-gradient-to-r from-white via-white/90 to-green-100/30'
          }`} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 max-w-2xl">
              
              {/* Trust Badge / Avatar Group */}
              <div 
                ref={titleRef}
                className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 ${isDark ? 'border-gray-900' : 'border-white'} overflow-hidden`}>
                         <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className={`w-10 h-10 rounded-full border-2 ${isDark ? 'border-gray-900 bg-green-600' : 'border-white bg-green-500'} flex items-center justify-center text-xs text-white font-bold`}>
                      +20
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Trusted by 20+ business</span>
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <div 
                ref={subtitleRef}
                className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              >
                <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                Comprehensive <br/>
                  <span className="text-green-500 inline-block relative">
                     Coverage 
                     {/* Decorative underline */}
                     <svg className="absolute w-full h-3 -bottom-1 left-0 text-green-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                     </svg>
                  </span>, 
                 for Your Business & Assets
                </h1>
              </div>

              {/* Description */}
              <p 
                ref={descriptionRef}
                className={`text-lg sm:text-xl leading-relaxed max-w-lg opacity-0 translate-y-8 transition-all duration-1000 ease-out ${
                  isDark ? 'text-gray-300' : 'text-slate-600'
                }`}
              >
                Focus on tailored solutions for businesses and organizations
              </p>

              {/* CTA Buttons */}
              <div 
                ref={buttonsRef}
                className="flex flex-col sm:flex-row gap-4 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              >
                <a href='#contact' className="group px-4 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center space-x-2">
                  <span>Request a Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border-2 ${
                  isDark 
                    ? 'border-slate-700 text-white hover:bg-slate-800' 
                    : 'border-gray-200 text-slate-700 hover:bg-white hover:border-gray-300'
                }`}>
                  <Phone className="w-5 h-5" />
                  <span>Contact an Agent</span>
                </button>
              </div>

              {/* Features List */}
              <div 
                ref={featuresRef}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 opacity-0 translate-y-8 transition-all duration-1000 ease-out border-t border-gray-200/10"
              >
                {[
                  { icon: Heart, text: "Commercial Coverage" },
                  { icon: CheckCircle, text: "Fast Claims Process" },
                  { icon: Shield, text: "Risk Management" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${isDark ? 'bg-slate-800 text-green-400' : 'bg-green-50 text-green-600'}`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Modern Glass Card Form */}
      

{/* Right Content - Modern Glass Card Form */}
<div 
  ref={formRef}
  className="opacity-0 translate-y-8 transition-all duration-1000 ease-out lg:pl-10"
>
  {/* Desktop Form - Hidden on mobile */}
  <div className="hidden lg:block">
    <div className={`relative rounded-3xl p-1 shadow-2xl ${
      isDark ? 'bg-gradient-to-b from-gray-700 to-gray-800' : 'bg-gradient-to-b from-white to-gray-50'
    }`}>
      {/* Floating Badge */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 whitespace-nowrap z-20">
         <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
         Licensed Agents Available
      </div>

      <div className={`relative rounded-[20px] p-6 sm:p-8 overflow-hidden h-full ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
         {/* Decorative background blobs for form */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
         <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>

        <div className="relative z-10 text-center mb-8">
          <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Get Your Free Quote
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Takes less than 2 minutes. No spam, ever.
          </p>
        </div>

        {showSuccess ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
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
                Need immediate assistance? Call us at <span className="font-bold text-green-500">+234 XXX XXX XXXX</span>
              </p>
            </div>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Form fields - same as before */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <label className={`text-xs font-semibold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Company/Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${
                    isDark 
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
                  className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${
                    isDark 
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
                  className={`w-full px-4 py-3 rounded-xl outline-none border-2 appearance-none transition-all ${
                    isDark 
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
                  className={`px-3 py-3 rounded-xl outline-none border-2 transition-all ${
                    isDark 
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
                  className={`flex-1 px-4 py-3 rounded-xl outline-none border-2 transition-all ${
                    isDark 
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
                  className={`w-full px-4 py-3 rounded-xl outline-none border-2 appearance-none transition-all ${
                    isDark 
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
              className={`w-full px-8 py-4 mt-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
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

  {/* Mobile - Show Button Only */}
  <div className="lg:hidden flex justify-center">
    <button
      onClick={() => setShowMobileForm(true)}
      className="group px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center space-x-2"
    >
      <span>Get Free Quote</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
</div>

{/* Mobile Popup Modal */}

{showMobileForm && (
  <div className="lg:hidden fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fadeIn">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setShowMobileForm(false)}
    ></div>
    
    {/* Modal Content */}
    <div className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transform transition-all animate-slideUp ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Close Button */}
      <button
        onClick={() => setShowMobileForm(false)}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
          isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
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
                Need immediate assistance? Call us at <span className="font-bold text-green-500">+234 XXX XXX XXXX</span>
              </p>
            </div>
            <button
              onClick={() => {
                setShowMobileForm(false);
                setShowSuccess(false);
              }}
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
                  className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${
                    isDark 
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
                  className={`w-full px-4 py-3 rounded-xl outline-none border-2 transition-all ${
                    isDark 
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
                  className={`w-full px-4 py-3 rounded-xl outline-none border-2 appearance-none transition-all ${
                    isDark 
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
                  className={`px-3 py-3 rounded-xl outline-none border-2 transition-all ${
                    isDark 
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
                  className={`flex-1 px-4 py-3 rounded-xl outline-none border-2 transition-all ${
                    isDark 
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
                  className={`w-full px-4 py-3 rounded-xl outline-none border-2 appearance-none transition-all ${
                    isDark 
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
)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsuranceHero;