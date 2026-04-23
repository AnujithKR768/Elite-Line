import React from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "../Layout/AppLayout";

export default function Service() {
    const { services } = usePage().props;
    const { industries } = usePage().props;
    const { contact } = usePage().props;

       return (
        <div className="bg-gray-100 min-h-screen">

            {/* ===== SERVICES SECTION ===== */}
            <div className="pt-36 md:pt-40 px-6 md:px-12 pb-24">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-14">
                    Industrial Door Systems
                </h1>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {services.length > 0 ? (
                        services.map((item) => (
                            <div
                                key={item.id}
                                className="relative group rounded-2xl overflow-hidden shadow-lg"
                            >
                                {/* Image */}
                                <img
                                    src={`/storage/${item.image}`}
                                    alt={item.title}
                                    className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-6">

                                    {/* Title */}
                                    <h2 className="text-lg md:text-xl font-bold text-orange-400 mb-3">
                                        {item.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-white text-sm md:text-base leading-relaxed">
                                        {item.description}
                                    </p>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">
                            No services available
                        </p>
                    )}

                </div>
            </div>

            {/* Industry */}

            <div className="px-6 md:px-12 pb-24">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-14">
                    Industries We Serve
                </h1>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {industries && industries.length > 0 ? (
                        industries.map((item) => {

                            const points = Array.isArray(item.points)
                                ? item.points
                                : JSON.parse(item.points || "[]");

                            return points.map((point, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="bg-[#0f2a44] text-white rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition duration-300 flex items-center gap-3"
                                >
                                    {/* Dot */}
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>

                                    {/* Text */}
                                    <p className="text-sm md:text-base">
                                        {point}
                                    </p>
                                </div>
                            ));
                        })
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">
                            No industries available
                        </p>
                    )}
                </div>
            </div>
            {/* Contact Section */}
            <div className="mt-24 px-6 md:px-12 pb-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                    {/* LEFT - MAP */}
                    <div className="h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-md">
                        {contact && contact.length > 0 ? (
                            <div
                                className="w-full h-full"
                                dangerouslySetInnerHTML={{ __html: contact[0].map_embed }}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                                No map available
                            </div>
                        )}
                    </div>

                    {/* RIGHT - CONTACT CARD */}
                    <div className="bg-gray-100 rounded-2xl shadow-md p-8 md:p-10 flex flex-col justify-center">

                        {contact && contact.length > 0 ? (
                            <>
                                {/* Title */}
                                <h2 className="text-3xl font-bold mb-6">
                                    Contact Us
                                </h2>

                                {/* Company */}
                                <p className="font-semibold text-lg mb-2">
                                    {contact[0].company_name}
                                </p>

                                {/* Address */}
                                <p className="text-gray-600 mb-1">
                                    {contact[0].office}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    {contact[0].address}
                                </p>

                                {/* Phone */}
                                <p className="flex items-center gap-2 mb-2 text-gray-700">
                                    📞 {contact[0].phone}
                                </p>

                                {/* Emails */}
                                <p className="flex items-center gap-2 mb-2 text-gray-700">
                                    ✉️ {contact[0].email}
                                </p>

                                {contact[0].email_secondary && (
                                    <p className="flex items-center gap-2 mb-2 text-gray-700">
                                        ✉️ {contact[0].email_secondary}
                                    </p>
                                )}

                                {/* Website */}
                                {contact[0].website && (
                                    <a
                                        href={`https://${contact[0].website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 mt-3 inline-block"
                                    >
                                        🌐 {contact[0].website}
                                    </a>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500">No contact data available</p>
                        )}
                    </div>

                </div>
            </div>

            {/* ===== SPACING DIVIDER ===== */}
            <div className="h-12 bg-gradient-to-b from-gray-200 to-transparent"></div>

        </div>
    );
}

// Layout wrapper
Service.layout = (page) => <AppLayout>{page}</AppLayout>;
