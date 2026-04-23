import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function create() {

    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        company_name: "",
        intro: "",
        description: "",
        expertise: [""],
        image: null,
    });

    // Handle Expertise Change
    const handleExpertiseChange = (index, value) => {
        const updated = [...data.expertise];
        updated[index] = value;
        setData("expertise", updated);
    };

    const addField = () => {
        setData("expertise", [...data.expertise, ""]);
    };

    const removeField = (index) => {
        if (data.expertise.length === 1) return;
        const updated = data.expertise.filter((_, i) => i !== index);
        setData("expertise", updated);
    };

    // Handle Image Upload + Preview
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
        post("/Profile/store");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Company Profile" />

            <div className="p-6 max-w-4xl">

                <h1 className="text-2xl font-bold mb-6">
                    Create Company Profile
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    {/* Company Name */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Company Name
                        </label>
                        <input
                            type="text"
                            value={data.company_name}
                            onChange={(e) =>
                                setData("company_name", e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                        {errors.company_name && (
                            <p className="text-red-500 text-sm">
                                {errors.company_name}
                            </p>
                        )}
                    </div>

                    {/* Intro */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Intro
                        </label>
                        <textarea
                            value={data.intro}
                            onChange={(e) =>
                                setData("intro", e.target.value)
                            }
                            className="w-full border p-2 rounded"
                            rows="4"
                        />
                    </div>

                    {/* Expertise */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Expertise
                        </label>

                        {data.expertise.map((item, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) =>
                                        handleExpertiseChange(index, e.target.value)
                                    }
                                    className="w-full border p-2 rounded"
                                    placeholder={`Expertise ${index + 1}`}
                                />

                                <button
                                    type="button"
                                    onClick={() => removeField(index)}
                                    className="bg-red-500 text-white px-3 rounded"
                                >
                                    X
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addField}
                            className="bg-gray-200 px-3 py-1 rounded"
                        >
                            + Add More
                        </button>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full border p-2 rounded"
                            rows="5"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Company Image
                        </label>
                        <input
                            type="file"
                            onChange={handleImage}
                            className="w-full border p-2 rounded"
                        />

                        {/* Preview */}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 w-32 h-32 object-cover rounded"
                            />
                        )}

                        {errors.image && (
                            <p className="text-red-500 text-sm">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        {processing ? "Saving..." : "Save Profile"}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
