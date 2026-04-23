import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router, Link } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index() {
    const { missions = {}, visions = {} } = usePage().props;

    const deleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This item will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/mission-vision/delete/${id}`);
            }
        });
    };

    const renderTable = (data) => (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">

                {/* ✅ Header (Grey like your screenshot) */}
                <thead className="bg-gray-200 text-gray-800">
                    <tr>
                        <th className="p-3 text-left">S.No</th>
                        <th className="p-3 text-left">Image</th>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Description</th>
                        <th className="p-3 text-left">Edit</th>
                        <th className="p-3 text-left">Delete</th>
                    </tr>
                </thead>

                {/* ✅ Body */}
                <tbody>
                    {data?.data?.length > 0 ? (
                        data.data.map((item, index) => (
                            <tr key={item.id} className="border-t hover:bg-gray-50">

                                {/* Serial Number */}
                                <td className="p-3">
                                    {(data.current_page - 1) * data.per_page + index + 1}
                                </td>

                                {/* Image */}
                                <td className="p-3">
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt="img"
                                            className="w-16 h-12 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-400">No Image</span>
                                    )}
                                </td>

                                {/* Title */}
                                <td className="p-3 font-medium">{item.title}</td>

                                {/* Description */}
                                <td className="p-3">
                                    {item.description?.substring(0, 70)}...
                                </td>

                                {/* Edit */}
                                <td className="p-3">
                                    <Link
                                        href={`/mission-vision/edit/${item.id}`}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                    >
                                        Edit
                                    </Link>
                                </td>

                                {/* Delete */}
                                <td className="p-3">
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-5 text-gray-500">
                                No Data Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* ✅ Pagination */}
            {data?.links && (
                <div className="mt-4 flex gap-2 flex-wrap">
                    {data.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`px-3 py-1 border rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout>
            <Head title="Mission & Vision" />

            <div className="p-6 space-y-8">

                {/* 🔷 Mission Section */}
                <div className="bg-white p-5 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Mission List</h2>

                        <Link
                            href="/mission-vision/create?type=mission"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            + Add Mission
                        </Link>
                    </div>

                    {renderTable(missions)}
                </div>

                {/* 🔷 Vision Section */}
                <div className="bg-white p-5 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Vision List</h2>

                        <Link
                            href="/mission-vision/create?type=vision"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            + Add Vision
                        </Link>
                    </div>

                    {renderTable(visions)}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
