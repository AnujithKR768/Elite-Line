import React from "react";
import { usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Index() {
    const { contact } = usePage().props;

    const contacts = contact?.data || [];

    // Delete
    const deleteProfile = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this contact!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/contacts/delete${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-100 min-h-screen">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Contact</h1>

                    <Link
                        href="/contacts/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Add Contact
                    </Link>
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-4">S.No</th>
                                <th className="p-4">Company</th>
                                <th className="p-4">Office</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Created</th>
                                <th className="p-4 text-center">Edit</th>
                                <th className="p-4 text-center">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((item, index) => (
                                    <tr key={item.id} className="border-t hover:bg-gray-50">
                                        <td className="p-4">
                                            {(contact.current_page - 1) * contact.per_page + index + 1}
                                        </td>

                                        <td className="p-4 font-medium">
                                            {item.company_name}
                                        </td>

                                        <td className="p-4">{item.office}</td>

                                        <td className="p-4">{item.phone}</td>

                                        <td className="p-4">{item.email}</td>

                                        <td className="p-4">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 text-center">
                                            <Link
                                                href={`/contacts/${item.id}/edit`}
                                                className="text-blue-600"
                                            >
                                                Edit
                                            </Link>
                                        </td>

                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => deleteProfile(item.id)}
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="p-6 text-center text-gray-500">
                                        No contact data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {contact?.links && (
                    <div className="flex justify-center mt-6 gap-2 flex-wrap">
                        {contact.links.map((link, i) => (
                            <button
                                key={i}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 border rounded ${
                                    link.active ? "bg-blue-600 text-white" : "bg-white"
                                }`}
                                disabled={!link.url}
                            />
                        ))}
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}
