import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({ cards }) {

    const deleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this card!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/card/delete/${id}`, {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Card deleted successfully.", "success");
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Card Management</h2>

                <Link
                    href="/card/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                    + Add Card
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full border rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm">S.No</th>
                            <th className="px-4 py-2 text-left text-sm">Title</th>
                            <th className="px-4 py-2 text-left text-sm">Icon</th>
                            <th className="px-4 py-2 text-left text-sm">Image</th>
                            <th className="px-4 py-2 text-left text-sm">Update</th>
                            <th className="px-4 py-2 text-left text-sm">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cards.data.length > 0 ? (
                            cards.data.map((card, index) => (
                                <tr key={card.id} className="border-t hover:bg-gray-50">

                                    {/* Serial */}
                                    <td className="px-4 py-2 text-sm">
                                        {cards.from + index}
                                    </td>

                                    {/* Title */}
                                    <td className="px-4 py-2 text-sm">
                                        {card.title}
                                    </td>

                                    {/* Icon */}
                                    <td className="px-4 py-2 text-sm">
                                        {card.icon ? (
                                            <i className={card.icon}></i>
                                        ) : "-"
                                        }
                                    </td>

                                    {/* Image */}
                                    <td className="px-4 py-2">
                                        {card.image && (
                                            <img
                                                src={`/storage/${card.image}`}
                                                className="h-12 w-20 object-cover rounded"
                                            />
                                        )}
                                    </td>

                                    {/* Edit */}
                                    <td className="px-4 py-2">
                                        <Link
                                            href={`/card/edit/${card.id}`}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>

                                    {/* Delete */}
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => deleteItem(card.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No cards found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ PAGINATION (THIS WAS MISSING) */}
            <div className="mt-6 flex flex-wrap gap-2">
                {cards.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || ""}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 rounded text-sm border ${
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
