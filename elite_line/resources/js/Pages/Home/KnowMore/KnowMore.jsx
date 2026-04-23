import { useState, useEffect } from "react";
import AppLayout from "@/Pages/Layout/AppLayout";

export default function KnowMore({ philosophies = [], tab }) {

    const data = philosophies || [];
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (tab && data.length) {
            const index = data.findIndex(
                item => item.title.toLowerCase() === tab.toLowerCase()
            );
            if (index !== -1) setActiveTab(index);
        }
    }, [tab, data]);

    if (!data.length) {
        return <div className="min-h-screen flex justify-center items-center">No data</div>;
    }

    const current = data[activeTab];

    return (
        <div className="bg-white min-h-screen">

            {/* Banner */}
            <div className="h-[85vh] md:h-[95vh] lg:h-[100vh] overflow-hidden">
                <img
                    src={`/storage/${current.image}`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Tabs */}
            <div className="border-b">
                <div className="max-w-4xl mx-auto flex gap-6 px-6">

                    {data.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(index)}
                            className={activeTab === index ? "text-pink-500" : "text-gray-500"}
                        >
                            {item.title}
                        </button>
                    ))}

                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto text-center py-12 px-6">
                <h1 className="text-3xl font-bold">{current.title}</h1>
                <p className="mt-4 text-gray-600">{current.paragraph}</p>
                <p className="mt-4 text-gray-500">{current.paragraph2}</p>
            </div>

        </div>
    );
}

KnowMore.layout = page => <AppLayout>{page}</AppLayout>;
