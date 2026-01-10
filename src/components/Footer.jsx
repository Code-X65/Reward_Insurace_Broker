import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Logo from "../assets/logo.png";

const Footer = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    };

    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);

  // Navigation handler for footer links
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();

    // If we're not on the homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    // If we're already on homepage, just scroll
    const target = document.getElementById(sectionId);
    if (!target) return;

    const navbarHeight = 64;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  // Scroll to top function when on homepage
  const handleLogoClick = (e) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/');
    } else {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const services = [
    { name: 'Life Insurance', href: '#services' },
    { name: 'Motor Insurance', href: '#services' },
    { name: 'Property Insurance', href: '#services' },
    { name: 'Marine Insurance', href: '#services' },
    { name: 'Aviation Insurance', href: '#services' }
  ];

  const company = [
    { name: 'About Us', href: '#about' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Contact', href: '#contact' }
  ];

  const resources = [
    { name: 'Insurance Guide', href: '/insurance-guide' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms-of-service' }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        </svg>
      ),
      href: 'https://www.instagram.com/rewards_ng/'
    }
  ];

  return (
    <footer className={`relative ${isDark
      ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-white'
      : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
      } transition-colors duration-300`}>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Company Info */}
          <div className="lg:col-span-2">
            {/* Logo Section - Made clickable */}
            <div
              onClick={handleLogoClick}
              className="flex items-center space-x-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity group"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-green-500/10'
                } p-2 group-hover:scale-105 transition-transform duration-300`}>
                <img src={Logo} alt="Rewards Insurance Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className={`font-bold text-xl ${isDark ? 'text-white' : 'text-black'}`}>
                  Rewards
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-black font-medium'}`}>
                  Insurance Brokers Limited
                </div>
                <div className={`text-[10px] font-bold tracking-widest mt-1 ${isDark ? 'text-gray-400' : 'text-black'}`}>
                  RC-208134 (General Insurance, Life & Annuity Consultants)
                </div>
              </div>
            </div>

            <p className={`${isDark ? 'text-gray-400' : 'text-black'
              } text-sm mb-8 max-w-md leading-relaxed`}>
              Your trusted partner for comprehensive insurance solutions in Nigeria. We carve a solid reputation as an efficient, innovative, and dynamic Insurance Broker.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className={`flex items-start space-x-3 text-sm ${isDark ? 'text-gray-400' : 'text-black'
                }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gray-800/50' : 'bg-green-500/10'
                  }`}>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span>+234 703 908 1842</span>
                  <span>+234 809 220 1539</span>
                </div>
              </div>

              <div className={`flex items-start space-x-3 text-sm ${isDark ? 'text-gray-400' : 'text-black'
                }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gray-800/50' : 'bg-green-500/10'
                  }`}>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>rewardsbrokers@yahoo.com</span>
              </div>

              <div className={`flex items-start space-x-3 text-sm ${isDark ? 'text-gray-400' : 'text-black'
                }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gray-800/50' : 'bg-green-500/10'
                  }`}>
                  <svg className="w-4 h-4 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>Suite 11, Canal House, Beside Veritas Kapital Assurance, Babatunde Ogala Street, Off Constitution Avenue, Central Business District, Abuja.</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className={`font-bold text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={(e) => handleNavigation(e, 'services')}
                    className={`hover:text-green-500 transition-colors text-sm text-left w-full ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-black hover:text-green-600'
                      } flex items-center gap-2 group`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`font-bold text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((item) => {
                if (item.name === 'News & Updates') {
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`hover:text-green-500 transition-colors text-sm ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-black hover:text-green-600'
                          } flex items-center gap-2 group`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {item.name}
                      </a>
                    </li>
                  );
                }

                const sectionId = item.href.replace('#', '');
                return (
                  <li key={item.name}>
                    <button
                      onClick={(e) => handleNavigation(e, sectionId)}
                      className={`hover:text-green-500 transition-colors text-sm text-left w-full ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-black hover:text-green-600'
                        } flex items-center gap-2 group`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`font-bold text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'
              }`}>
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`hover:text-green-500 transition-colors text-sm text-left w-full ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-black hover:text-green-600'
                      } flex items-center gap-2 group`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`${isDark
        ? 'border-t border-gray-800/50 bg-gray-900/50'
        : 'border-t border-gray-200 bg-gray-50/50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className={`text-sm text-center md:text-left ${isDark ? 'text-gray-500' : 'text-black font-medium'
              }`}>
              © 2025 Rewards Insurance Brokers Limited. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-1 cursor-pointer">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${isDark
                    ? 'bg-gray-800 hover:bg-green-500 text-gray-400 hover:text-gray-900'
                    : 'bg-white hover:bg-green-500 text-gray-600 hover:text-white border border-gray-200 hover:border-transparent shadow-sm hover:shadow-green-500/25'
                    }`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>

              ))}
              <a href='https://www.instagram.com/rewardsinsurancebrokers/' target="_blank" rel="noopener noreferrer">Follow us on instagram</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-20"></div>
    </footer>
  );
};

export default Footer;