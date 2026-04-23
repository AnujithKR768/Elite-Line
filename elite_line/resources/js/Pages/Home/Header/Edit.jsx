import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

export default function Edit({ header }) {

    const { data, setData, post, processing, errors } = useForm({
        title: header.title || "",
        subtitle: header.subtitle || "",
        image: null,
        _method: "put",
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/Header/Update/${header.id}`);
    };

    return (
        <AuthenticatedLayout>

            <Head title="Edit Header" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-xl font-semibold mb-6">
                            Edit Header
                        </h2>

                        <form onSubmit={submit} className="space-y-6">

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />

                                {errors.title && (
                                    <p className="text-red-500 text-sm">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Subtitle
                                </label>

                                <input
                                    type="text"
                                    value={data.subtitle}
                                    onChange={(e) => setData("subtitle", e.target.value)}
                                    className="mt-1 block w-full border rounded p-2"
                                />

                                {errors.subtitle && (
                                    <p className="text-red-500 text-sm">
                                        {errors.subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Current Image */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Current Image
                                </label>

                                {header.image && (
                                    <img
                                        src={`/storage/${header.image}`}
                                        className="w-40 rounded shadow"
                                    />
                                )}
                            </div>

                            {/* New Image */}
                            <div>
                                <label className="block text-sm font-medium">
                                    Change Image
                                </label>

                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    className="mt-1 block w-full"
                                />

                                {errors.image && (
                                    <p className="text-red-500 text-sm">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    >
                                        Update Legacy
                                    </button>

                                    <a
                                        href="/Header"
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </div>

        </AuthenticatedLayout>
    );
}
