import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ banners }) {
    const { data, setData, post, processing, errors } = useForm({
        banner_id: "",
        title: "",
        icon: "",
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

        post("/card/store", {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">
                    Create Card
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    {/* Banner Select */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Select Banner
                        </label>
                        <select
                            value={data.banner_id}
                            onChange={(e) => setData("banner_id", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">-- Select Banner --</option>
                            {banners.map((banner) => (
                                <option key={banner.id} value={banner.id}>
                                    {banner.title}
                                </option>
                            ))}
                        </select>

                        {errors.banner_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.banner_id}
                            </div>
                        )}
                    </div>

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

                    {/* Icon */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Icon (FontAwesome class)
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. fa-solid fa-star"
                            value={data.icon}
                            onChange={(e) => setData("icon", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {/* Preview */}
                        {data.icon && (
                            <div className="mt-2 text-lg">
                                <i className={data.icon}></i>
                            </div>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Card Image
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

                    {/* Image Preview */}
                    {preview && (
                        <div>
                            <p className="text-sm mb-2">Preview:</p>
                            <img
                                src={preview}
                                className="h-32 w-full object-cover rounded-lg"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        {processing ? "Saving..." : "Save Card"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
