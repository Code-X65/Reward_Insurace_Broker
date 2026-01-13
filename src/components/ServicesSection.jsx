import React, { useState, useEffect, useRef } from 'react';
import { useForm } from '../context/FormContext';
import {
  Users,
  Shield,
  Building2,
  CircleDollarSign,
  Car,
  Flame,
  TrendingDown,
  Building,
  Lock,
  Truck,
  HandCoins,
  Handshake,
  Users2,
  Package,
  Construction,
  Cog,
  Factory,
  Scale,
  Ship,
  Plane,
  Zap,
  Home,
  CheckCircle
} from 'lucide-react';
import gsap from 'gsap';

import AnnuityLifePolicy from '../assets/ServicesImges/Annuity_Life_Policy.jpg';
import BurglaryInsurance from '../assets/ServicesImges/Burglary_Insurance.jpg';
import CashInTransitInsurance from '../assets/ServicesImges/Cash_In_Transit_Insurance.jpg';
import CombinedAllRiskInsurance2 from '../assets/ServicesImges/Combined_All_Risk_Insurance (2).jpg';
import CombinedAllRiskInsurance from '../assets/ServicesImges/Combined_All_Risk_Insurance.jpg';
import ContractorAllRiskInsurance from '../assets/ServicesImges/Contractor_All_Risk_Insurance.jpg';
import EnergyInsurance from '../assets/ServicesImges/Energy_Insurance.jpeg';
import EngineeringInsurance from '../assets/ServicesImges/Engineering_Insurance.jpg';
import FidelityGuaranteeInsurance from '../assets/ServicesImges/Fidelity_Guarantee_Insurance.jpg';
import FireAndSpecialPerils from '../assets/ServicesImges/Fire_and_special_perils.jpg';
import GroupLifeInsurance from '../assets/ServicesImges/Group_Life_Insurance.jpg';
import GroupPersonal from '../assets/ServicesImges/Group_Personal.jpg';
import IndustrialAllRisk from '../assets/ServicesImges/Industrial_All_Risk.avif';
import ProductLiabilityInsurance from '../assets/ServicesImges/Product_Liability_Insurance.webp';
import PublicLiabilityInsurance2 from '../assets/ServicesImges/Public_Liability_Insurance 2.jpg';
import PublicLiabilityInsurance from '../assets/ServicesImges/Public_Liability_Insurance.jpg';


