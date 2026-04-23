import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Create() {

    const {data, setData, post, processing, errors} = useForm({
        title: "",
        paragraph: "",
        paragraph2: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post("/Legacy/store");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Legacy" />

            {/* Page wrapper */}
            <div className="py-8">
                <div className="max-w-5xl mx-auto">

                    {/* Card */}
                    <div className="p-6">

                        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
                            Add Legacy
                        </h2>

                        <form onSubmit={submit} className="space-y-6">

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter title"
                                />

                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Paragraph */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Paragraph
                                </label>

                                <textarea
                                    rows={4}
                                    value={data.paragraph}
                                    onChange={(e) => setData("paragraph", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter paragraph"
                                ></textarea>

                                {errors.paragraph && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.paragraph}
                                    </p>
                                )}
                            </div>

                            {/* Paragraph 2 */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Paragraph 2
                                </label>

                                <textarea
                                    rows={4}
                                    value={data.paragraph2}
                                    onChange={(e) => setData("paragraph2", e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Enter paragraph"
                                ></textarea>

                                {errors.paragraph2 && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.paragraph2}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-4 pt-4">

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg font-medium shadow"
                                >
                                    Save Legacy
                                </button>

                                <a
                                    href="/Legacy"
                                    className="bg-gray-500 hover:bg-gray-600 transition text-white px-6 py-2 rounded-lg font-medium"
                                >
                                    Cancel
                                </a>

                            </div>

                        </form>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
