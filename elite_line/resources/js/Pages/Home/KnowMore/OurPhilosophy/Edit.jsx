import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ philosophy }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "put",
        image: null,
        title: philosophy.title || "",
        paragraph: philosophy.paragraph || "",
        paragraph2: philosophy.paragraph2 || "",
    });

    const [preview, setPreview] = useState(
        philosophy.image ? `/storage/${philosophy.image}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/Philosophy/Update/${philosophy.id}`);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Edit Philosophy</h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Image Upload */}
                    <div>
                        <label className="block font-medium mb-2">Image</label>

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-40 h-40 object-cover rounded mb-3 border"
                            />
                        )}

                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="block w-full border rounded p-2"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image}</p>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block font-medium mb-2">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title}</p>
                        )}
                    </div>

                    {/* Paragraph 1 */}
                    <div>
                        <label className="block font-medium mb-2">
                            Paragraph 1
                        </label>
                        <textarea
                            value={data.paragraph}
                            onChange={(e) => setData("paragraph", e.target.value)}
                            className="w-full border rounded p-2 h-32"
                        />
                        {errors.paragraph && (
                            <p className="text-red-500 text-sm">
                                {errors.paragraph}
                            </p>
                        )}
                    </div>

                    {/* Paragraph 2 */}
                    <div>
                        <label className="block font-medium mb-2">
                            Paragraph 2
                        </label>
                        <textarea
                            value={data.paragraph2}
                            onChange={(e) =>
                                setData("paragraph2", e.target.value)
                            }
                            className="w-full border rounded p-2 h-32"
                        />
                        {errors.paragraph2 && (
                            <p className="text-red-500 text-sm">
                                {errors.paragraph2}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                        >
                            {processing ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
