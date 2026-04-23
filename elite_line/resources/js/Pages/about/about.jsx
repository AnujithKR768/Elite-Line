import { Head, usePage } from "@inertiajs/react";
import AppLayout from "../Layout/AppLayout";

export default function About() {

    const {
        profile = [],
        missionvision = [],
        coreprinciple = [],
        corepoint = [],
        engineeringsection = [],
        engineeringpoint = [],
    } = usePage().props;

    return (
        // ✅ FIXED: added proper top & bottom spacing
        <div className="pt-44 pb-32 space-y-28">

            <Head title="About Us" />

            {/* ================= COMPANY PROFILE ================= */}
            {profile.map((p) => (
                <section key={p.id} className="px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <h1 className="text-4xl font-bold mb-5">
                            {p.company_name}
                        </h1>

                        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                            {p.intro}
                        </p>

                        <ul className="space-y-2 text-gray-700">
                            {(Array.isArray(p.expertise)
                                ? p.expertise
                                : p.expertise?.split("\n") || []
                            ).map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-blue-600">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex justify-end">
                        {p.image && (
                            <img
                                src={`/storage/${p.image}`}
                                className="w-full max-w-[650px] rounded-xl shadow-xl"
                            />
                        )}
                    </div>

                </section>
            ))}

            {/* ================= MISSION ================= */}
            {missionvision.filter(i => i.type === "mission").map((m) => (
                <section key={m.id} className="bg-blue-900 text-white py-24">

                    <div className="px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

                        {/* IMAGE */}
                        <div className="flex justify-end">
                            {m.image && (
                                <img
                                    src={`/storage/${m.image}`}
                                    className="w-full max-w-[650px] rounded-xl shadow-xl"
                                />
                            )}
                        </div>

                        {/* TEXT */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">
                                {m.title || "Our Mission"}
                            </h2>

                            <p className="text-gray-200 leading-relaxed text-lg max-w-lg">
                                {m.description}
                            </p>
                        </div>

                    </div>

                </section>
            ))}

            {/* ================= VISION ================= */}
            {missionvision.filter(i => i.type === "vision").map((v) => (
                <section key={v.id} className="bg-gray-100 py-24">

                    <div className="px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

                        {/* TEXT */}
                        <div className="flex flex-col justify-center items-start">
                            <h2 className="text-3xl font-bold mb-4">
                                {v.title || "Our Vision"}
                            </h2>

                            <p className="text-gray-600 leading-relaxed text-lg max-w-lg">
                                {v.description}
                            </p>
                        </div>

                        {/* IMAGE */}
                        <div className="flex justify-start">
                            {v.image && (
                                <img
                                    src={`/storage/${v.image}`}
                                    className="w-full max-w-[650px] rounded-xl shadow-xl"
                                />
                            )}
                        </div>

                    </div>

                </section>
            ))}

            {/* ================= CORE PRINCIPLES ================= */}
            {coreprinciple.map((cp) => (
                <section key={cp.id} className="text-center max-w-5xl mx-auto px-6">

                    <h2 className="text-3xl font-bold mb-5 uppercase">
                        {cp.title}
                    </h2>

                    <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                        {cp.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {corepoint
                            .filter(p => p.section_id === cp.id)
                            .map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-blue-900 text-white px-6 py-4 rounded-xl shadow-md text-left"
                                >
                                    • {p.point}
                                </div>
                            ))}
                    </div>

                </section>
            ))}

            {/* ================= ENGINEERING ================= */}
            {engineeringsection.map((es) => (
                <section key={es.id} className="text-center max-w-5xl mx-auto px-6">

                    <h2 className="text-3xl font-bold mb-5 uppercase">
                        {es.title}
                    </h2>

                    <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                        {es.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {engineeringpoint
                            .filter(p => p.section_id === es.id)
                            .map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-blue-900 text-white px-6 py-4 rounded-xl shadow-md text-left"
                                >
                                    • {p.point}
                                </div>
                            ))}
                    </div>

                </section>
            ))}

        </div>
    );
}

About.layout = page => <AppLayout>{page}</AppLayout>;
