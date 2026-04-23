import React, { useState } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit() {
    const { solutions } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: solutions.title || "",
        sub_title: solutions.sub_title || "",
        description: solutions.description || "",
        image: null,
        _method: "put", // important for Laravel update
    });

    const [preview, setPreview] = useState(
        solutions.image ? `/storage/${solutions.image}` : null
    );

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        post(`/loading-solutions/edit/${solutions.id}`, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Updated!",
                    text: "Loading Solution updated successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 md:p-10 bg-gray-100 min-h-screen">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Edit Loading Solution
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Update your loading bay & dock solution
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow p-6 md:p-8 max-w-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Sub Title */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Sub Title
                            </label>
                            <input
                                type="text"
                                value={data.sub_title}
                                onChange={(e) => setData("sub_title", e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.sub_title && (
                                <p className="text-red-500 text-sm mt-1">{errors.sub_title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                rows="4"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            ></textarea>
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Image
                            </label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full"
                            />

                            {preview && (
                                <div className="mt-4">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-40 h-28 object-cover rounded-lg border"
                                    />
                                </div>
                            )}

                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
                            >
                                {processing ? "Updating..." : "Update"}
                            </button>

                            <Link
                                href="/loading-solutions"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
