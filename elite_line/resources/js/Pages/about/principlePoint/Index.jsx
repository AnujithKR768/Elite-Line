import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index() {

    const { points = {} } = usePage().props;
    const data = points.data || [];

    const deleteProfile = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this point!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/principle-point/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Core Principle Points" />

            <div className="p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Core Principle Points
                    </h1>

                    <Link
                        href="/principle-point/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add Point
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">

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

                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={item.id} className="border-t">

                                        <td className="p-3">{index + 1}</td>

                                        <td className="p-3">{item.point}</td>

                                        <td className="p-3">{item.order}</td>

                                        <td className="p-3">
                                            {item.section?.title || "-"}
                                        </td>

                                        <td className="p-3">
                                            <Link
                                                href={`/principle-point/edit/${item.id}`}
                                                className="bg-green-600 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => deleteProfile(item.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center p-6 text-gray-500">
                                        No Points Found
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
