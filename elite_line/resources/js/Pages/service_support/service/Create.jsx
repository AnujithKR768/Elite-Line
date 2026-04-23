import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const { data, setData, post, reset, processing, errors } = useForm({
        title: "",
        description: "",
        image: null,
    });

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        post("/services/store", {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Service created successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="pt-24 px-6 md:px-12 pb-12 bg-gray-100 min-h-screen">

                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    Create Service
                </h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow space-y-6 max-w-2xl"
                >
                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-medium">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows="5"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-2 font-medium">Image</label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            className="w-full"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                        >
                            {processing ? "Saving..." : "Save Service"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
