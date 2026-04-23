import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit() {
    const { product } = usePage().props;

    // Form setup with existing data
    const { data, setData, post, processing, errors } = useForm({
        title: product.title || "",
        description: product.description || "",
        image: null,
        _method: "put", // مهم for Laravel update
    });

    const [preview, setPreview] = React.useState(
        product.image ? `/storage/${product.image}` : null
    );

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

    // Submit update
    const submit = (e) => {
        e.preventDefault();

        post(`/product/update/${product.id}`, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: "Updated!",
                    text: "Product updated successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />

            <div className="p-6 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Edit Product</h2>

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
                            className="bg-green-600 text-white px-6 py-2 rounded"
                        >
                            {processing ? "Updating..." : "Update Product"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
