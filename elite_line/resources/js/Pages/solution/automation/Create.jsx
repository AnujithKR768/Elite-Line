import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        points: [""],
        footer: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // Handle points change
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

        post("/automation/store", {
            onSuccess: () => {
                Swal.fire({
                    title: "Success",
                    text: "Automation created successfully!",
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
                    Create Automation System
                </h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded shadow space-y-5"
                >
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
                            <p className="text-red-500 text-sm">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            rows="4"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Points */}
                    <div>
                        <label className="block mb-2 font-medium">Points</label>

                        {data.points.map((point, index) => (
                            <div
                                key={index}
                                className="flex gap-2 mb-2 items-center"
                            >
                                <input
                                    type="text"
                                    value={point}
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

                    {/* Footer */}
                    <div>
                        <label className="block mb-1 font-medium">Footer</label>
                        <textarea
                            name="footer"
                            value={data.footer}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                            rows="3"
                        />
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