const ServicesSection = () => {
  const { openForm } = useForm();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const lifeInsuranceRef = useRef(null);
  const nonLifeInsuranceRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  // Animation for Opening Modal
  useEffect(() => {
    if (selectedService && modalRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      )
        .fromTo(modalRef.current,
          { scale: 0.9, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(contentRef.current?.children ?? [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          "-=0.2"
        );
    }
  }, [selectedService]);

  const handleClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedService(null);
        setIsAnimating(false);
      }
    });

    tl.to(modalRef.current, {
      scale: 0.95,
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in"
    })
      .to(backdropRef.current, {
        opacity: 0,
        duration: 0.2
      }, "-=0.2");
  };

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

  // Horizontal scroll on mouse wheel
  useEffect(() => {
    const handleWheel = (e, ref) => {
      if (!ref.current) return;

      const container = ref.current;
      const rect = container.getBoundingClientRect();

      // Check if container is in viewport
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const isAtStart = container.scrollLeft === 0;
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

        // If scrolling down and not at end, scroll horizontally
        if (e.deltaY > 0 && !isAtEnd) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
        // If scrolling up and not at start, scroll horizontally
        else if (e.deltaY < 0 && !isAtStart) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    const lifeHandler = (e) => handleWheel(e, lifeInsuranceRef);
    const nonLifeHandler = (e) => handleWheel(e, nonLifeInsuranceRef);

    window.addEventListener('wheel', lifeHandler, { passive: false });
    window.addEventListener('wheel', nonLifeHandler, { passive: false });

    return () => {
      window.removeEventListener('wheel', lifeHandler);
      window.removeEventListener('wheel', nonLifeHandler);
    };
  }, []);

  const lifeInsurance = [
    {
      title: 'Group Life Insurance',
      description: 'Comprehensive employer-sponsored life coverage protecting multiple employees under one policy.',
      image: GroupLifeInsurance,
      icon: Users,
      features: ['Multi-Employee Coverage', 'Employer Benefits', 'Death Benefits', 'Accidental Death'],
      stats: { clients: '500+', satisfaction: '98%', employees: '50K+' },
      details: 'Protect your entire workforce with our group life insurance. Cost-effective coverage for businesses of all sizes, providing employees and their families with financial security and peace of mind.'
    },
    {
      title: 'Individual Life Insurance',
      description: 'Personalized life coverage tailored to your unique needs and family protection goals.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&h=1200&fit=crop&q=90',
      icon: Shield,
      features: ['Family Protection', 'Term Life Options', 'Whole Life Plans', 'Critical Illness Rider'],
      stats: { clients: '75K+', satisfaction: '99%', payout: '$1.5B+' },
      details: 'Secure your family\'s future with customized individual life insurance. Choose from term or whole life options with flexible premiums and comprehensive coverage that grows with your needs.'
    },
    {
      title: 'Group Personal',
      description: 'Combined group personal accident and health coverage for organizations and their employees.',
      image: GroupPersonal,
      icon: Building2,
      features: ['Accident Coverage', 'Medical Benefits', 'Disability Protection', 'Emergency Care'],
      stats: { clients: '800+', satisfaction: '97%', members: '65K+' },
      details: 'Comprehensive group personal accident and health insurance for your organization. Provides employees with medical coverage, accident protection, and disability benefits under one convenient policy.'
    },
    {
      title: 'Annuity Life Policy',
      description: 'Guaranteed income for life with strategic retirement planning and wealth accumulation.',
      image: AnnuityLifePolicy,
      icon: CircleDollarSign,
      features: ['Lifetime Income', 'Retirement Planning', 'Tax-Deferred Growth', 'Death Benefits'],
      stats: { clients: '30K+', satisfaction: '99%', income: 'Guaranteed' },
      details: 'Enjoy financial security in retirement with our annuity life policies. Guaranteed income streams, tax-deferred growth, and flexible payout options ensure you maintain your lifestyle throughout retirement.'
    }
  ];

  const nonLifeInsurance = [
    {
      title: 'Motor Insurance',
      description: 'Complete vehicle protection with instant claims processing and 24/7 roadside assistance.',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1600&h=1200&fit=crop&q=90',
      icon: Car,
      features: ['Accident Coverage', 'Theft Protection', 'Roadside Assistance', 'Third Party Liability'],
      stats: { clients: '200K+', satisfaction: '97%', claims: '24h' },
      details: 'Drive with confidence knowing you\'re fully protected. Our motor insurance covers everything from minor scratches to major accidents, with hassle-free claims and instant support.'
    },
    {
      title: 'Fire and Special Perils',
      description: 'Comprehensive protection against fire, lightning, explosion, and other special perils.',
      image: FireAndSpecialPerils,
      icon: Flame,
      features: ['Fire Damage', 'Lightning Strike', 'Explosion Coverage', 'Earthquake Protection'],
      stats: { clients: '85K+', satisfaction: '96%', response: '3h' },
      details: 'Protect your property against fire and special perils with comprehensive coverage. From residential to commercial properties, we ensure rapid response and full protection against unexpected disasters.'
    },
    {
      title: 'Consequential Loss Insurance',
      description: 'Business interruption coverage protecting your income when operations are disrupted.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=1200&fit=crop&q=90',
      icon: TrendingDown,
      features: ['Lost Profits', 'Fixed Costs Coverage', 'Revenue Protection', 'Business Continuity'],
      stats: { clients: '30K+', satisfaction: '95%', recovery: 'Fast' },
      details: 'Safeguard your business income against interruptions. Our consequential loss insurance ensures you maintain financial stability during unexpected shutdowns or operational disruptions.'
    },
    {
      title: 'Combined All Risk Insurance',
      description: 'All-encompassing property protection covering multiple perils under one comprehensive policy.',
      image: CombinedAllRiskInsurance,
      icon: Building,
      features: ['Multi-Peril Coverage', 'Property Damage', 'Contents Protection', 'Business Assets'],
      stats: { clients: '50K+', satisfaction: '97%', coverage: 'Complete' },
      details: 'Experience ultimate peace of mind with our combined all risk insurance. One policy covers your property, contents, and business assets against virtually all risks of physical loss or damage.'
    },
    {
      title: 'Burglary and House Breaking Insurance',
      description: 'Protection against theft, burglary, and forced entry into your property or premises.',
      image: BurglaryInsurance,
      icon: Lock,
      features: ['Theft Coverage', 'Break-in Protection', 'Forced Entry Damage', 'Contents Security'],
      stats: { clients: '40K+', satisfaction: '94%', response: '1h' },
      details: 'Secure your property against burglary and housebreaking. Our comprehensive coverage protects your valuables and property damage resulting from theft or forced entry.'
    },
    {
      title: 'Goods In-Transit Insurance',
      description: 'Comprehensive cargo protection while goods are being transported by road, rail, or air.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&h=1200&fit=crop&q=90',
      icon: Truck,
      features: ['Transit Coverage', 'Damage Protection', 'Theft in Transit', 'Loading/Unloading Risk'],
      stats: { clients: '35K+', satisfaction: '96%', coverage: 'Nationwide' },
      details: 'Transport your goods with confidence. Our goods in-transit insurance provides comprehensive protection from warehouse to destination, covering all risks during transportation.'
    },
    {
      title: 'Cash In Transit Insurance',
      description: 'Specialized protection for cash and valuables being transported from one location to another.',
      image: CashInTransitInsurance,
      icon: HandCoins,
      features: ['Cash Protection', 'Armed Robbery Cover', 'Courier Coverage', 'ATM Replenishment'],
      stats: { clients: '12K+', satisfaction: '98%', security: '24/7' },
      details: 'Secure your cash movements with specialized transit insurance. Perfect for banks, retailers, and businesses handling large cash volumes with round-the-clock protection.'
    },
    {
      title: 'Fidelity Guarantee Insurance',
      description: 'Protection against financial loss caused by dishonest acts of employees.',
      image: FidelityGuaranteeInsurance,
      icon: Handshake,
      features: ['Employee Dishonesty', 'Fraud Protection', 'Embezzlement Cover', 'Financial Loss Recovery'],
      stats: { clients: '20K+', satisfaction: '95%', claims: 'Confidential' },
      details: 'Protect your business from internal fraud and employee dishonesty. Our fidelity guarantee insurance covers financial losses resulting from fraudulent acts by your staff.'
    },
    {
      title: 'Public Liability Insurance',
      description: 'Legal protection against claims from third parties for injury or property damage.',
      image: PublicLiabilityInsurance,
      icon: Users2,
      features: ['Third Party Claims', 'Bodily Injury Cover', 'Property Damage', 'Legal Defense'],
      stats: { clients: '60K+', satisfaction: '96%', defense: '24/7' },
      details: 'Safeguard your business against public liability claims. We provide comprehensive coverage for third-party injuries and property damage with full legal defense support.'
    },
    {
      title: 'Product Liability Insurance',
      description: 'Coverage for manufacturers and sellers against claims arising from defective products.',
      image: ProductLiabilityInsurance,
      icon: Package,
      features: ['Product Defects', 'Consumer Injury', 'Recall Costs', 'Legal Defense'],
      stats: { clients: '15K+', satisfaction: '97%', coverage: 'International' },
      details: 'Manufacture and sell with confidence. Our product liability insurance protects against claims of injury or damage caused by defective products, including recall expenses.'
    },
    {
      title: 'Contractor All Risk Insurance',
      description: 'Comprehensive coverage for construction projects from start to completion.',
      image: ContractorAllRiskInsurance,
      icon: Construction,
      features: ['Construction Works', 'Material Damage', 'Third Party Liability', 'Equipment Coverage'],
      stats: { clients: '18K+', satisfaction: '96%', projects: '8K+' },
      details: 'Build with confidence using our contractor all risk insurance. Comprehensive protection for construction projects covering materials, equipment, and third-party liabilities.'
    },
    {
      title: 'Engineering Insurance',
      description: 'Specialized coverage for machinery breakdown, electronic equipment, and boiler operations.',
      image: EngineeringInsurance,
      icon: Cog,
      features: ['Machinery Breakdown', 'Electronic Equipment', 'Boiler Explosion', 'Loss of Profits'],
      stats: { clients: '22K+', satisfaction: '97%', response: '4h' },
      details: 'Protect your critical machinery and equipment with specialized engineering insurance. Coverage for breakdowns, electronic failures, and resulting business interruption.'
    },
    {
      title: 'Industrial All Risk',
      description: 'Complete property and business interruption coverage for industrial operations.',
      image: IndustrialAllRisk,
      icon: Factory,
      features: ['Factory Coverage', 'Plant & Machinery', 'Stock Protection', 'Business Interruption'],
      stats: { clients: '28K+', satisfaction: '98%', coverage: 'Comprehensive' },
      details: 'Comprehensive protection for industrial facilities covering property, machinery, stock, and business interruption under a single policy for complete peace of mind.'
    },
    {
      title: 'Professional Indemnity Insurance',
      description: 'Legal protection and malpractice coverage for professionals and consultants.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&h=1200&fit=crop&q=90',
      icon: Scale,
      features: ['Malpractice Cover', 'Errors & Omissions', 'Legal Defense', 'Reputation Protection'],
      stats: { clients: '25K+', satisfaction: '98%', defense: '24/7' },
      details: 'Practice with peace of mind. Our professional indemnity insurance protects your reputation and finances with comprehensive liability coverage and 24/7 legal support.'
    },
    {
      title: 'Marine Insurance',
      description: 'Global cargo and vessel protection for seamless international trade operations.',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&h=1200&fit=crop&q=90',
      icon: Ship,
      features: ['Cargo Protection', 'Vessel Coverage', 'Transit Insurance', 'Port Risk'],
      stats: { clients: '10K+', satisfaction: '96%', coverage: 'Global' },
      details: 'Navigate international waters with confidence. Our marine insurance solutions cover importers, exporters, and shipping companies with comprehensive global protection.'
    },
    {
      title: 'Aviation Insurance',
      description: 'Specialized aircraft coverage for private owners, airlines, and aviation businesses.',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&h=1200&fit=crop&q=90',
      icon: Plane,
      features: ['Aircraft Hull', 'Liability Cover', 'Passenger Protection', 'Ground Risk'],
      stats: { clients: '5K+', satisfaction: '99%', partners: 'Global' },
      details: 'Fly secure with our specialized aviation insurance. We provide comprehensive coverage for aircraft, passengers, and operations with global partnerships.'
    },
    {
      title: 'Energy Insurance',
      description: 'Specialized coverage for oil, gas, and renewable energy operations and infrastructure.',
      image: EnergyInsurance,
      icon: Zap,
      features: ['Oil & Gas Coverage', 'Renewable Energy', 'Pipeline Protection', 'Exploration Risk'],
      stats: { clients: '8K+', satisfaction: '97%', coverage: 'Specialized' },
      details: 'Power your energy operations with confidence. Our specialized energy insurance covers oil, gas, and renewable energy projects with comprehensive risk management solutions.'
    }
  ];


  const ServiceCard = ({ service, index }) => {
    const IconComponent = service.icon;

    return (
      <div
        className={`flex-shrink-0 w-[320px] sm:w-[340px] p-8 rounded-2xl transition-all duration-300 snap-start ${isDark
          ? 'bg-gray-900/50 border border-gray-800 hover:border-green-500/50'
          : 'bg-white border border-gray-200 hover:border-green-500/50'
          } hover:shadow-xl hover:shadow-green-500/10`}
      >
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${isDark ? 'bg-green-500/20' : 'bg-green-500/10'
          }`}>
          <IconComponent className="w-8 h-8 text-green-500" />
        </div>

        {/* Title */}
        <h3 className={`text-xl sm:text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'
          }`}>
          {service.title}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-50' : 'text-black'
          }`}>
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-50' : 'text-black font-medium'
              }`}>
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Learn More Button */}
        <button
          onClick={() => setSelectedService(service)}
          className="inline-flex items-center gap-2 text-green-500 font-semibold hover:gap-3 transition-all duration-300 group"
        >
          Learn More
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };


  return (
    <div className={isDark ? 'dark bg-slate-950' : 'bg-white'} id='services'>
      <section className={`relative py-10 md:py-10 overflow-hidden max-w-7xl mx-auto px-2 transition-colors duration-500`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#4ade80' : '#10b981'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-500 text-white text-sm font-medium">
                <span>Our Services</span>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>

              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500">Insurance</span>
                <br className="hidden sm:block" /> Solutions
              </h1>

              <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${isDark ? 'text-gray-400' : 'text-black font-medium'
                }`}>
                Tailored protection plans designed for your unique needs and peace of mind.
              </p>
            </div>
          </div>

          {/* Life Insurance Section */}
          <div className="mb-16 md:mb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 mb-8">
              <div className="flex items-center gap-4">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                  Life Insurance
                </h2>

              </div>

            </div>

            <div
              ref={lifeInsuranceRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-4">
                {lifeInsurance.map((service, index) => (
                  <ServiceCard key={index} service={service} index={`life-${index}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Non-Life Insurance Section */}
          <div className="mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 mb-8">
              <div className="flex items-center gap-4">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                  Non-Life Insurance
                </h2>
                {/* <div className="h-1 flex-1 bg-gradient-to-r from-green-500 to-transparent rounded-full max-w-xs" /> */}
              </div>

            </div>

            <div
              ref={nonLifeInsuranceRef}
              className=" overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-4">
                {nonLifeInsurance.map((service, index) => (
                  <ServiceCard key={index} service={service} index={`non-life-${index}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20">
            <div className={`rounded-3xl p-6 sm:p-8 md:p-12 ${isDark
              ? 'bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-800'
              : 'bg-gradient-to-r from-gray-50 to-gray-100 backdrop-blur-sm border border-gray-200'
              }`}>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
                <div className="text-center lg:text-left">
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Need Custom Coverage?
                  </h3>
                  <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-black'}`}>
                    Our experts will design a personalized insurance plan just for you.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <button
                    onClick={openForm}
                    className="w-full sm:w-auto px-6 md:px-8 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-green-500 to-green-500 hover:shadow-lg hover:shadow-green-500/25 text-white"
                  >
                    Get Free Quote
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <div
              ref={backdropRef}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={handleClose}
            />

            {/* Modal Container */}
            <div
              ref={modalRef}
              className={`relative w-full max-w-6xl max-h-[90vh] flex flex-col lg:flex-row rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transform overflow-hidden ${isDark ? 'bg-slate-900/90' : 'bg-white/95'
                } border ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side - Interactive and Dynamic */}
              <div className="relative h-48 sm:h-64 lg:h-auto lg:w-5/12 group shrink-0 overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/60 via-transparent to-transparent`} />

                {/* Mobile Close Button (Glassmorphism) */}
                <button
                  onClick={handleClose}
                  className="lg:hidden absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all z-20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Floating Service Badge on Image */}
                {/* <div className="absolute bottom-6 left-6 right-6 hidden lg:block">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-sm font-bold uppercase tracking-widest">
                    <selectedService.icon className="w-4 h-4" />
                    Premium Protection
                  </div>
                </div> */}
              </div>

              {/* Content Side - Richer Typography & Layout */}
              <div
                ref={contentRef}
                className="flex-1 p-8 sm:p-10 lg:p-14 overflow-y-auto scrollbar-hide relative flex flex-col"
              >
                {/* Desktop Absolute Close Button */}
                <button
                  onClick={handleClose}
                  className={`hidden lg:flex absolute top-8 right-8 w-12 h-12 rounded-full items-center justify-center transition-all duration-300 ${isDark
                    ? 'bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900'
                    }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header Section */}
                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isDark ? 'bg-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'bg-green-500/10'}`}>
                      <selectedService.icon className="w-7 h-7 text-green-500" />
                    </div>
                    <span className="text-sm font-bold text-green-500 uppercase tracking-widest">Service Overview</span>
                  </div>
                  <h2 className={`text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                    {selectedService.title}
                  </h2>
                  <p className={`text-xl font-medium leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                    {selectedService.description}
                  </p>
                </div>

                {/* Service Stats / Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { label: 'Claim Process', value: '24/7 Support', sub: 'Instant Response' },
                    { label: 'Satisfaction', value: '98%', sub: 'Client Rating' },
                    { label: 'Coverage', value: 'Global', sub: 'Worldwide Reach' }
                  ].map((stat, i) => (
                    <div key={i} className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{stat.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Features Section */}
                <div className="mb-12">
                  <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span className="w-8 h-1 bg-green-500 rounded-full" />
                    Exclusive Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-4 p-5 rounded-2xl border group transition-all duration-300 ${isDark
                          ? 'bg-slate-800/20 border-slate-800/50 hover:border-green-500/50 hover:bg-slate-800/40'
                          : 'bg-white border-slate-200 hover:border-green-500/50 hover:shadow-md'
                          }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isDark ? 'bg-green-500/20 group-hover:bg-green-500' : 'bg-green-500/10 group-hover:bg-green-500'} transition-colors`}>
                          <CheckCircle className={`w-4 h-4 text-green-500 group-hover:text-white transition-colors`} />
                        </div>
                        <span className={`font-bold text-lg ${isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Narrative */}
                <div className={`mb-16 p-8 rounded-[2rem] border ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Plan Logistics</h3>
                  <p className={`text-xl leading-relaxed italic font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    "{selectedService.details}"
                  </p>
                </div>

                {/* Final Call to Action */}
                <div className="mt-auto pt-8 border-t border-slate-800/10 flex flex-col sm:flex-row gap-5">
                  <button
                    onClick={() => {
                      handleClose();
                      setTimeout(openForm, 400);
                    }}
                    className="flex-[2] py-5 px-10 rounded-2xl font-black text-xl bg-gradient-to-r from-green-500 to-green-400 text-white shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(34,197,94,0.5)] transform transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
                  >
                    Request a  Quote
                  </button>
                  <button className={`flex-1 py-5 px-10 rounded-2xl font-bold text-lg border-2 transition-all duration-300 ${isDark
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900'
                    }`}>
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none; /* Chrome, Safari and Opera */
          }
        `}</style>
      </section>
    </div>
  );
};

export default ServicesSection;