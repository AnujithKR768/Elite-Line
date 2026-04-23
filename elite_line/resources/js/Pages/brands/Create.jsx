import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { router, Link } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create() {
    const [values, setValues] = useState({
        title: "",
        logo: null,
    });

    const [preview, setPreview] = useState(null);
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
            title: "Save Brand?",
            text: "Do you want to add this brand?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, save it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("logo", values.logo);

                router.post("/brand/store", formData, {
                    forceFormData: true,

                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Saved!",
                            text: "Brand created successfully.",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },

                    onError: (err) => {
                        setErrors(err);

                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "Please fix the errors and try again.",
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
                            Add Brand
                        </h2>



                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Title */}
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Logo Upload */}
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Logo
                                </label>
                                <input
                                    type="file"
                                    name="logo"
                                    accept="image/*"
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
                                    <p className="text-sm text-gray-600 mb-1">
                                        Preview:
                                    </p>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                </div>
                            )}

                            {/* Submit */}
                            <div>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Save Brand
                                </button>

                                <Link
                                    href="/brand"
                                    className="text-blue-500 hover:text-blue-700 ml-4"
                                >
                                     Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
