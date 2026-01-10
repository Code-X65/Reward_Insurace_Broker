import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Shield, Phone, Heart, CheckCircle, ArrowRight, Star, User, Mail, ChevronDown, X } from 'lucide-react';
import { useForm } from '../context/FormContext';
import img01 from '../assets/partners/vertias.png';
import img02 from '../assets/partners/img02.webp';
import img03 from '../assets/partners/img03.png';
import img04 from '../assets/partners/img04.png';
import img05 from '../assets/partners/img05.png';
import img06 from '../assets/partners/img06.png';
import img07 from '../assets/partners/img07.png';
import img08 from '../assets/partners/img08.png';
import img09 from '../assets/partners/img09.png';

import img11 from '../assets/partners/img11.png';
import img12 from '../assets/partners/img12.png';
import img13 from '../assets/partners/img13.png';

import img16 from '../assets/partners/img16.png';
import img17 from '../assets/partners/img17.png';
import img18 from '../assets/partners/img18.png';
import img19 from '../assets/partners/img19.png';

const InsuranceHero = () => {

  // Partner logos array
  const allPartnerLogos = [
    img01, img02, img03, img04, img05, img06, img07, img08, img09,
    img11, img12, img13, img16, img17, img18, img19
  ];

  // Randomly select 4 partner logos (memoized to prevent re-shuffling on re-renders)
  const selectedPartners = useMemo(() => {
    const shuffled = [...allPartnerLogos].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, []);

  // --- 1. THEME LOGIC ---
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : false;
  });

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    insuranceType: '',
    countryCode: '+234',
    service: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lifeInsuranceOptions = [
    'Term Life Insurance',
    'Whole Life Insurance',
    'Group Life Insurance',
    'Education Plan',
    'Retirement/Savings Plan'
  ];

  const nonLifeInsuranceOptions = [
    'Motor Insurance',
    'Fire & Burglary',
    'Marine & Cargo',
    'Travel Insurance',
    'General Accident'
  ];

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  const { openForm, closeForm } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const backgroundImages = [
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80',
  ];

  // Insurance options
  const insuranceTypes = [
    'General Insurance',
    'Life Insurance',
    'Health Insurance',
    'Property Insurance',
    'Business Insurance',
    'Auto Insurance',
    'Travel Insurance'
  ];

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Entrance Animations
  useEffect(() => {
    const elements = [
      { ref: titleRef, delay: 100 },
      { ref: subtitleRef, delay: 300 },
      { ref: descriptionRef, delay: 500 },
      { ref: buttonsRef, delay: 700 },
      { ref: featuresRef, delay: 900 }
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMiniFormSubmit = (e) => {
    e.preventDefault();
    openForm();
    // You can also pre-fill the main form with this data if needed
  };

  return (
    <div className={`relative min-h-screen font-sans  selection:bg-green-300 selection:text-green-900 ${isDark ? 'dark' : ''}`}>

      {/* Hero Section */}
      <section className={`relative min-h-screen overflow-hidden flex items-center ${isDark ? 'bg-slate-950' : 'bg-gray-50'
        } transition-colors duration-500`}>

        {/* Background Images with Gradient Overlay */}
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
          <div className={`absolute inset-0 ${isDark
            ? 'bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/95'
            : 'bg-gradient-to-r from-white via-white/95 to-white/95'
            }`} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 py-12 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">

            {/* Left Side: Main Content */}
            <div className="space-y-8">

              {/* Trust Badge / Avatar Group */}
              <div
                ref={titleRef}
                className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-3">
                    {selectedPartners.map((partner, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 ${isDark ? 'border-gray-900 bg-white' : 'border-white bg-gray-100'} overflow-hidden flex items-center justify-center p-1`}>
                        <img src={partner} alt={`Partner ${i + 1}`} className="w-full h-full object-contain" />
                      </div>
                    ))}
                    <div className={`w-10 h-10 rounded-full border-2 ${isDark ? 'border-gray-900 bg-green-600' : 'border-white bg-green-500'} flex items-center justify-center text-xs text-white font-bold`}>
                      +100
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-black'}`}>Trusted by 100+ businesses</span>
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <div
                ref={subtitleRef}
                className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              >
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                  Comprehensive <br />
                  <span className="text-green-500 inline-block relative">
                    Coverage
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-green-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>
                  <br />
                  for Your Business & Assets
                </h1>
              </div>

              {/* Description */}
              <p
                ref={descriptionRef}
                className={`text-lg sm:text-xl leading-relaxed opacity-0 translate-y-8 transition-all duration-1000 ease-out ${isDark ? 'text-gray-300' : 'text-black font-medium'
                  }`}
              >
                Focus on tailored solutions for businesses and organizations with our comprehensive insurance plans designed to protect what matters most.
              </p>

              {/* CTA Buttons */}
              <div
                ref={buttonsRef}
                className="flex flex-col sm:flex-row gap-4 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              >
                <button
                  onClick={() => openForm()}
                  className="group px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center space-x-2"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href='#contact'
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border-2 ${isDark
                    ? 'border-gray-700 text-white hover:bg-gray-800'
                    : 'border-gray-300 text-black hover:bg-gray-50 hover:border-gray-400'
                    }`}
                >
                  <Phone className="w-5 h-5" />
                  <span>Contact an Agent</span>
                </a>
              </div>

              {/* Features List */}
              <div
                ref={featuresRef}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-200/10 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
              >
                {[
                  { icon: Heart, text: "Commercial Coverage", desc: "Business protection" },
                  { icon: CheckCircle, text: "Fast Claims", desc: "24-hour processing" },
                  { icon: Shield, text: "Risk Management", desc: "Expert guidance" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-xl ${isDark ? 'bg-gray-800 text-green-400' : 'bg-green-50 text-green-600'}`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`block text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {feature.text}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-black font-medium'}`}>
                        {feature.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Side: Embedded Premium Form */}
            <div className="hidden md:flex justify-end lg:pr-0">
              <div className={`relative w-full max-w-md ml-auto rounded-3xl shadow-2xl transform transition-all duration-500 hover:shadow-green-500/10 ${isDark ? 'bg-gray-900/40 border border-gray-800' : 'bg-white/80 border border-gray-100'
                } backdrop-blur-xl overflow-hidden`}>

                <div className="p-8">
                  {/* Status Badge */}
                  <div className="flex justify-center mb-8">
                    <div className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-green-500/20">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      LICENSED AGENTS ONLINE
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Get Your Free Quote
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-black font-medium'}`}>
                      Complete the form below to start your protection journey.
                    </p>
                  </div>

                  {showSuccess ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center animate-fadeIn">
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h4 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Request Sent!
                      </h4>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-black font-semibold'}`}>
                        Our specialists will reach out to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setShowSuccess(false)}
                        className="mt-8 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-500/25"
                      >
                        New Quote
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-black'}`}>Full Name</label>
                          <div className="relative">
                            <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                              required
                              type="text"
                              name="name"
                              placeholder="John Smith"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none border transition-all duration-300 ${isDark
                                ? 'bg-gray-800/50 border-gray-700/50 focus:border-green-500/50 text-white placeholder-gray-600'
                                : 'bg-gray-50/50 border-gray-200 focus:border-green-400 text-gray-900 placeholder-gray-400'
                                }`}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-black'}`}>Email Address</label>
                          <div className="relative">
                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                              required
                              type="email"
                              name="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none border transition-all duration-300 ${isDark
                                ? 'bg-gray-800/50 border-gray-700/50 focus:border-green-500/50 text-white placeholder-gray-600'
                                : 'bg-gray-50/50 border-gray-200 focus:border-green-400 text-gray-900 placeholder-gray-400'
                                }`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-black'}`}>Insurance Category</label>
                        <div className="relative">
                          <select
                            required
                            name="insuranceType"
                            value={formData.insuranceType}
                            onChange={(e) => {
                              setFormData({ ...formData, insuranceType: e.target.value, service: '' });
                            }}
                            className={`w-full px-4 py-3.5 rounded-2xl outline-none border appearance-none transition-all duration-300 ${isDark
                              ? 'bg-gray-800/50 border-gray-700/50 focus:border-green-500/50 text-white cursor-pointer'
                              : 'bg-gray-50/50 border-gray-200 focus:border-green-400 text-gray-900 cursor-pointer'
                              }`}
                          >
                            <option value="">Select Category</option>
                            <option value="life">Life Insurance</option>
                            <option value="non-life">Non-Life Insurance</option>
                          </select>
                          <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${isDark ? 'text-gray-500' : 'text-black'}`}>Specific Interest</label>
                        <div className="relative">
                          <select
                            required
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            disabled={!formData.insuranceType}
                            className={`w-full px-4 py-3.5 rounded-2xl outline-none border appearance-none transition-all duration-300 ${isDark
                              ? 'bg-gray-800/50 border-gray-700/50 focus:border-green-500/50 text-white disabled:opacity-50'
                              : 'bg-gray-50/50 border-gray-200 focus:border-green-400 text-gray-900 disabled:opacity-50'
                              }`}
                          >
                            <option value="">
                              {formData.insuranceType ? "Choose your plan..." : "Select category first"}
                            </option>
                            {formData.insuranceType === 'life' && lifeInsuranceOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                            {formData.insuranceType === 'non-life' && nonLifeInsuranceOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-8 py-4 mt-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/20 flex items-center justify-center space-x-2 group/btn ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Get My Quote Now</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-700"></div>
              <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-green-600/10 rounded-full blur-3xl group-hover:bg-green-600/20 transition-all duration-700"></div>
            </div>


          </div>
        </div>

      </section>
    </div>
  );
};

export default InsuranceHero;