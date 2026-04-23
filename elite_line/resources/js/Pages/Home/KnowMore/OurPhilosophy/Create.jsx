import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        image: null,
        title: "",
        paragraph: "",
        paragraph2: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/Philosophy/store");
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white shadow-sm sm:rounded-lg p-6">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Add Philosophy</h2>

                            <Link
                                href="/our-philosophy"
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Back
                            </Link>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} encType="multipart/form-data">

                            {/* Image */}
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.image && <div className="text-red-500">{errors.image}</div>}
                            </div>

                            {/* Title */}
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.title && <div className="text-red-500">{errors.title}</div>}
                            </div>

                            {/* Paragraph */}
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Paragraph</label>
                                <textarea
                                    value={data.paragraph}
                                    onChange={(e) => setData("paragraph", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    rows="4"
                                />
                                {errors.paragraph && <div className="text-red-500">{errors.paragraph}</div>}
                            </div>

                            {/* Paragraph 2 */}
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Paragraph 2</label>
                                <textarea
                                    value={data.paragraph2}
                                    onChange={(e) => setData("paragraph2", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    rows="4"
                                />
                                {errors.paragraph2 && <div className="text-red-500">{errors.paragraph2}</div>}
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                                >
                                    {processing ? "Saving..." : "Save"}
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
