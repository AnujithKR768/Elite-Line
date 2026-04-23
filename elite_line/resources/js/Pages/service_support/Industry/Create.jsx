import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        s_no: "",
        title: "",
        points: [""],
    });

    // Handle normal input
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // Handle points
    const handlePointChange = (index, value) => {
        const newPoints = [...data.points];
        newPoints[index] = value;
        setData("points", newPoints);
    };

    // Add point
    const addPoint = () => {
        setData("points", [...data.points, ""]);
    };

    // Remove point
    const removePoint = (index) => {
        const newPoints = data.points.filter((_, i) => i !== index);
        setData("points", newPoints);
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        post("/industries/store", {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Industry created successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 max-w-4xl mx-auto">
                {/* Heading */}
                <h1 className="text-2xl font-bold mb-6">
                    Create Industry
                </h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded shadow space-y-5"
                >
                    {/* S.No */}
                    <div>
                        <label className="block mb-1 font-medium">S.No</label>
                        <input
                            type="number"
                            name="s_no"
                            value={data.s_no}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                        {errors.s_no && (
                            <p className="text-red-500 text-sm">
                                {errors.s_no}
                            </p>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Points */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Points
                        </label>

                        {data.points.map((p, index) => (
                            <div
                                key={index}
                                className="flex gap-2 mb-2 items-center"
                            >
                                <input
                                    type="text"
                                    value={p}
                                    onChange={(e) =>
                                        handlePointChange(index, e.target.value)
                                    }
                                    className="w-full border rounded p-2"
                                    placeholder={`Point ${index + 1}`}
                                />

                                {data.points.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removePoint(index)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addPoint}
                            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                        >
                            + Add Point
                        </button>

                        {errors.points && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.points}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
