import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function Index({ brands }) {

    const deleteHeader = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this brand!",
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
                        <h2 className="text-xl font-semibold mb-4">Brands</h2>

                        <a
                            href="/brand/create"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Add Brand
                        </a>

                        <table className="min-w-full border border-gray-200 mt-4">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">S.No</th>
                                    <th className="px-4 py-2 border">Logo</th>
                                    <th className="px-4 py-2 border">Title</th>
                                    <th className="px-4 py-2 border">Edit</th>
                                    <th className="px-4 py-2 border">Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {brands.data && brands.data.length > 0 ? (
                                    brands.data.map((brand, index) => (
                                        <tr key={brand.id} className="text-center">
                                            <td className="px-4 py-2 border">{index + 1}</td>

                                            <td className="px-4 py-2 border">
                                                {brand.logo && (
                                                    <img
                                                        src={`/storage/${brand.logo}`}
                                                        alt={brand.title}
                                                        className="w-16 h-16 object-cover mx-auto rounded"
                                                    />
                                                )}
                                            </td>

                                            <td className="px-4 py-2 border">{brand.title}</td>

                                            <td className="px-4 py-2 border">
                                                <a
                                                    href={`/brand/edit/${brand.id}`}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </a>
                                            </td>

                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => deleteHeader(brand.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-2 border text-center">
                                            No brands found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center flex-wrap gap-2">
                    {brands.links.map((link, index) => (
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
