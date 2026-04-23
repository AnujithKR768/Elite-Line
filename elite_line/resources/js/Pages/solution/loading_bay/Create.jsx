import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        sub_title: "",
        description: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

    // Image preview
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

        post("/loading-solutions/store", {
            forceFormData: true, // required for image upload
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Loading Solution created successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                reset();
                setPreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 md:p-10 bg-gray-100 min-h-screen">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Add Loading Solution
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Create a new loading bay & dock solution entry
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
                                placeholder="Enter title"
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
                                placeholder="Enter sub title"
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
                                placeholder="Enter description"
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
                                {processing ? "Saving..." : "Save"}
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
