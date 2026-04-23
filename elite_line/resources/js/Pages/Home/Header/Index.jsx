import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function Index({ headers }) {
    const deleteHeader = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this header!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/Header/Delete/${id}`);
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
                            <h2 className="text-xl font-semibold">Header</h2>

                            <a
                                href="/Header/Add"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                + Add Header
                            </a>
                        </div>

                        <table className="min-w-full border border-gray-200">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">S.No</th>
                                    <th className="px-4 py-2 border">Image</th>
                                    <th className="px-4 py-2 border">Title</th>
                                    <th className="px-4 py-2 border">Subtitle</th>
                                    <th className="px-4 py-2 border">Update</th>
                                    <th className="px-4 py-2 border">Delete</th>
                                </tr>
                            </thead>

                            <tbody>

                                {headers.data && headers.data.length > 0 ? (
                                    headers.data.map((header, index) => (
                                        <tr key={header.id} className="text-center">

                                            <td className="px-4 py-2 border">
                                                {index + 1}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                {header.image && (
                                                    <img
                                                        src={`/storage/${header.image}`}
                                                        alt={header.title}
                                                        className="w-16 h-16 object-cover mx-auto rounded"
                                                    />
                                                )}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                {header.title}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                {header.subtitle}
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <a
                                                    href={`/Header/Edit/${header.id}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </a>
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => deleteHeader(header.id)}
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
                {/* Pagination */}
                <div className="mt-6 flex justify-center flex-wrap gap-2">
                    {headers.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`px-3 py-1 rounded border text-sm
                                ${link.active ? "bg-blue-600 text-white" : "bg-white text-gray-700"}
                                ${!link.url ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100"}
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
