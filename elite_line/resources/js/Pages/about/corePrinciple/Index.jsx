import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index() {

    // Get single record
    const { principle = {} } = usePage().props;
    const principles = principle.data || [];

    // Delete
    const deleteSection = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this section!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/core-principles/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Core Principle" />

            <div className="p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Core Principle
                    </h1>


                        <Link
                            href="/core-principles/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            + Add Principle
                        </Link>

                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">

                        <thead className="bg-gray-200 text-gray-800">
                            <tr>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Edit</th>
                                <th className="p-3 text-left">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {principles.length > 0 ? (
                                principles.map((item, index) => (
                                    <tr key={item.id} className="border-t">

                                        <td className="p-3">{index + 1}</td>

                                        <td className="p-3 font-medium">
                                            {item.title || "-"}
                                        </td>

                                        <td className="p-3">
                                            {item.description || "-"}
                                        </td>

                                        <td className="p-3">
                                            <Link
                                                href={`/core-principles/edit/${item.id}`}
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => deleteSection(item.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 text-gray-500">
                                        No Core Principle Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
