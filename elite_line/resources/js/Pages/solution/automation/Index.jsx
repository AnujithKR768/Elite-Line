import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { usePage, router, Link } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index() {
    const { automation } = usePage().props;

    // Delete function
    const deleteSection = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/automation/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Automation Systems
                    </h1>

                    <Link
                        href="/automation/create"
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
                                <th className="p-3 border">Footer</th>
                                <th className="p-3 border">Edit</th>
                                <th className="p-3 border">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {automation.data.length > 0 ? (
                                automation.data.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="p-3 border">
                                            {(automation.current_page - 1) * automation.per_page + index + 1}
                                        </td>

                                        <td className="p-3 border font-medium">
                                            {item.title}
                                        </td>

                                        <td className="p-3 border">
                                            {item.description}
                                        </td>

                                        <td className="p-3 border">
                                            <ul className="list-disc ml-4 space-y-1">
                                                {item.points?.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul>
                                        </td>

                                        <td className="p-3 border">
                                            {item.footer}
                                        </td>

                                        <td className="p-3 border space-x-2">
                                            <Link
                                                href={`/automation/edit/${item.id}`}
                                                className="bg-green-400 px-3 py-1 rounded text-white"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => deleteSection(item.id)}
                                                className="bg-red-600 px-3 py-1 rounded text-white"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-4">
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center space-x-2">
                    {automation.links.map((link, index) => (
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
