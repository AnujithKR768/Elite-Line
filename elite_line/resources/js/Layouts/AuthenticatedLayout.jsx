import { assets } from '@/assets/assets';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();

    const safeUrl = url || "";
    const user = auth?.user;

    const permissions = user?.permissions ?? [];
    const isAdmin = user?.role?.toLowerCase() === "admin";

    const hasPermission = (perm) => {
        return isAdmin || permissions.includes(perm);
    };

    const canHome = hasPermission("home");
    const canAbout = hasPermission("about");
    const canSolution = hasPermission("solution");
    const canService = hasPermission("service");
    const canKnowMore = hasPermission("know_more");
    const canWhyChooseUs = hasPermission("why_choose_us");
    const canUsers = hasPermission("users");
    const canBrand = hasPermission("brand");

    const [openHome, setOpenHome] = useState(false);
    const [openAbout, setOpenAbout] = useState(false);
    const [openSolution, setOpenSolution] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [openKnowMore, setOpenKnowMore] = useState(false);
    const [openWhyChooseUs, setOpenWhyChooseUs] = useState(false);

    const activeClass = "bg-blue-600 text-white";
    const normalClass = "text-gray-700 hover:bg-gray-100";

    //  helper for links (ONLY ADDED)
    const linkClass = (path) =>
        `block px-3 py-2 text-sm rounded ${
            safeUrl === path ? activeClass : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-white border-r hidden md:block">

                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <img src={assets.logo} className="h-10 w-16" />
                        <span className="font-bold text-lg">Elite Line</span>
                    </Link>
                </div>

                <nav className="p-4 space-y-1">

                    {/* Dashboard */}
                    <Link href={route('dashboard')}
                        className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                            route().current('dashboard') ? activeClass : normalClass
                        }`}>
                        Dashboard
                    </Link>

                    {/* Quotes */}
                    <Link href="/quote"
                        className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                        safeUrl.startsWith("/quote") ? activeClass : normalClass
                    }`}>
                        Quotes
                    </Link>

                    {/* Users */}
                    {canUsers && (
                        <Link href="/users"
                            className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                            safeUrl.startsWith("/users") ? activeClass : normalClass
                        }`}>
                            Users
                        </Link>
                    )}

                    {/* HOME */}
                    {canHome && (
                        <>
                            <button
                                onClick={() => setOpenHome(!openHome)}
                                className={`w-full flex justify-between items-center px-4 py-2 rounded-lg text-sm font-medium ${
                                    safeUrl.startsWith("/Header") ||
                                    safeUrl.startsWith("/Learn-More") ||
                                    safeUrl.startsWith("/Legacy") ||
                                    safeUrl.startsWith("/our-philosophy") ||
                                    safeUrl.startsWith("/banner") ||
                                    safeUrl.startsWith("/card")
                                        ? activeClass : normalClass
                                }`}
                            >
                                <span>Home</span>
                                <span>{openHome ? "▲" : "▼"}</span>
                            </button>

                            {openHome && (
                                <div className="ml-4 space-y-1">
                                    <Link href="/Header" className={linkClass("/Header")}>
                                        Header
                                    </Link>

                                    <Link href="/Learn-More" className={linkClass("/Learn-More")}>
                                        Learn More
                                    </Link>

                                    {canKnowMore && (
                                        <>
                                            <button
                                                onClick={() => setOpenKnowMore(!openKnowMore)}
                                                className="w-full flex justify-between px-3 py-2 text-sm hover:bg-gray-100"
                                            >
                                                <span>Know More</span>
                                                <span>{openKnowMore ? "▲" : "▼"}</span>
                                            </button>

                                            {openKnowMore && (
                                                <div className="ml-4">
                                                    <Link href="/Legacy" className={linkClass("/Legacy")}>
                                                        Legacy
                                                    </Link>
                                                    <Link href="/our-philosophy" className={linkClass("/our-philosophy")}>
                                                        Philosophy
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {canWhyChooseUs && (
                                        <>
                                            <button
                                                onClick={() => setOpenWhyChooseUs(!openWhyChooseUs)}
                                                className="w-full flex justify-between px-3 py-2 text-sm hover:bg-gray-100"
                                            >
                                                <span>Why Choose Us</span>
                                                <span>{openWhyChooseUs ? "▲" : "▼"}</span>
                                            </button>

                                            {openWhyChooseUs && (
                                                <div className="ml-4">
                                                    <Link href="/banner" className={linkClass("/banner")}>
                                                        Banner
                                                    </Link>
                                                    <Link href="/card" className={linkClass("/card")}>
                                                        Cards
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* ABOUT */}
                    {canAbout && (
                        <>
                            <button
                                onClick={() => setOpenAbout(!openAbout)}
                                className={`w-full flex justify-between px-4 py-2 rounded-lg text-sm font-medium ${
                                    safeUrl.startsWith("/Profile") ||
                                    safeUrl.startsWith("/mission-vision") ||
                                    safeUrl.startsWith("/core-principle")
                                        ? activeClass : normalClass
                                }`}
                            >
                                <span>About</span>
                                <span>{openAbout ? "▲" : "▼"}</span>
                            </button>

                            {openAbout && (
                                <div className="ml-4 space-y-1">
                                    <Link href="/Profile" className={linkClass("/Profile")}>Profile</Link>
                                    <Link href="/mission-vision" className={linkClass("/mission-vision")}>Mission Vision</Link>
                                    <Link href="/core-principle" className={linkClass("/core-principle")}>Core Principles</Link>
                                </div>
                            )}
                        </>
                    )}

                    {/* SOLUTION */}
                    {canSolution && (
                        <>
                            <button
                                onClick={() => setOpenSolution(!openSolution)}
                                className={`w-full flex justify-between px-4 py-2 rounded-lg text-sm font-medium ${
                                    safeUrl.startsWith("/product") ||
                                    safeUrl.startsWith("/loading-bay") ||
                                    safeUrl.startsWith("/automation") ||
                                    safeUrl.startsWith("/quality")
                                        ? activeClass : normalClass
                                }`}
                            >
                                <span>Solution</span>
                                <span>{openSolution ? "▲" : "▼"}</span>
                            </button>

                            {openSolution && (
                                <div className="ml-4 space-y-1">
                                    <Link href="/product" className={linkClass("/product")}>Product</Link>
                                    <Link href="/loading-bay" className={linkClass("/loading-bay")}>Loading Bay</Link>
                                    <Link href="/automation" className={linkClass("/automation")}>Automation</Link>
                                    <Link href="/quality" className={linkClass("/quality")}>Quality</Link>
                                </div>
                            )}
                        </>
                    )}

                    {/* SERVICE */}
                    {canService && (
                        <>
                            <button
                                onClick={() => setOpenService(!openService)}
                                className={`w-full flex justify-between px-4 py-2 rounded-lg text-sm font-medium ${
                                    safeUrl.startsWith("/service") ||
                                    safeUrl.startsWith("/industry") ||
                                    safeUrl.startsWith("/contact-support")
                                        ? activeClass : normalClass
                                }`}
                            >
                                <span>Service</span>
                                <span>{openService ? "▲" : "▼"}</span>
                            </button>

                            {openService && (
                                <div className="ml-4 space-y-1">
                                    <Link href="/service" className={linkClass("/service")}>Service</Link>
                                    <Link href="/industry" className={linkClass("/industry")}>Industry</Link>
                                    <Link href="/contact-support" className={linkClass("/contact-support")}>Support</Link>
                                </div>
                            )}
                        </>
                    )}
                    <Link href="/brand"
                        className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                        safeUrl.startsWith("/brand") ? activeClass : normalClass
                    }`}>
                        Brand
                    </Link>

                </nav>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col">
                <div className="bg-white border-b h-16 flex justify-between items-center px-6">
                    <h1 className="text-lg font-semibold">Dashboard</h1>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>{user?.name}</button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Logout
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
