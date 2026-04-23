import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create() {
    // Inertia form
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        image: null,
    });

    const [preview, setPreview] = React.useState(null);

    // Handle input
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            const file = files[0];
            setData("image", file);

            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setData(name, value);
        }
    };

    // Submit
    const submit = (e) => {
        e.preventDefault();

        post("/product/store", {
            forceFormData: true, // required for file upload
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Product created successfully!",
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
            <Head title="Add Product" />

            <div className="p-6 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Product</h2>

                    <Link
                        href="/product"
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded shadow space-y-4"
                >
                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows="4"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="w-full"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">
                                {errors.image}
                            </p>
                        )}

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded"
                            />
                        )}
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded"
                        >
                            {processing ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
