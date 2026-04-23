import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Edit() {
    const { contact } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        company_name: contact.company_name || "",
        office: contact.office || "",
        address: contact.address || "",
        phone: contact.phone || "",
        email: contact.email || "",
        email_secondary: contact.email_secondary || "",
        website: contact.website || "",
        map_embed: contact.map_embed || "",
    });

    // Update
    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/contacts/update/${contact.id}`, {
            onSuccess: () => {
                Swal.fire({
                    title: "Updated!",
                    text: "Contact updated successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-gray-100 min-h-screen">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Contact</h1>

                    <Link
                        href="/contact-support"
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Back
                    </Link>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow space-y-4 max-w-2xl"
                >

                    {/* Company */}
                    <div>
                        <label className="block mb-1 font-medium">Company Name</label>
                        <input
                            type="text"
                            value={data.company_name}
                            onChange={(e) => setData("company_name", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.company_name && (
                            <p className="text-red-500 text-sm">{errors.company_name}</p>
                        )}
                    </div>

                    {/* Office */}
                    <div>
                        <label className="block mb-1 font-medium">Office</label>
                        <input
                            type="text"
                            value={data.office}
                            onChange={(e) => setData("office", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1 font-medium">Address</label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-1 font-medium">Phone</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Secondary Email */}
                    <div>
                        <label className="block mb-1 font-medium">Secondary Email</label>
                        <input
                            type="email"
                            value={data.email_secondary}
                            onChange={(e) => setData("email_secondary", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="block mb-1 font-medium">Website</label>
                        <input
                            type="text"
                            value={data.website}
                            onChange={(e) => setData("website", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Map */}
                    <div>
                        <label className="block mb-1 font-medium">Google Map (iframe)</label>
                        <textarea
                            value={data.map_embed}
                            onChange={(e) => setData("map_embed", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 text-white px-6 py-2 rounded"
                    >
                        Update Contact
                    </button>

                </form>

            </div>
        </AuthenticatedLayout>
    );
}
