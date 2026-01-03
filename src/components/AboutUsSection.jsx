import React, { useState, useEffect, useRef } from 'react';
import { Shield, Users, Award, Target, Zap, CheckCircle, Briefcase, Handshake } from 'lucide-react';

const AboutUsSection = () => {
  // --- Theme Logic (Synced with Hero) ---
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    };

    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("storage", handleThemeChange); // Cross-tab sync

    // Initial check in case theme changed before mount
    handleThemeChange();

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);

  // --- Animation Logic ---
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    { icon: Handshake, number: '2.5k+', label: 'Deals Completed' },
    { icon: Users, number: '1.2k+', label: 'Satisfied Clients' },
    { icon: Briefcase, number: '50+', label: 'Partner Companies' },
    { icon: Shield, number: '5k+', label: 'Claims Settled' }
  ];

  const features = [
    {
      icon: Award,
      title: 'Professional Skill',
      description: 'Deliver on promises with honesty and integrity.'
    },
    {
      icon: Target,
      title: 'Performance Focused',
      description: 'Strive to achieve and exceed results.'
    },
    {
      icon: Users,
      title: 'Service Driven',
      description: 'Listen and understand client needs.'
    },
    {
      icon: Zap,
      title: 'Independent',
      description: 'Freedom to select best insurance markets.'
    }
  ];

  const benefits = [
    'Expert Risk Assessment',
    'Competitive Premium Rates',
    'Seamless Claims Process',
    'Dedicated Support Team'
  ];

  return (
    <div className={isDark ? 'dark' : ''} id='about'>
      <section
        ref={sectionRef}
        className={`relative py-10 lg:py-10 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-gray-50'
          }`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Blob 1 */}
          <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob ${isDark ? 'bg-green-900' : 'bg-green-200'
            }`}></div>
          {/* Blob 2 */}
          <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 ${isDark ? 'bg-blue-900' : 'bg-blue-200'
            }`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-2">

          {/* Header Section */}
          <div className={`text-center mb-16 max-w-3xl mx-auto transition-all duration-1000 transform ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <span className="text-green-500 font-bold tracking-wider uppercase text-sm mb-2 block">
              Why Choose Us
            </span>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              10+ Years of <span className="text-green-500 relative">
                Excellence
                <svg className="absolute w-full h-2 -bottom-1 left-0 text-green-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-black font-medium'
              }`}>
              The uniqueness of our service is found in our capability to ensure that you get what you need from your insurers, not just what they want to sell to you. We are your advocates.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl transition-all duration-700 transform hover:-translate-y-2 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } ${isDark
                    ? 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800'
                    : 'bg-white border border-gray-100 hover:border-green-100 shadow-sm hover:shadow-md'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-colors ${isDark ? 'bg-gray-700 text-green-400 group-hover:bg-green-900/50' : 'bg-green-50 text-green-600 group-hover:bg-green-100'
                  }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.number}
                </div>
                <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Narrative & Benefits */}
            <div className={`space-y-8 transition-all duration-1000 delay-300 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <div className={`p-8 rounded-3xl ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white shadow-xl shadow-green-900/5'
                }`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Your Trusted Insurance Partner
                </h3>
                <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-black'}`}>
                  We have carved a solid reputation as an efficient, innovative, and dynamic Insurance Broker in Nigeria and the international market. Our commitment is to provide tailored insurance solutions that protect what matters most to you.
                </p>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3 group">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-green-900/50 text-green-400 group-hover:bg-green-500 group-hover:text-white' : 'bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white'
                        }`}>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-black'}`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl transition-all duration-700 hover:scale-[1.02] ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    } ${isDark
                      ? 'bg-gray-800/40 border border-gray-700 hover:bg-gray-800'
                      : 'bg-white border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-lg'
                    }`}
                  style={{ transitionDelay: `${400 + (index * 100)}ms` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${isDark ? 'bg-gray-700 text-green-400' : 'bg-green-50 text-green-600'
                    }`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-black'}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsSection;