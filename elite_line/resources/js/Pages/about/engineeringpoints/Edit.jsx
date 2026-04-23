import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit() {

    const { point, sections = [] } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        section_id: point.section_id || "",
        point: point.point || "",
        order: point.order || 0,
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/engineering-point/update/${point.id}`, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Engineering point updated successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Engineering Point" />

            <div className="p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Edit Engineering Point
                    </h1>
                </div>

                {/* Form */}
                <div className="bg-white shadow rounded-lg p-6">

                    <form onSubmit={submit}>

                        {/* Section Dropdown */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">
                                Section
                            </label>
                            <select
                                value={data.section_id}
                                onChange={(e) => setData("section_id", e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Select Section</option>
                                {sections.map((sec) => (
                                    <option key={sec.id} value={sec.id}>
                                        {sec.title}
                                    </option>
                                ))}
                            </select>
                            {errors.section_id && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.section_id}
                                </div>
                            )}
                        </div>

                        {/* Point */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">
                                Point
                            </label>
                            <input
                                type="text"
                                value={data.point}
                                onChange={(e) => setData("point", e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                placeholder="Enter point"
                            />
                            {errors.point && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.point}
                                </div>
                            )}
                        </div>

                        {/* Order */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">
                                Order
                            </label>
                            <input
                                type="number"
                                value={data.order}
                                onChange={(e) => setData("order", e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.order && (
                                <div className="text-red-500 text-sm mt-1">
                                    {errors.order}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href="/engineering-points"
                                className="bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
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
