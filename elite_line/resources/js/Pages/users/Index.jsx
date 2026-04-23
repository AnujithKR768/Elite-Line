import { Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Index() {
    const { users } = usePage().props;

   const submit = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/users/delete/${id}`, {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                    },
                    onError: () => {
                        Swal.fire("Error!", "Something went wrong.", "error");
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-white rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Users</h1>

                <Link
                    href="/users/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                >
                    + Create User
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Name</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Role</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">Edit</th>
                            <th className="px-4 py-3 text-sm font-semibold text-gray-600 text-center">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3">{user.name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 text-xs rounded bg-gray-200">
                                        {user.role}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-center space-x-3">
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => submit(user.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}
