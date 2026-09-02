"use client";

import { useState, useEffect } from "react";
import { FaStar, FaGoogle, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";

export default function GoogleReviews() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const scriptId = "beaver-reviews-script";

        // Remove existing script to ensure it re-executes on page/component mount
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://reviews.beaver.codes/widget/web-google-reviews.js?v=${Date.now()}`;
        script.async = true;

        const target = document.querySelector(`div[data-instance-id="X6xj2UP39V8sptjsHG7Y"]`);
        if (target) {
            target.appendChild(script);
        }

        const observer = new MutationObserver(() => {
            if (target && target.children.length > 1) {
                setIsLoading(false);
                observer.disconnect();
            }
        });

        if (target) {
            observer.observe(target, { childList: true, subtree: true });
        }

        // Safeguard timeout to hide loader if loading takes too long
        const timer = setTimeout(() => {
            setIsLoading(false);
            observer.disconnect();
        }, 5000);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
            const addedScript = document.getElementById(scriptId);
            if (addedScript) {
                addedScript.remove();
            }
        };
    }, []);

    return (
        <section className="py-12  bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] relative overflow-hidden">
            {/* Background decoration blur elements */}
            <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-10 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>

            <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-3 sm:mb-4 shadow-sm">
                        <span className="flex h-2 sm:h-2.5 w-2 sm:w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-700 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                            <FaGoogle className="w-3 h-3 text-blue-600" /> Google Verified Feed
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl  md:text-4xl  font-black text-slate-900 tracking-tight leading-tight">
                        Loved By Businesses Everywhere
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 font-medium max-w-xl mx-auto leading-relaxed">
                        Real feedback and ratings from our amazing clients on Google. We take pride in delivering top-tier digital products.
                    </p>

                    {/* Quick Rating Summary */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 p-3 sm:p-4 bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="font-extrabold text-slate-900 text-sm sm:text-base">5.0 / 5.0 Rating</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
                        <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-xs sm:text-sm">
                            <FaCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 100% Genuine Reviews
                        </div>
                    </div>
                </div>

                {/* Beaver Google Reviews Widget Container */}
                <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 border border-slate-100/90 shadow-[0_12px_40px_rgba(15,23,42,0.03)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                    {/* Top colored accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 via-orange-500 to-amber-500"></div>

                    {/* Spinner Overlay */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-2 sm:gap-3 p-4">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 border-3 sm:border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="text-xs sm:text-sm font-bold text-slate-500">Loading Google Reviews...</p>
                        </div>
                    )}

                    {/* The Widget Wrapper */}
                    <div className="w-full min-h-[200px] sm:min-h-[250px] overflow-hidden py-2">
                        <div data-instance-id="X6xj2UP39V8sptjsHG7Y" className="w-full" />
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="mt-8 sm:mt-12 text-center">
                    <a
                        href="https://www.google.com/search?q=i+next+ets"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm w-full sm:w-auto"
                    >
                        <FaGoogle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Share Your Experience on Google</span>
                        <FaExternalLinkAlt className="w-3 h-3 opacity-80" />
                    </a>
                </div>

            </div>
        </section>
    );
}