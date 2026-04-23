import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function Edit({ point, philosophies = [] }) {

    const { data, setData, post, processing, errors } = useForm({
        pricing_philosophy_id: point.pricing_philosophy_id || "",
        point: point.point || "",
        sort_order: point.sort_order || 0,
        _method: "put", //  for update
    });

    const submit = (e) => {
        e.preventDefault();

        post(`/pricing-point/update/${point.id}`);
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-2xl mx-auto">

                {/* Title */}
                <h2 className="text-xl font-semibold mb-6">
                    Edit Pricing Point
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    {/* Select Philosophy */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Select Pricing Philosophy
                        </label>

                        <select
                            value={data.pricing_philosophy_id}
                            onChange={(e) =>
                                setData("pricing_philosophy_id", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">-- Select --</option>

                            {philosophies.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.title}
                                </option>
                            ))}
                        </select>

                        {errors.pricing_philosophy_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.pricing_philosophy_id}
                            </div>
                        )}
                    </div>

                    {/* Point */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Point
                        </label>

                        <input
                            type="text"
                            value={data.point}
                            onChange={(e) => setData("point", e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {errors.point && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.point}
                            </div>
                        )}
                    </div>

                    {/* Sort Order */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Sort Order
                        </label>

                        <input
                            type="number"
                            value={data.sort_order}
                            onChange={(e) =>
                                setData("sort_order", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        {processing ? "Updating..." : "Update Point"}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
