import React from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "../Layout/AppLayout";

export default function Solution() {
    const { products } = usePage().props;
    const { solution } = usePage().props;
    const { automation } = usePage().props;
    const { quality } = usePage().props;

    return (
        <div className="pt-36 md:pt-40 pb-20 md:pb-28 px-6 md:px-12 bg-gray-100 min-h-screen">
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-16 text-center">
                PRODUCTS & SOLUTIONS
            </h1>

            {/* Grid */}
            <div className="max-w-7xl mx-auto space-y-20">
                {products && products.length > 0 ? (
                    products.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex flex-col md:flex-row items-center gap-12"
                        >
                            {/* LEFT */}
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                    {item.title}
                                </h2>

                                <h3 className="text-lg text-blue-600 font-semibold mb-4">
                                    {item.sub_title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* RIGHT */}
                            <div className="flex-1">
                                {item.image && (
                                    <img
                                        src={`/storage/${item.image}`}
                                        alt={item.title}
                                        className="w-full h-64 md:h-72 object-cover object-center rounded-2xl shadow-lg"
                                    />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No products available
                    </p>
                )}
            </div>

            {/* Solutions Section */}
            <div className="bg-white py-20 mt-24 rounded-2xl shadow-md">
                <div className="max-w-7xl mx-auto space-y-20 px-6 md:px-12">
                    {solution && solution.length > 0 ? (
                        solution.map((item, index) => (
                            <div
                                key={item.id}
                                className={`flex flex-col md:flex-row items-center gap-12 ${
                                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                }`}
                            >
                                {/* Left Content */}
                                <div className="flex-1">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                        {item.title}
                                    </h2>

                                    <h3 className="text-lg text-blue-600 font-semibold mb-4">
                                        {item.sub_title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Right Image */}
                                <div className="flex-1">
                                    {item.image && (
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title}
                                            className="w-full h-64 md:h-72 object-cover object-center rounded-2xl shadow-lg"
                                        />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No solutions available
                        </p>
                    )}
                </div>
            </div>

            {/* ===== AUTOMATION SYSTEMS ===== */}
            <div className="max-w-7xl mx-auto mt-24">
                {automation && automation.length > 0 ? (
                    <div className="space-y-12">
                        {automation.map((item, index) => {
                            const pointsArray =
                                typeof item.points === "string"
                                    ? item.points.split(",")
                                    : item.points;

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-md p-8 md:p-10 hover:shadow-xl transition duration-300"
                                >
                                    <div className="grid md:grid-cols-2 gap-10 items-start">

                                        {/* LEFT SIDE */}
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* RIGHT SIDE (POINTS) */}
                                        <div>
                                            <ul className="space-y-3">
                                                {pointsArray.map((point, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-3 text-gray-700"
                                                    >
                                                        <span className="text-blue-600 text-lg">✔</span>
                                                        <span>{point.trim()}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* FOOTER */}
                                    {item.footer && (
                                        <div className="mt-6 pt-4 border-t text-gray-500 text-sm">
                                            {item.footer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        No automation systems available
                    </p>
                )}
            </div>

           {/* Quality */}
            <div className="mt-28 bg-gray-200 py-16 px-6 md:px-12 rounded-2xl">
                {quality && quality.length > 0 ? (
                    quality.map((item) => (
                        <div key={item.id} className="max-w-5xl mx-auto text-center">
                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide">
                                {item.title}
                            </h2>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
                                {item.description}
                            </p>

                            {/* Points Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 justify-items-center">
                                {item.point &&
                                    item.point.map((p, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#0B2545] text-white px-6 py-4 rounded-xl text-left shadow-md hover:scale-105 transition duration-300 w-full max-w-sm"
                                        >
                                            <span className="text-green-400 mr-2">•</span>
                                            {p}
                                        </div>
                                    ))}
                            </div>

                            {/* Footer */}
                            <p className="text-gray-600 font-medium">
                                Each installation reflects our unwavering commitment to excellence.
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        No quality standards available
                    </p>
                )}
            </div>

        </div>
    );
}

// Layout
Solution.layout = (page) => <AppLayout>{page}</AppLayout>;
