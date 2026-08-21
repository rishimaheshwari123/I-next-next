"use client";

import { useState, useEffect } from "react";
import GoogleReviewsWidget from "google-reviews-widget";
import { FaStar, FaGoogle, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";

export default function GoogleReviews() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const target = document.querySelector(`div[data-instance-id="X6xj2UP39V8sptjsHG7Y"]`);
        if (!target) return;

        // Check if it already has more than the script tag (e.g. cached/preloaded)
        if (target.children.length > 1) {
            setIsLoading(false);
            return;
        }

        const observer = new MutationObserver(() => {
            if (target.children.length > 1) {
                setIsLoading(false);
                observer.disconnect();
            }
        });

        observer.observe(target, { childList: true, subtree: true });

        // Safeguard timeout to hide loader if loading takes too long
        const timer = setTimeout(() => {
            setIsLoading(false);
            observer.disconnect();
        }, 5000);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, []);

    return (
        <section className="py-5 bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] relative overflow-hidden">
            {/* Background decoration blur elements */}
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>

            <div className="max-w-[90vw] mx-auto px-4 lg:px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16 flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4 shadow-sm">
                        <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-700 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                            <FaGoogle className="w-3.5 h-3.5 text-blue-600" /> Google Verified Feed
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Loved By Businesses Everywhere
                    </h2>
                    <p className="text-slate-500 text-base mt-3 font-medium max-w-xl mx-auto leading-relaxed">
                        Real feedback and ratings from our amazing clients on Google. We take pride in delivering top-tier digital products.
                    </p>

                    {/* Quick Rating Summary */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-8 p-4 bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
                        <div className="flex items-center gap-2.5">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="font-extrabold text-slate-900 text-lg">5.0 / 5.0 Rating</span>
                        </div>
                        <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
                        <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-sm">
                            <FaCheckCircle className="w-4 h-4" /> 100% Genuine Reviews
                        </div>
                    </div>
                </div>

                {/* Beaver Google Reviews Widget Container */}
                <div className="w-full bg-white rounded-3xl p-5 md:p-8 border border-slate-100/90 shadow-[0_12px_40px_rgba(15,23,42,0.03)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                    {/* Top colored accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-orange-500 to-amber-500"></div>

                    {/* Spinner Overlay */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3">
                            <div className="w-9 h-9 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="text-sm font-bold text-slate-500">Loading Google Reviews...</p>
                        </div>
                    )}

                    {/* The Widget Wrapper */}
                    <div className="w-full min-h-[250px] overflow-hidden py-2">
                        <GoogleReviewsWidget instanceId="X6xj2UP39V8sptjsHG7Y" />
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="mt-12 text-center">
                    <a
                        href="https://www.google.com/search?q=i+next+ets&rlz=1C1UEAD_enIN1069IN1069&oq=i+ne&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIHCAEQABiABDIGCAIQRRg5MgoIAxAAGLEDGIAEMhAIBBAAGIMBGLEDGIAEGIoFMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg90gEIMzE5MWowajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x397c426995118ba1:0x5b7132b3422f2cfd,1,,,," // Default placeholder, user can configure their exact place ID
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-600 hover:to-indigo-600 text-white font-extrabold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
                    >
                        <FaGoogle className="w-4 h-4" />
                        Share Your Experience on Google
                        <FaExternalLinkAlt className="w-3.5 h-3.5 opacity-80" />
                    </a>
                </div>

            </div>
        </section>
    );
}