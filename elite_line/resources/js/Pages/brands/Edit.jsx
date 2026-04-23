import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit({ brand }) {

    const [values, setValues] = useState({
        title: brand.title || "",
        logo: null,
    });

    const [preview, setPreview] = useState(
        brand.logo ? `/storage/${brand.logo}` : null
    );

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "logo") {
            const file = files[0];
            setValues({ ...values, logo: file });

            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Update Brand?",
            text: "Do you want to save changes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {

                const formData = new FormData();

                // METHOD SPOOFING (IMPORTANT)
                formData.append("_method", "PUT");

                formData.append("title", values.title);

                if (values.logo) {
                    formData.append("logo", values.logo);
                }

                // USE POST (NOT PUT)
                router.post(`/brand/update/${brand.id}`, formData, {
                    forceFormData: true,

                    onSuccess: () => {
                        setErrors({});
                        Swal.fire({
                            icon: "success",
                            title: "Updated!",
                            text: "Brand updated successfully.",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },

                    onError: (err) => {
                        setErrors(err);
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "Please fix the errors.",
                        });
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg p-6">

                        <h2 className="text-xl font-semibold mb-4">
                            Edit Brand
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Title */}
                            <div>
                                <label className="block mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Logo */}
                            <div>
                                <label className="block mb-1">Logo</label>
                                <input
                                    type="file"
                                    name="logo"
                                    onChange={handleChange}
                                    className="w-full"
                                />
                                {errors.logo && (
                                    <p className="text-red-500 text-sm">
                                        {errors.logo}
                                    </p>
                                )}
                            </div>

                            {/* Preview */}
                            {preview && (
                                <div>
                                    <p className="text-sm mb-1">Preview:</p>
                                    <img
                                        src={preview}
                                        className="w-24 h-24 object-cover rounded"
                                        alt="Preview"
                                    />
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Update Brand
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
