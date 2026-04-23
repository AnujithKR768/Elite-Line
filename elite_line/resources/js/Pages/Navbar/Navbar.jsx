import { assets } from "@/assets/assets";
import React, { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    return (
        <header>
            <nav className="bg-white fixed top-0 w-full z-50 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">


                <div className="px-[5%] py-4 flex items-center">

                    {/* Logo (85px like reference) */}
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="ml-[40px]"
                    >
                        <img
                            src={assets.logo}
                            alt="Elite Line"
                            className="h-[85px] w-auto"
                        />
                    </Link>

                    {/* push menu right */}
                    <div className="flex-1"></div>

                    {/* Desktop Menu (exact typography) */}
                    <ul className="hidden md:flex items-center gap-8 mr-[40px]">
                        <li>
                            <Link
                                href="/"
                                className="text-[0.85rem] font-semibold uppercase text-[#0e213d] hover:text-blue-600 transition"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/our-company"
                                className="text-[0.85rem] font-semibold uppercase text-[#0e213d] hover:text-blue-600 transition"
                            >
                                Our Company
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/solutions"
                                className="text-[0.85rem] font-semibold uppercase text-[#0e213d] hover:text-blue-600 transition"
                            >
                                Solutions
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="text-[0.85rem] font-semibold uppercase text-[#0e213d] hover:text-blue-600 transition"
                            >
                                Service & Support
                            </Link>
                        </li>
                    </ul>

                    {/* mobile button */}
                    <button
                        className="md:hidden text-2xl mr-[20px]"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>
                </div>

                {/* mobile menu */}
                {open && (
                    <div className="md:hidden bg-white border-t">
                        <ul className="flex flex-col gap-4 text-base p-6">
                            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
                            <li><Link href="/our-company" onClick={closeMenu}>Our Company</Link></li>
                            <li><Link href="/solutions" onClick={closeMenu}>Solutions</Link></li>
                            <li><Link href="/contact" onClick={closeMenu}>Service & Support</Link></li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
