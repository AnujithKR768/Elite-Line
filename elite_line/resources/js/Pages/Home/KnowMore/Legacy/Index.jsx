import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({ legacy }) {

    const deleteHeader = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this legacy!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/Legacy/Delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* Top section */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Our Legacy</h2>

                            <a
                                href="/Legacy/Add"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                + Add Legacy
                            </a>
                        </div>

                        <table className="min-w-full border border-gray-200">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">S.No</th>
                                    <th className="px-4 py-2 border">Title</th>
                                    <th className="px-4 py-2 border">Paragraph</th>
                                    <th className="px-4 py-2 border">Paragraph</th>
                                    <th className="px-4 py-2 border">Update</th>
                                    <th className="px-4 py-2 border">Delete</th>
                                </tr>
                            </thead>

                            <tbody>

                                {legacy.data.length > 0 ? (
                                    legacy.data.map((item, index) => (
                                        <tr key={item.id} className="text-center">

                                            <td className="px-4 py-2 border">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                {item.title}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                {item.paragraph}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                {item.paragraph2}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <a
                                                    href={`/Legacy/Edit/${item.id}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </a>
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => deleteHeader(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-500">
                                            No headers found
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
