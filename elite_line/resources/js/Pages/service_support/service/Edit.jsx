import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit() {
    const { service } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: service.title || "",
        description: service.description || "",
        image: null,
        _method: "put", // important for Laravel update
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(`/services/update/${service.id}`, {
            onSuccess: () => {
                Swal.fire({
                    title: "Updated!",
                    text: "Service updated successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="pt-24 px-6 md:px-12 pb-12 bg-gray-100 min-h-screen">

                {/* Header */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    Edit Service
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

                    {/* Current Image */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Current Image
                        </label>
                        {service.image ? (
                            <img
                                src={`/storage/${service.image}`}
                                alt={service.title}
                                className="w-24 h-24 object-cover rounded mb-3"
                            />
                        ) : (
                            <p className="text-gray-400 text-sm mb-2">
                                No image available
                            </p>
                        )}
                    </div>

                    {/* New Image */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Change Image
                        </label>
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
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                        >
                            {processing ? "Updating..." : "Update Service"}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
