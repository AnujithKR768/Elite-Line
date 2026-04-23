import React from "react";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Quote() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    service_type: "",
    product_type: "",
    project_details: "",
    urgency: "",
  });

  const submit = (e) => {
    e.preventDefault();

    // 🔄 Loading Alert
    Swal.fire({
      title: "Submitting...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    post("/quote-request/store", {
      onSuccess: () => {
        Swal.close();

        reset();

        Swal.fire({
          icon: "success",
          title: "Quote Request Sent!",
          text: "Our team will contact you within 24 hours.",
          confirmButtonColor: "#000",
        });
      },

      onError: () => {
        Swal.close();

        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Please check your inputs and try again.",
          confirmButtonColor: "#000",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        {/* Header */}
        <h1 className="text-3xl font-semibold mb-2">
          Request a Consultation / Quote
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Tell us about your project — our engineering team will provide a tailored solution.
        </p>

        {/* Form */}
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name *</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            />
            {errors.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name}</div>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block mb-1 text-sm font-medium">Company Name</label>
            <input
              type="text"
              value={data.company}
              onChange={(e) => setData("company", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            />
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm font-medium">Phone *</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => setData("phone", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            />
            {errors.phone && (
              <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 text-sm font-medium">Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData("location", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block mb-1 text-sm font-medium">Service</label>
            <select
              value={data.service_type}
              onChange={(e) => setData("service_type", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            >
              <option value="">Select Service</option>
              <option value="installation">Installation</option>
              <option value="upgrade">Upgrade</option>
              <option value="maintenance">Maintenance</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          {/* Product */}
          <div>
            <label className="block mb-1 text-sm font-medium">Product</label>
            <select
              value={data.product_type}
              onChange={(e) => setData("product_type", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            >
              <option value="">Select Product</option>
              <option value="sectional">Sectional Doors</option>
              <option value="roller">Roller Shutters</option>
              <option value="pvc">PVC High-Speed Doors</option>
              <option value="cold">Cold Storage Doors</option>
              <option value="dock">Dock Levelers</option>
            </select>
          </div>

          {/* Urgency */}
          <div>
            <label className="block mb-1 text-sm font-medium">Urgency</label>
            <select
              value={data.urgency}
              onChange={(e) => setData("urgency", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            >
              <option value="">Select Timeline</option>
              <option value="immediate">Immediate</option>
              <option value="1-3weeks">1–3 Weeks</option>
              <option value="1-2months">1–2 Months</option>
            </select>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">
              Project Details *
            </label>
            <textarea
              rows="4"
              value={data.project_details}
              onChange={(e) =>
                setData("project_details", e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 focus:ring-black outline-none"
            ></textarea>
            {errors.project_details && (
              <div className="text-red-500 text-xs mt-1">
                {errors.project_details}
              </div>
            )}
          </div>

          {/* Submit + Cancel */}
            <div className="md:col-span-2 mt-6 flex items-center justify-center gap-4">

            {/* Cancel Button */}
            <button
                type="button"
                onClick={() => window.location.href = "/"}
                className="px-8 py-3
                text-sm font-medium
                border border-gray-300
                rounded-lg
                text-gray-700
                hover:bg-gray-100
                transition"
            >
                Cancel
            </button>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 text-white
                px-10 py-3
                text-sm font-semibold
                rounded-lg
                hover:bg-blue-600
                transition duration-200
                disabled:opacity-50"
            >
                {processing ? "Submitting..." : "Request Quote"}
            </button>

            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
            Our team will contact you within 24 hours
            </p>
        </form>
      </div>
    </div>
  );
}
