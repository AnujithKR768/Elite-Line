import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const { industries } = usePage().props;

    const data = industries.data; // pagination fix

    // Delete function
    const deleteProfile = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this industry!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/industries/delete${id}`);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Industries</h1>

                    <Link
                        href="/industries/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Industry
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow rounded">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3 border">S.No</th>
                                <th className="p-3 border">Title</th>
                                <th className="p-3 border">Points</th>
                                <th className="p-3 border text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50"
                                    >
                                        {/* S.No */}
                                        <td className="p-3 border">
                                            {item.s_no}
                                        </td>

                                        {/* Title */}
                                        <td className="p-3 border">
                                            {item.title}
                                        </td>

                                        {/* Points */}
                                        <td className="p-3 border">
                                            <ul className="list-disc pl-5">
                                                {Array.isArray(item.points)
                                                    ? item.points.map(
                                                          (p, i) => (
                                                              <li key={i}>
                                                                  {p}
                                                              </li>
                                                          )
                                                      )
                                                    : JSON.parse(
                                                          item.points || "[]"
                                                      ).map((p, i) => (
                                                          <li key={i}>{p}</li>
                                                      ))}
                                            </ul>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-3 border text-center space-x-2">
                                            <Link
                                                href={`/industries/${item.id}/edit`}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    deleteProfile(item.id)
                                                }
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center p-4 text-gray-500"
                                    >
                                        No industries found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {industries.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => router.visit(link.url)}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                            className={`px-3 py-1 border rounded text-sm ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
