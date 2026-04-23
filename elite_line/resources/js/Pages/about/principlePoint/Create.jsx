import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create() {

    const { sections = [] } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        section_id: "",
        point: "",
        order: 0,
    });

    const submit = (e) => {
        e.preventDefault();

        post("/principle-point/store", {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Point created successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });

                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Point" />

            <div className="p-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Add Core Principle Point
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

                        {/* Submit */}
                        <div className="flex justify-end gap-3">
                            <Link
                                href="/principle-point"
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
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
