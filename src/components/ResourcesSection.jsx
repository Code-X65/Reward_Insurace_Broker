import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, FileText, ArrowRight } from 'lucide-react';

const ResourcesSection = () => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : false;
    });

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

    const resources = [
        {
            title: "Insurance Guide",
            description: "A comprehensive look at everything you need to know about insurance in Nigeria.",
            icon: <BookOpen className="w-6 h-6" />,
            link: "/insurance-guide",
            color: "green"
        },
        {
            title: "Privacy Policy",
            description: "Learn how we protect your personal data and respect your digital privacy.",
            icon: <ShieldCheck className="w-6 h-6" />,
            link: "/privacy",
            color: "blue"
        },
        {
            title: "Terms of Service",
            description: "Understand the terms and conditions that govern our professional relationship.",
            icon: <FileText className="w-6 h-6" />,
            link: "/terms-of-service",
            color: "purple"
        }
    ];

    return (
        <section className={`py-20 transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Knowledge <span className="text-green-500">Center</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Explore our resources to better understand how we protect what matters most to you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {resources.map((resource, index) => (
                        <Link
                            key={index}
                            to={resource.link}
                            onClick={() => window.scrollTo(0, 0)}
                            className={`group p-8 rounded-[2rem] transition-all duration-300 transform hover:-translate-y-2 ${isDark
                                ? 'bg-gray-900/50 border border-gray-800 hover:border-green-500/50'
                                : 'bg-gray-50 border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-xl'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${isDark ? 'bg-gray-800 group-hover:bg-green-500/20' : 'bg-white group-hover:bg-green-50'
                                } text-green-500 shadow-sm`}>
                                {resource.icon}
                            </div>

                            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {resource.title}
                            </h3>

                            <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {resource.description}
                            </p>

                            <div className="flex items-center text-green-500 font-bold gap-2">
                                Learn More
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResourcesSection;
