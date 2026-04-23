import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({ banners }) {

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
                router.delete(`/banner/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Banner Management</h2>

                <Link
                    href="/banner/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    + Add Banner
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full border rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm">S.No</th>
                            <th className="px-4 py-2 text-left text-sm">Title</th>
                            <th className="px-4 py-2 text-left text-sm">Image</th>
                            <th className="px-4 py-2 text-left text-sm">Update</th>
                            <th className="px-4 py-2 text-left text-sm">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {banners.data.length > 0 ? (
                            banners.data.map((banner, index) => (
                                <tr key={banner.id} className="border-t hover:bg-gray-50">
                                    {/* Serial Number */}
                                    <td className="px-4 py-2 text-sm">
                                        {banners.from + index}
                                    </td>

                                    {/* Title */}
                                    <td className="px-4 py-2 text-sm">
                                        {banner.title}
                                    </td>

                                    {/* Image */}
                                    <td className="px-4 py-2">
                                        {banner.image && (
                                            <img
                                                src={`/storage/${banner.image}`}
                                                className="h-12 w-20 object-cover rounded"
                                                alt="banner"
                                            />
                                        )}
                                    </td>

                                    {/* Edit */}
                                    <td className="px-4 py-2 text-sm">
                                        <Link
                                            href={`/banner/edit/${banner.id}`}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>

                                    {/* Delete */}
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => deleteItem(banner.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No banners found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-wrap gap-2">
                {banners.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 rounded text-sm border transition ${
                            link.active
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
