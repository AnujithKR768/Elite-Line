import AppLayout from "@/Pages/Layout/AppLayout";

export default function LearnMore({ learnmore }) {
    const data = learnmore || [];
    const firstItem = data.length > 0 ? data[0] : null;

    return (
        <div className="min-h-screen bg-gray-100">

            {/* image */}
            {firstItem?.image && (
                <div className="relative w-full h-[500px] md:h-[650px]">
                    <img
                        src={`/storage/${firstItem.image}`}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Content Section */}
            <div className="py-16 px-6">
                <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-8">

                    {data.length > 0 ? (
                        data.map((item) => (
                            <div key={item.id} className="mb-12">

                                {/* Title */}
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                    {item.title}
                                </h2>

                                {/* Subtitle */}
                                <p className="text-lg text-gray-600 mb-4">
                                    {item.subtitle}
                                </p>

                                {/* Description */}
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    {item.description}
                                </p>

                                {/* Contact Section */}
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700">
                                    {item.location && <p>📍 {item.location}</p>}
                                    {item.phone && <p>📞 {item.phone}</p>}
                                    {item.email && <p>📧 {item.email}</p>}
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No data available
                        </p>
                    )}

                </div>
            </div>

        </div>
    );
}

LearnMore.layout = (page) => <AppLayout>{page}</AppLayout>;
