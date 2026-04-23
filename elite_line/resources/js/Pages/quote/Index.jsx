import React from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Index({ quotes }) {

  // 🔁 Update Status with SweetAlert
  const updateStatus = (id, status) => {
    Swal.fire({
      title: "Update Status?",
      text: `Change status to "${status}"`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        router.patch(`/quotes/${id}/status`, { status }, {
          onSuccess: () => {
            Swal.fire("Updated!", "Status changed successfully.", "success");
          },
        });
      }
    });
  };

    const deleteQuote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This quote will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/quotes/delete/${id}`, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Quote has been removed.", "success");
          },
        });
      }
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">Quote Requests</h1>
            <p className="text-gray-500 text-sm">
              Manage incoming client inquiries and quotations
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">

              {/* Head */}
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-4 text-left">Client</th>
                  <th className="p-4 text-left">Contact</th>
                  <th className="p-4 text-left">Service</th>
                  <th className="p-4 text-left">Location</th>
                  <th className="p-4 text-left">Urgency</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {quotes.data.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-500">
                      No quote requests found
                    </td>
                  </tr>
                ) : (
                  quotes.data.map((quote) => (
                    <tr
                      key={quote.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* Client */}
                      <td className="p-4">
                        <div className="font-medium">{quote.name}</div>
                        <div className="text-gray-400 text-xs">
                          {quote.company}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="p-4">
                        <div>{quote.email}</div>
                        <div className="text-gray-400 text-xs">
                          {quote.phone}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="p-4">
                        {quote.product_type || quote.service_type}
                      </td>

                      {/* Location */}
                      <td className="p-4">{quote.location}</td>

                      {/* Urgency */}
                      <td className="p-4">
                        <span className="text-xs px-2 py-1 rounded bg-gray-200">
                          {quote.urgency || "-"}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            quote.status === "new"
                              ? "bg-blue-100 text-blue-600"
                              : quote.status === "contacted"
                              ? "bg-yellow-100 text-yellow-600"
                              : quote.status === "quoted"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {quote.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 flex gap-2">

                        {/* Status Dropdown */}
                        <select
                          value={quote.status}
                          onChange={(e) =>
                            updateStatus(quote.id, e.target.value)
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="closed">Closed</option>
                        </select>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteQuote(quote.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {quotes.links && (
            <div className="mt-6 flex flex-wrap gap-2">
              {quotes.links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => link.url && router.visit(link.url)}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className={`px-3 py-1 text-sm rounded border ${
                    link.active
                      ? "bg-black text-white"
                      : "bg-white text-gray-700"
                  }`}
                  disabled={!link.url}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
