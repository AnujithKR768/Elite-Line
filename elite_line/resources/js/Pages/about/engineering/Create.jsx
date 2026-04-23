import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/engineering/store", {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Engineering Section created successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Engineering Section" />

            <div className="p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Add Engineering Section
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
                                placeholder="e.g. CUSTOM ENGINEERING SOLUTIONS"
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
                                placeholder="Enter description..."
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
                                href="/Engineering"
                                className="bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
                            >
                                {processing ? "Saving..." : "Save"}
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
