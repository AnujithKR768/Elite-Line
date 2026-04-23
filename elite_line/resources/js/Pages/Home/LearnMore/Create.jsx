import React from "react";
import { useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {

     const{ data, setData, post, processing, errors} = useForm({
            title: "",
            subtitle: "",
            description: "",
            location: "",
            phone: "",
            email: "",
            image: ""
        })

        const submit = (e) => {
            e.preventDefault();
            post("/LearnMore/store");
        }

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Add Learn More</h2>
                            <Link
                                href="/Learn-More"
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Back
                            </Link>
                        </div>

                        <form onSubmit={submit} encType="multipart/form-data">
                            {/* Title */}
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.title && <div className="text-red-500">{errors.title}</div>}
                            </div>

                             {/* Subtitle */}
                             <div className="mb-4">
                                <label className="block mb-1 font-medium">Subtitle</label>
                                <input
                                    type="text"
                                    value={data.subtitle}
                                    onChange={(e) => setData("subtitle", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.subtitle && <div className="text-red-500">{errors.subtitle}</div>}
                            </div>

                             {/* Description */}
                             <div className="mb-4">
                                <label className="block mb-1 font-medium">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                ></textarea>
                                {errors.description && <div className="text-red-500">{errors.description}</div>}
                            </div>

                             {/* Location */}
                             <div className="mb-4">
                                <label className="block mb-1 font-medium">Location</label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData("location", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.location && <div className="text-red-500">{errors.location}</div>}
                            </div>

                             {/* Phone */}
                             <div className="mb-4">
                                <label className="block mb-1 font-medium">Phone</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.phone && <div className="text-red-500">{errors.phone}</div>}
                            </div>

                             {/* Email */}
                                <div className="mb-4">
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.email && <div className="text-red-500">{errors.email}</div>}
                            </div>

                             {/* Image */}
                             <div className="mb-4">
                                <label className="block mb-1 font-medium">Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.image && <div className="text-red-500">{errors.image}</div>}
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>

    );
}
