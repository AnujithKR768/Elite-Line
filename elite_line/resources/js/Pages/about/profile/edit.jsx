import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function edit({ profile }) {

    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: "put",
        company_name: profile?.company_name || "",
        intro: profile?.intro || "",
        description: profile?.description || "",
        expertise: profile?.expertise || [""],
        image: null,
    });

    // Expertise
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

    // Image preview
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

        // ❗ Remove image if not changed
        if (!data.image) {
            delete data.image;
        }

        post(`/Profile/update/${profile.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Company Profile" />

            <div className="p-6 max-w-4xl">
                <h1 className="text-2xl font-bold mb-6">
                    Edit Company Profile
                </h1>

                <form onSubmit={submit} className="space-y-5">

                    {/* Company Name */}
                    <input
                        type="text"
                        value={data.company_name}
                        onChange={(e) =>
                            setData("company_name", e.target.value)
                        }
                        className="w-full border p-2 rounded"
                    />

                    {/* Intro */}
                    <textarea
                        value={data.intro}
                        onChange={(e) =>
                            setData("intro", e.target.value)
                        }
                        className="w-full border p-2 rounded"
                    />

                    {/* Expertise */}
                    {data.expertise.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                value={item}
                                onChange={(e) =>
                                    handleExpertiseChange(index, e.target.value)
                                }
                                className="w-full border p-2 rounded"
                            />
                            <button type="button" onClick={() => removeField(index)}>
                                X
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addField}>
                        + Add More
                    </button>

                    {/* Description */}
                    <textarea
                        value={data.description}
                        onChange={(e) =>
                            setData("description", e.target.value)
                        }
                        className="w-full border p-2 rounded"
                    />

                    {/* Image */}
                    <input type="file" onChange={handleImage} />

                    {/* Old Image */}
                    {!preview && profile.image && (
                        <img
                            src={`/storage/${profile.image}`}
                            className="w-32 mt-2"
                        />
                    )}

                    {/* Preview */}
                    {preview && (
                        <img src={preview} className="w-32 mt-2" />
                    )}

                    <button disabled={processing}>
                        {processing ? "Updating..." : "Update"}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
