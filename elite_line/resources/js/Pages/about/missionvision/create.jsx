import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Create() {

    const [preview, setPreview] = useState(null);
    const [type, setType] = useState("mission");

    // Get type from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get("type");
        if (t) setType(t);
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        type: type,
        title: "",
        description: "",
        image: null,
    });

    // Sync type with form
    useEffect(() => {
        setData("type", type);
    }, [type]);

    // Handle Image
    const handleImage = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    // Submit
    const submit = (e) => {
        e.preventDefault();
        post("/mission-vision/store");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Mission / Vision" />

            <div className="p-6 max-w-3xl">

                <h1 className="text-2xl font-bold mb-6">
                    Add {type === "mission" ? "Mission" : "Vision"}
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    {/* Type */}
                    <div>
                        <label className="block mb-1 font-medium">Type</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            <option value="mission">Mission</option>
                            <option value="vision">Vision</option>
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Enter title"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border p-2 rounded"
                            rows="5"
                            placeholder="Enter description"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-1 font-medium">Image</label>
                        <input
                            type="file"
                            onChange={handleImage}
                            className="w-full border p-2 rounded"
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 w-32 h-24 object-cover rounded"
                            />
                        )}

                        {errors.image && (
                            <p className="text-red-500 text-sm">{errors.image}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        {processing ? "Saving..." : "Save"}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
