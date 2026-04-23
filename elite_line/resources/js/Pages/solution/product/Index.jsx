import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index() {
    const { product } = usePage().props;
    const productList = product?.data || [];

    // Delete function
    const deleteSection = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/product/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Industrial Door Systems" />

            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Industrial Door Systems
                    </h2>

                    <Link
                        href="/product/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Add Product
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow rounded">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border w-16">S.No</th>
                                <th className="px-4 py-2 border">Title</th>
                                <th className="px-4 py-2 border">Description</th>
                                <th className="px-4 py-2 border">Image</th>
                                <th className="px-4 py-2 border w-24">Edit</th>
                                <th className="px-4 py-2 border w-24">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productList.length > 0 ? (
                                productList.map((item, index) => (
                                    <tr key={item.id} className="text-center">
                                        {/* Serial Number */}
                                        <td className="px-4 py-2 border">
                                            {(product?.current_page - 1) *
                                                product?.per_page +
                                                index +
                                                1}
                                        </td>

                                        {/* Title */}
                                        <td className="px-4 py-2 border">
                                            {item.title}
                                        </td>

                                        {/* Description */}
                                        <td className="px-4 py-2 border text-sm">
                                            {item.description}
                                        </td>

                                        {/* Image */}
                                        <td className="px-4 py-2 border">
                                            {item.image ? (
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt={item.title}
                                                    className="w-16 h-16 object-cover mx-auto rounded"
                                                />
                                            ) : (
                                                <span className="text-gray-400">
                                                    No Image
                                                </span>
                                            )}
                                        </td>

                                        {/*  Edit Button (FIXED) */}
                                        <td className="px-4 py-2 border">
                                            <Link
                                                href={`/product/edit/${item.id}`}
                                                className="inline-block bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        {/* Delete */}
                                        <td className="px-4 py-2 border">
                                            <button
                                                onClick={() =>
                                                    deleteSection(item.id)
                                                }
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {product?.links && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                        {product.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                className={`px-3 py-1 border rounded text-sm ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-white"
                                } ${
                                    !link.url
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
