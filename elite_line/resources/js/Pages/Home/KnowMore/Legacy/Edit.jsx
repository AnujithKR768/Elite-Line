import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { FaParagraph } from "react-icons/fa";

export default function Edit({ legacy }) {
    const { data, setData, post, processing, errors } = useForm({
        title: legacy.title || "",
        paragraph: legacy.paragraph || "",
        paragraph2: legacy.paragraph2 || "",
        _method: "put",
    });
    const submit = (e) => {
    e.preventDefault();
    post(route('Legacy.update', legacy.id));
    }
    return(
        <AuthenticatedLayout>
            <Head title="Edit Legacy" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold">Edit Legacy</h2>
                        <form onSubmit={submit} className="space-y-6">

                            {/* Title */}

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Paragraph */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Paragraph
                                </label>
                                <textarea
                                    value={data.paragraph}
                                    onChange={(e) => setData("paragraph", e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                                {errors.paragraph && (
                                    <p className="text-red-500 text-sm">
                                        {errors.paragraph}
                                    </p>
                                )}
                            </div>

                            {/* Paragraph 2 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Paragraph 2
                                </label>
                                <textarea
                                    value={data.paragraph2}
                                    onChange={(e) => setData("paragraph2", e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />
                                {errors.paragraph2 && (
                                    <p className="text-red-500 text-sm">
                                        {errors.paragraph2}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Update Legacy
                                </button>

                                <a
                                    href="/Legacy"
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
