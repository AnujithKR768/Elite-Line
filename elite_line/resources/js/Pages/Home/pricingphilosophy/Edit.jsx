import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function Edit({ PricingPhilosophy }) {

    const { data, setData, post, processing, errors } = useForm({
        title: PricingPhilosophy.title || "",
        description: PricingPhilosophy.description || "",
        footer: PricingPhilosophy.footer || "",
        _method: "put",
    });

    const submit = (e) => {
        e.preventDefault();

        post(`/pricing-philosophy/update/${PricingPhilosophy.id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-6">
                    Edit Pricing Philosophy
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.title && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            rows="4"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Footer
                        </label>
                        <textarea
                            rows="3"
                            value={data.footer}
                            onChange={(e) => setData("footer", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        {errors.footer && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.footer}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        {processing ? "Updating..." : "Update"}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
