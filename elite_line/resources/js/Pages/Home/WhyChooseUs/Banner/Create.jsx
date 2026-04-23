import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post("/banner/store", {
            forceFormData: true, // required for file upload
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">
                    Create Banner
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.title && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Background Image
                        </label>

                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full"
                        />

                        {errors.image && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.image}
                            </div>
                        )}
                    </div>

                    {/* Preview */}
                    {preview && (
                        <div>
                            <p className="text-sm mb-2">Preview:</p>
                            <img
                                src={preview}
                                className="h-40 w-full object-cover rounded-lg"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        {processing ? "Saving..." : "Add Banner"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
