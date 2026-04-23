import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create() {

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/core-principles/store", {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Core Principle created successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Core Principle" />

            <div className="p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Add Core Principle
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
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter title"
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
                                placeholder="Enter description"
                            ></textarea>
                            {errors.description && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>


                        {/* Submit */}
                        <div className="flex justify-end">
                            <Link
                                href="/core-principle"
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Back
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
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
