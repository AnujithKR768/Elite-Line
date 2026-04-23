import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function Index({ philosophies }) {

    const deleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/Philosophy/Delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white shadow-sm sm:rounded-lg p-6">

                        {/* Top Section */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Philosophy</h2>

                            <a
                                href="/Philosophy/Add"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                + Add
                            </a>
                        </div>

                        {/* Table */}
                        <table className="min-w-full border border-gray-200">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">S.No</th>
                                    <th className="px-4 py-2 border">Image</th>
                                    <th className="px-4 py-2 border">Title</th>
                                    <th className="px-4 py-2 border">Paragraph</th>
                                    <th className="px-4 py-2 border">Paragraph 2</th>
                                    <th className="px-4 py-2 border">Update</th>
                                    <th className="px-4 py-2 border">Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {philosophies.data && philosophies.data.length > 0 ? (
                                    philosophies.data.map((item, index) => (
                                        <tr key={item.id} className="text-center">

                                            {/* S.No */}
                                            <td className="px-4 py-2 border">
                                                {index + 1}
                                            </td>

                                            {/* Image */}
                                            <td className="px-4 py-2 border">
                                                {item.image && (
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-cover mx-auto rounded"
                                                    />
                                                )}
                                            </td>

                                            {/* Title */}
                                            <td className="px-4 py-2 border">
                                                {item.title}
                                            </td>

                                            {/* Paragraph */}
                                            <td className="px-4 py-2 border max-w-xs truncate">
                                                {item.paragraph}
                                            </td>

                                            {/* Paragraph2 */}
                                            <td className="px-4 py-2 border max-w-xs truncate">
                                                {item.paragraph2}
                                            </td>

                                            {/* Edit */}
                                            <td className="px-4 py-2 border">
                                                <a
                                                    href={`/Philosophy/Edit/${item.id}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </a>
                                            </td>

                                            {/* Delete */}
                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => deleteItem(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-gray-500">
                                            No data found
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
