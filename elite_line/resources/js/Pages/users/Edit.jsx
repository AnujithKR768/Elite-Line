import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Edit() {
    const { user } = usePage().props;

    const { data, setData, put } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions || [],
    });

    const permissionsList = [
        "home",
        "about",
        "solution",
        "service",
        "know_more",
        "why_choose_us",
        "users",
    ];

    function toggle(permission) {
        if (data.permissions.includes(permission)) {
            setData(
                "permissions",
                data.permissions.filter((p) => p !== permission)
            );
        } else {
            setData("permissions", [...data.permissions, permission]);
        }
    }

    function submit(e) {
        e.preventDefault();

        Swal.fire({
            title: "Update User?",
            text: "Do you want to save these changes?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                put(`/users/update/${user.id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Updated!",
                            "User has been updated successfully.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Something went wrong.",
                            "error"
                        );
                    },
                });
            }
        });
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                    Edit User
                </h1>

                <form onSubmit={submit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Name
                        </label>
                        <input
                            value={data.name}
                            onChange={(e) =>
                                setData("name", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            value={data.email}
                            onChange={(e) =>
                                setData("email", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Role
                        </label>
                        <select
                            value={data.role}
                            onChange={(e) =>
                                setData("role", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Permissions */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                            Permissions
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {permissionsList.map((p) => (
                                <label
                                    key={p}
                                    className="flex items-center space-x-2 border border-gray-200 p-3 rounded-lg cursor-pointer hover:bg-gray-50"
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.permissions.includes(p)}
                                        onChange={() => toggle(p)}
                                        className="accent-blue-600"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">
                                        {p.replaceAll("_", " ")}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium shadow"
                        >
                            Update User
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
