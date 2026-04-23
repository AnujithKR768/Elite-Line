import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { usePage, router, Link } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index() {
    const { quality } = usePage().props;

    // Delete function
    const deleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/quality/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Quality & Safety Standards
                    </h1>

                    <Link
                        href="/quality/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add New
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3 border">S.No</th>
                                <th className="p-3 border">Title</th>
                                <th className="p-3 border">Description</th>
                                <th className="p-3 border">Points</th>
                                <th className="p-3 border">Edit</th>
                                <th className="p-3 border">Delete</th>

                            </tr>
                        </thead>

                        <tbody>
                            {quality.data.length > 0 ? (
                                quality.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        {/* S.No */}
                                        <td className="p-3 border">
                                            {(quality.current_page - 1) *
                                                quality.per_page +
                                                index +
                                                1}
                                        </td>

                                        {/* Title */}
                                        <td className="p-3 border font-medium">
                                            {item.title}
                                        </td>

                                        {/* Description */}
                                        <td className="p-3 border">
                                            {item.description}
                                        </td>

                                        {/* Points */}
                                        <td className="p-3 border">
                                            <ul className="list-disc ml-4 space-y-1">
                                                {item.point?.map((p, i) => (
                                                    <li key={i}>{p}</li>
                                                ))}
                                            </ul>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-3 border space-x-2">
                                            <Link
                                                href={`/quality/edit/${item.id}`}
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    deleteItem(item.id)
                                                }
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center p-4 text-gray-500"
                                    >
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center space-x-2">
                    {quality.links.map((link, index) => (
                        <button
                            key={index}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`px-3 py-1 border rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
                            } ${!link.url && "opacity-50 cursor-not-allowed"}`}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
