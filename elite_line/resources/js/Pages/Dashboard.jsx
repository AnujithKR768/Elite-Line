import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 text-gray-900">
                    Welcome to Elite Line
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
