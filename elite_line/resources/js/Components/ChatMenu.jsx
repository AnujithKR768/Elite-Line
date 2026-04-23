import { useState } from "react";
import {
    FaWhatsapp,
    FaPhoneAlt,
    FaComments,
    FaFileAlt,
    FaTimes,
} from "react-icons/fa";
import { usePage } from "@inertiajs/react";

export default function ChatMenu() {
    const [open, setOpen] = useState(false);
    const { whatsapp, phone } = usePage().props;

    //Clean number (removes +, spaces, etc.)
    const cleanNumber = (num) => (num || "").replace(/\D/g, "");

    const whatsappUrl = `https://wa.me/${cleanNumber(
        whatsapp?.number
    )}?text=${encodeURIComponent(
        whatsapp?.message ||
            "Hello, I would like to request a consultation."
    )}`;

    const phoneUrl = `tel:${cleanNumber(phone?.number)}`;

    const menuItems = [
        {
            href: phoneUrl,
            label: "Call",
            icon: <FaPhoneAlt />,
            bg: "bg-blue-500 hover:bg-blue-600",
        },
        {
            href: whatsappUrl,
            label: "WhatsApp",
            icon: <FaWhatsapp />,
            bg: "bg-green-500 hover:bg-green-600",
            target: "_blank",
        },
        {
            href: "/quote-request",
            label: "Get Quote",
            icon: <FaFileAlt />,
            bg: "bg-orange-500 hover:bg-orange-600",
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* 🔹 Expandable Buttons */}
            <div className="flex flex-col items-end gap-3 mb-3">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        target={item.target}
                        rel="noopener noreferrer"
                        className={`
                            flex items-center gap-2 text-white px-4 py-3 rounded-full shadow-lg
                            transform transition-all duration-300 ease-out
                            ${item.bg}
                            ${
                                open
                                    ? "opacity-100 translate-y-0 scale-100"
                                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                            }
                        `}
                        style={{
                            transitionDelay: open
                                ? `${index * 70}ms`
                                : `${(menuItems.length - index) * 50}ms`,
                        }}
                    >
                        {item.icon}
                        <span className="text-sm font-medium">
                            {item.label}
                        </span>
                    </a>
                ))}
            </div>

            {/* 🔹 Main Chat Button */}
            <button
                onClick={() => setOpen(!open)}
                className={`
                    relative bg-gray-900 hover:bg-black text-white p-4 rounded-full shadow-xl
                    transition-all duration-300 ease-in-out
                    active:scale-95
                `}
                aria-label="Open chat menu"
            >
                {/* Icon swap with rotation */}
                <span
                    className={`
                        absolute inset-0 flex items-center justify-center
                        transition-all duration-300
                        ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}
                    `}
                >
                    <FaComments size={24} />
                </span>

                <span
                    className={`
                        flex items-center justify-center
                        transition-all duration-300
                        ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}
                    `}
                >
                    <FaTimes size={24} />
                </span>
            </button>
        </div>
    );
}
