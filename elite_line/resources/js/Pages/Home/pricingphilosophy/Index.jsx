import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index( { PricingPhilosophy } ) {

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
                    router.delete(`/pricing-philosophy/delete/${id}`);
                }
            });
        };
    return (

        <AuthenticatedLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Pricing Philosophy Management</h2>

                <Link
                    href="/pricing-philosophy/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    + Add Pricing Philosophy
                </Link>
            </div>
                <div className="overflow-x-auto">
                    <table className="w-full border rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm">S.No</th>
                                <th className="px-4 py-2 text-left text-sm">Title</th>
                                <th className="px-4 py-2 text-left text-sm">Description</th>
                                <th className="px-4 py-2 text-left text-sm">Update</th>
                                <th className="px-4 py-2 text-left text-sm">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {PricingPhilosophy.data.length > 0 ? (
                                PricingPhilosophy.data.map((philosophy, index) => (
                                    <tr key={philosophy.id} className="border-t">
                                        <td className="px-4 py-2 text-sm">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-2 text-sm">
                                            {philosophy.title}
                                        </td>

                                        <td className="px-4 py-2 text-sm">
                                            {philosophy.description}
                                        </td>

                                        <td className="px-4 py-2 text-sm">
                                            <Link
                                                href={`/pricing-philosophy/edit/${philosophy.id}`}
                                                className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        <td className="px-4 py-2 text-sm">
                                            <button
                                                onClick={() => deleteItem(philosophy.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
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
                                        className="px-4 py-2 text-center text-sm"
                                    >
                                        No Pricing Philosophy found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
        </AuthenticatedLayout>
    )
}
