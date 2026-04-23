import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const { services } = usePage().props;

    const deleteService = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this service!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/services/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="pt-24 px-6 md:px-12 pb-12 bg-gray-100 min-h-screen">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Services
                    </h1>

                    <Link
                        href="/services/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Add Service
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="px-6 py-4">S.No</th>
                                    <th className="px-6 py-4">Image</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4 text-center">Edit</th>
                                    <th className="px-6 py-4 text-center">Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {services.data.length > 0 ? (
                                    services.data.map((service, index) => (
                                        <tr key={service.id} className="border-t hover:bg-gray-50">

                                            {/* S.No */}
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>

                                            {/* Image */}
                                            <td className="px-6 py-4">
                                                {service.image ? (
                                                    <img
                                                        src={`/storage/${service.image}`}
                                                        alt={service.title}
                                                        className="w-14 h-14 object-cover rounded"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400 text-sm">
                                                        No Image
                                                    </span>
                                                )}
                                            </td>

                                            {/* Title */}
                                            <td className="px-6 py-4 font-semibold">
                                                {service.title}
                                            </td>

                                            {/* Description */}
                                            <td className="px-6 py-4 text-gray-600 max-w-md">
                                                {service.description.length > 80
                                                    ? service.description.substring(0, 80) + "..."
                                                    : service.description}
                                            </td>

                                            {/* Edit */}
                                            <td className="px-6 py-4 text-center">
                                                <Link
                                                    href={`/services/${service.id}/edit`}
                                                    className="bg-green-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Edit
                                                </Link>
                                            </td>

                                            {/* Delete */}
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => deleteService(service.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10 text-gray-500">
                                            No services available
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {services.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 border rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700"
                            } ${!link.url && "opacity-50 cursor-not-allowed"}`}
                        />
                    ))}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
