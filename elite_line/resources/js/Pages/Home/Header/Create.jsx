import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        image: null,
        title: "",
        subtitle: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post("/Header/store");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Header" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-2xl font-semibold mb-6">
                        Add Header
                    </h2>

                    <form onSubmit={submit} className="space-y-6">

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Image
                            </label>

                            <input
                                type="file"
                                className="mt-1 block w-full border rounded-md p-2"
                                onChange={(e) => setData("image", e.target.files[0])}
                            />

                            {errors.image && (
                                <div className="text-red-500 text-sm">
                                    {errors.image}
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>

                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                                placeholder="Enter title"
                            />

                            {errors.title && (
                                <div className="text-red-500 text-sm">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Subtitle
                            </label>

                            <input
                                type="text"
                                value={data.subtitle}
                                onChange={(e) => setData("subtitle", e.target.value)}
                                className="mt-1 block w-full border rounded-md p-2"
                                placeholder="Enter subtitle"
                            />

                            {errors.subtitle && (
                                <div className="text-red-500 text-sm">
                                    {errors.subtitle}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save Header
                            </button>

                            <a
                                href="/Header"
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </a>

                        </div>

                    </form>

                </div>
            </div>

        </AuthenticatedLayout>
    );
}
