import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function Edit({ learnmore }) {

    const { data, setData, post, processing, errors } = useForm({
        title: learnmore.title || "",
        subtitle: learnmore.subtitle || "",
        description: learnmore.description || "",
        location: learnmore.location || "",
        phone: learnmore.phone || "",
        email: learnmore.email || "",
        image: null,
        _method: "put" // important for update
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/LearnMore/Update/${learnmore.id}`);
    };

    return (
        <AuthenticatedLayout>

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white shadow-sm sm:rounded-lg p-6">

                        <h2 className="text-xl font-semibold mb-6">
                            Edit Learn More
                        </h2>

                        <form onSubmit={submit} className="space-y-4">

                            {/* Current Image */}
                            {learnmore.image && (
                                <div>
                                    <label className="block mb-1">Current Image</label>
                                    <img
                                    src={`/storage/${learnmore.image}`}
                                    className="w-20 h-14 object-cover rounded border"
                                />
                                </div>
                            )}

                            {/* New Image */}
                            <div>
                                <label className="block mb-1">Change Image</label>
                                <input
                                    type="file"
                                    onChange={e => setData("image", e.target.files[0])}
                                    className="w-full"
                                />
                                {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                            </div>


                            {/* Title */}
                            <div>
                                <label className="block mb-1">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData("title", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block mb-1">Subtitle</label>
                                <input
                                    type="text"
                                    value={data.subtitle}
                                    onChange={e => setData("subtitle", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.subtitle && <div className="text-red-500 text-sm">{errors.subtitle}</div>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block mb-1">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData("description", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    rows="4"
                                />
                                {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block mb-1">Location</label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={e => setData("location", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData("phone", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData("email", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>
                            {/* Submit */}
                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Update Legacy
                                </button>

                                <a
                                    href="/Learn-More"
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </a>
                            </div>

                        </form>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
