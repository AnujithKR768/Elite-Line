import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index() {

    //Handle pagination object
    const { points = {} } = usePage().props;
    const data = points.data || [];

    const deletePoint = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this point!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/engineering-point/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Engineering Points" />

            <div className="p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Engineering Points
                    </h1>

                    <Link
                        href="/engineering-point/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add Point
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">

                        {/* Head */}
                        <thead className="bg-gray-200 text-gray-800">
                            <tr>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Point</th>
                                <th className="p-3 text-left">Order</th>
                                <th className="p-3 text-left">Section</th>
                                <th className="p-3 text-left">Edit</th>
                                <th className="p-3 text-left">Delete</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={item.id} className="border-t">

                                        {/* S.No */}
                                        <td className="p-3">
                                            {index + 1}
                                        </td>

                                        {/* Point */}
                                        <td className="p-3">
                                            {item.point}
                                        </td>

                                        {/* Order */}
                                        <td className="p-3">
                                            {item.order}
                                        </td>

                                        {/* Section */}
                                        <td className="p-3">
                                            {item.section?.title || "-"}
                                        </td>

                                        {/* Edit */}
                                        <td className="p-3">
                                            <Link
                                                href={`/engineering-point/edit/${item.id}`}
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        {/* Delete */}
                                        <td className="p-3">
                                            <button
                                                onClick={() => deletePoint(item.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-6 text-gray-500">
                                        No Engineering Points Found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                    <div className="flex justify-between items-center mt-4">

                        {/* Previous */}
                        <button
                            disabled={!points.prev_page_url}
                            onClick={() => router.get(points.prev_page_url)}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {/* Page Info */}
                        <span className="text-sm text-gray-600">
                            Page {points.current_page} of {points.last_page}
                        </span>

                        {/* Next */}
                        <button
                            disabled={!points.next_page_url}
                            onClick={() => router.get(points.next_page_url)}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
