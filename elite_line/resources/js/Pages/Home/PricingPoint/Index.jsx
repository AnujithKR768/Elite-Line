import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import { Link, router } from "@inertiajs/react";

export default function Index({ PricingPoint = { data: [] } }) {

    const deleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this point!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/pricing-point/delete/${id}`, {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Point deleted successfully.", "success");
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        Pricing Points Management
                    </h2>

                    <Link
                        href="/pricing-point/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        + Add Point
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm">S.No</th>
                                <th className="px-4 py-2 text-left text-sm">Point</th>
                                <th className="px-4 py-2 text-left text-sm">Order</th>
                                <th className="px-4 py-2 text-left text-sm">Update</th>
                                <th className="px-4 py-2 text-left text-sm">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {PricingPoint?.data?.length > 0 ? (
                                PricingPoint.data.map((item, index) => (
                                    <tr key={item.id} className="border-t">

                                        {/* Serial */}
                                        <td className="px-4 py-2 text-sm">
                                            {PricingPoint.from
                                                ? PricingPoint.from + index
                                                : index + 1}
                                        </td>

                                        {/* Point */}
                                        <td className="px-4 py-2 text-sm">
                                            {item.point}
                                        </td>

                                        {/* Order */}
                                        <td className="px-4 py-2 text-sm">
                                            {item.sort_order}
                                        </td>

                                        {/* Edit */}
                                        <td className="px-4 py-2 text-sm">
                                            <Link
                                                href={`/pricing-point/edit/${item.id}`}
                                                className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        {/* Delete */}
                                        <td className="px-4 py-2 text-sm">
                                            <button
                                                onClick={() => deleteItem(item.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No pricing points found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
