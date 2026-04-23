import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index() {

    const { engineering = {} } = usePage().props;
    const data = engineering.data || [];

    const deleteSection = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this section!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/engineering/delete/${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Engineering Sections" />

            <div className="p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Engineering Solutions
                    </h1>

                    <Link
                        href="/engineering/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add Section
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">

                        {/* Table Head */}
                        <thead className="bg-gray-200 text-gray-800">
                            <tr>
                                <th className="p-3 text-left">S.No</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">Edit</th>
                                <th className="p-3 text-left">Delete</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {data.length > 0 ? (
                                data.map((sec, index) => (
                                    <tr key={sec.id} className="border-t align-top">

                                        <td className="p-3">{index + 1}</td>

                                        <td className="p-3 font-medium">
                                            {sec.title || "-"}
                                        </td>

                                        <td className="p-3">
                                            {sec.description || "-"}
                                        </td>

                                        <td className="p-3">
                                            <Link
                                                href={`/engineering/edit/${sec.id}`}
                                                className="bg-green-600 text-white px-3 py-1 rounded"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => deleteSection(sec.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 text-gray-500">
                                        No Engineering Sections Found
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
