import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit() {

    const { principle } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        title: principle.title || "",
        description: principle.description || "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/core-principles/update/${principle.id}`, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    text: "Core Principle updated successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Core Principle" />

            <div className="p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Edit Core Principle
                    </h1>

                    <Link
                        href="/core-principles"
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white shadow rounded-lg p-6">

                    <form onSubmit={submit}>

                        {/* Title */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">
                                Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {errors.title && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                rows="4"
                            ></textarea>
                            {errors.description && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href="/core-principles"
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? "Updating..." : "Update"}
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
