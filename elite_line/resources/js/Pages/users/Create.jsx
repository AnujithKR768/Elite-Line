import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post } = useForm({
        name: "",
        email: "",
        password: "",
        role: "user",
        permissions: [],
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

    function handleCheckbox(permission) {
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
        post("/users/store");
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                    Create User
                </h1>

                <form onSubmit={submit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Name
                        </label>
                        <input
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter name"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter email"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Role
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setData("role", e.target.value)}
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
                                        onChange={() => handleCheckbox(p)}
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
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
