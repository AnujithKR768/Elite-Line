import React, { useEffect, useState, useCallback } from "react";
import AppLayout from "../Layout/AppLayout";
import { Link } from "@inertiajs/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Home({
    headers = [],
    legacy = [],
    philosophy = [],
    cards = [],
    whyChooseBanner = null,
    pricingPhilosophy = null,
    pricingPoints = []
}) {

    const slides = headers.length ? [...headers, headers[0]] : [];
    const [current, setCurrent] = useState(0);
    const [transition, setTransition] = useState(true);

    useEffect(() => {
        if (!headers.length) return;

        let interval;

        const start = () => {
            interval = setInterval(() => {
                setCurrent(prev => prev + 1);
                setTransition(true);
            }, 5000);
        };

        const stop = () => clearInterval(interval);

        const handleVisibility = () => {
            if (document.hidden) {
                stop();
            } else {
                setTransition(false);
                setCurrent(prev => (prev >= headers.length ? 0 : prev));

                requestAnimationFrame(() => {
                    setTransition(true);
                });

                start();
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        start();

        return () => {
            stop();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [headers]);

    const handleTransitionEnd = () => {
        if (current === headers.length) {
            requestAnimationFrame(() => {
                setTransition(false);
                setCurrent(0);
            });
        }
    };

    const nextSlide = () => {
        setCurrent(prev => prev + 1);
        setTransition(true);
    };

    const prevSlide = () => {
        if (current === 0) return;
        setCurrent(prev => prev - 1);
        setTransition(true);
    };

    const slide = slides[current] || {};

    const [index, setIndex] = useState(0);

    const totalCards = philosophy.length + 1;
    const visibleCards = 3;

    const next = useCallback(() => {
        if (index < totalCards - visibleCards) {
            setIndex(i => i + 1);
        }
    }, [index, totalCards]);

    const prev = useCallback(() => {
        if (index > 0) {
            setIndex(i => i - 1);
        }
    }, [index]);

    // FIX:  ANIMATION EVERY SLIDE
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        setAnimKey(prev => prev + 1);
    }, [current]);

    return (
        <div>

            {/* HERO */}
            <div className="relative w-full mt-20 md:mt-24 h-[60vh] md:h-[80vh] overflow-hidden flex items-center">

                {slides.length > 0 && (
                    <div
                        onTransitionEnd={handleTransitionEnd}
                        className="flex w-full transform-gpu will-change-transform"
                        style={{
                            transform: `translateX(-${current * 100}%)`,
                            transition: transition ? "transform 700ms ease-in-out" : "none",
                        }}
                    >
                        {slides.map((item, i) => (
                            <img
                                key={i}
                                src={`/storage/${item.image}`}
                                className="w-full h-[60vh] md:h-[80vh] object-cover flex-shrink-0"
                            />
                        ))}
                    </div>
                )}

                <div className="absolute inset-0 bg-black/40"></div>

                {/* TEXT */}
                <div
                    key={animKey}
                    className="absolute top-1/4 md:top-1/3 left-4 md:left-6 text-white z-10 max-w-xl"
                >

                    {/* TITLE */}
                    <h1
                        style={{
                            animation: "slideDown 0.7s ease 1s forwards",
                            opacity: 0
                        }}
                        className="text-2xl md:text-4xl font-bold text-orange-500"
                    >
                        {slide?.title}
                    </h1>

                    {/* SUBTITLE */}
                    <p
                        style={{
                            animation: "slideLeft 0.7s ease 2s forwards",
                            opacity: 0
                        }}
                        className="mt-4"
                    >
                        {slide?.subtitle}
                    </p>

                    <Link href="/learn-more" className="inline-block mt-6 bg-orange-500 px-6 py-3 rounded-full">
                        Learn More
                    </Link>
                </div>

                <button onClick={prevSlide} className="absolute left-4 top-1/2 text-white">
                    <FaChevronLeft />
                </button>

                <button onClick={nextSlide} className="absolute right-4 top-1/2 text-white">
                    <FaChevronRight />
                </button>
            </div>

            {/* 🔽 ALL YOUR OTHER SECTIONS — UNCHANGED 🔽 */}

            {/* LEGACY */}
            <div className="w-full py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative">
                        <div className="flex gap-6 transition-transform duration-500"
                            style={{ transform: `translateX(-${index * 340}px)` }}>

                            <div className="w-[320px] h-[320px] bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-center flex-shrink-0">
                                <h2 className="text-2xl font-bold mb-4">Our Legacy</h2>
                                <p className="text-gray-600 mb-3 text-sm">{legacy?.[0]?.paragraph}</p>
                                <p className="text-gray-600 mb-4 text-sm">{legacy?.[0]?.paragraph2}</p>
                                <button
                                    onClick={() => window.location.href = '/know-more'}
                                    className="mt-auto bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm"
                                >
                                    Know More
                                </button>
                            </div>

                            {philosophy.map((item, i) => (
                                <Link key={i} href={`/know-more?tab=${encodeURIComponent(item.title)}`}
                                    className="w-[320px] h-[320px] rounded-2xl overflow-hidden relative flex-shrink-0">
                                    <img src={`/storage/${item.image}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                    <div className="absolute bottom-5 left-5 text-orange-500">
                                        <h3 className="text-lg font-bold">{item.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/10 text-white p-3 rounded-full z-10">
                            <FaChevronLeft />
                        </button>

                        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/10 text-white p-3 rounded-full z-10">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* WHY CHOOSE US */}
            <div className="w-full py-24 bg-cover bg-center relative"
                style={{ backgroundImage: whyChooseBanner?.image ? `url(/storage/${whyChooseBanner.image})` : "none" }}>
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-12 inline-block px-4 py-2">
                        {whyChooseBanner?.title}
                    </h2>

                    <div className="flex justify-center gap-6 flex-wrap group">
                        {cards.map((card) => (
                            <div key={card.id} className="w-[180px] h-[240px] relative rounded-xl overflow-hidden transition duration-300 transform-gpu group-hover:opacity-40 hover:!opacity-100 hover:scale-110 hover:z-20">
                                <img src={`/storage/${card.image}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2">
                                    <i className={`${card.icon} text-2xl mb-2`}></i>
                                    <h3 className="text-xs font-semibold">{card.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* PRICING */}
            {pricingPhilosophy && (
                <div className="w-full py-20 bg-gray-100">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">{pricingPhilosophy.title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">{pricingPhilosophy.description}</p>

                        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
                            {pricingPoints.map((item) => (
                                <div key={item.id} className="bg-[#0b2545] px-4 py-3 rounded-lg flex gap-2 items-start">
                                    <span className="text-green-400 mt-1">•</span>
                                    <p className="text-white">{item.point}</p>
                                </div>
                            ))}
                        </div>

                        {pricingPhilosophy.footer && (
                            <p className="mt-10 text-gray-700 font-medium">
                                {pricingPhilosophy.footer}
                            </p>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

Home.layout = page => <AppLayout>{page}</AppLayout>;
