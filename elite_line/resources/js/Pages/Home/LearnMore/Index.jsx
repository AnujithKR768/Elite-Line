import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({ learnmores }) {

    const deleteLearnMore = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this Learn More!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/LearnMore/Delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        {/* Top Section */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Learn More</h2>

                            <a
                                href="/LearnMore/Create"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                + Add Learn More
                            </a>
                        </div>

                        {/* Table */}
                        <table className="min-w-full border border-gray-200">

                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">S.No</th>
                                    <th className="px-4 py-2 border">Title</th>
                                    <th className="px-4 py-2 border">Subtitle</th>
                                    <th className="px-4 py-2 border">Image</th>
                                    <th className="px-4 py-2 border">Contact</th>
                                    <th className="px-4 py-2 border">Update</th>
                                    <th className="px-4 py-2 border">Delete</th>
                                </tr>
                            </thead>

                            <tbody>

                                {learnmores.data.length > 0 ? (
                                    learnmores.data.map((item, index) => (
                                        <tr key={item.id} className="text-center">

                                            {/* S.No */}
                                            <td className="px-4 py-2 border">
                                                {index + 1}
                                            </td>

                                            {/* Title */}
                                            <td className="px-4 py-2 border">
                                                {item.title}
                                            </td>

                                            {/* Subtitle */}
                                            <td className="px-4 py-2 border">
                                                {item.subtitle}
                                            </td>

                                            {/* Image */}
                                            <td className="px-4 py-2 border">
                                                {item.image ? (
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        className="w-20 h-16 object-cover mx-auto rounded"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">No Image</span>
                                                )}
                                            </td>

                                            {/* Contact */}
                                            <td className="px-4 py-2 border text-sm text-left">
                                                📍 {item.location} <br />
                                                📞 {item.phone} <br />
                                                📧 {item.email}
                                            </td>

                                            {/* Edit */}
                                            <td className="px-4 py-2 border">
                                                <a
                                                    href={`/LearnMore/Edit/${item.id}`}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </a>
                                            </td>

                                            {/* Delete */}
                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => deleteLearnMore(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-gray-500">
                                            No Learn More data found
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
