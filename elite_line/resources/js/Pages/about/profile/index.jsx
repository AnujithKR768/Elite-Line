import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export default function index() {

    //  Safe destructuring
    const { profile = {} } = usePage().props;

    const deleteProfile = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this profile!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/Profile/delete/${id}`); // ✅ fixed route
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Company Profile" />

            <div className="p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Company Profile
                    </h1>

                    <Link
                        href="/Profile/Add"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        + Add Profile
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">S.no</th>
                                <th className="p-3 text-left">Company Name</th>
                                <th className="p-3 text-left">Intro</th>
                                <th className="p-3 text-left">Expertise</th>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Edit</th>
                                <th className="p-3 text-left">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {profile?.data && profile.data.length > 0 ? (
                                profile.data.map((item, index) => (
                                    <tr key={item.id} className="border-t">

                                        {/* S.no */}
                                        <td className="p-3">
                                            {(profile.current_page - 1) * profile.per_page + index + 1}
                                        </td>

                                        {/* Company Name */}
                                        <td className="p-3 font-medium">
                                            {item.company_name}
                                        </td>

                                        {/* Intro */}
                                        <td className="p-3">
                                            {item.intro?.substring(0, 80)}...
                                        </td>

                                        {/* Expertise */}
                                        <td className="p-3">
                                            <ul className="list-disc pl-4">
                                                {item.expertise?.map((exp, i) => (
                                                    <li key={i}>{exp}</li>
                                                ))}
                                            </ul>
                                        </td>

                                        {/* Image */}
                                        <td className="p-3">
                                            {item.image ? (
                                                <img
                                                    src={`/storage/${item.image}`}
                                                    alt="Company"
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            ) : (
                                                <span className="text-gray-400">
                                                    No Image
                                                </span>
                                            )}
                                        </td>

                                        {/* Edit */}
                                        <td className="p-3">
                                            <Link
                                                href={`/Profile/edit/${item.id}`}
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        {/* Delete */}
                                        <td className="p-3">
                                            <button
                                                onClick={() => deleteProfile(item.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-6 text-gray-500">
                                        No Company Profile Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {profile?.links && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {profile.links.map((link, i) => (
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
        </AuthenticatedLayout>
    );
}
