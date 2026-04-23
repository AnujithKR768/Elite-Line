import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit() {

    const { engineering } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        title: engineering.title || "",
        description: engineering.description || "",
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/engineering/update/${engineering.id}`, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    text: "Engineering Section updated successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Engineering Section" />

            <div className="p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Edit Engineering Section
                    </h1>
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
                                className="w-full border rounded px-3 py-2"
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
                                className="w-full border rounded px-3 py-2"
                                rows="5"
                            />
                            {errors.description && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href="/engineering"
                                className="bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
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
