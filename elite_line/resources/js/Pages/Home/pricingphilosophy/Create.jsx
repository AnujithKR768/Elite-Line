import React from "react";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {

    const{ data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        footer: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/pricing-philosophy/store");
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">
                    Add Pricing Philosophy
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

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Footer
                        </label>
                        <input
                            type="text"
                            value={data.footer}
                            onChange={(e) => setData("footer", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.footer && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.footer}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            Create
                        </button>

                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
