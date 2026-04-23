import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Index() {
    const { solutions } = usePage().props;

    // Delete function
    const deleteSection = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this solution!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/loading-solutions/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 md:p-10 bg-gray-100 min-h-screen">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Loading Bay & Dock Solutions
                    </h1>

                    <Link
                        href="/loading-solutions/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
                    >
                        + Add New
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow overflow-x-auto">
                    <table className="w-full text-left">

                        {/* Head */}
                        <thead className="bg-gray-50 border-b">
                            <tr className="text-gray-600 text-sm uppercase">
                                <th className="p-4">S.No</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Sub Title</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Image</th>
                                <th className="p-4 text-center">Edit</th>
                                <th className="p-4 text-center">Delete</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {solutions.data.length > 0 ? (
                                solutions.data.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-4">
                                            {index + 1}
                                        </td>

                                        <td className="p-4 font-medium">
                                            {item.title}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {item.sub_title}
                                        </td>

                                        <td className="p-4 text-gray-600 max-w-xs">
                                            <p className="line-clamp-2">
                                                {item.description}
                                            </p>
                                        </td>

                                        <td className="p-4">
                                            {item.image && (
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    className="w-20 h-14 object-cover rounded"
                                                />
                                            )}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    href={`/loading-solutions/edit/${item.id}`}
                                                    className="bg-green-400 px-3 py-1 rounded text-white text-sm"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => deleteSection(item.id)}
                                                    className="bg-red-500 px-3 py-1 rounded text-white text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center gap-2 flex-wrap">
                    {solutions.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 rounded border text-sm ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
