import React from "react";
import { usePage } from "@inertiajs/react";

const Brand = () => {
  const { brands } = usePage().props;

  return (
    <div className="overflow-hidden bg-gray-400 py-6">
        <h1
        className="text-2xl font-bold text-center mb-6 text-orange-600"
        >
        Our Brands
        </h1>
      <div className="flex w-max animate-scroll">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={index}
            className="flex flex-col items-center mx-10 min-w-[120px]"
          >
            <img
              src={`/storage/${brand.logo}`}
              alt={brand.title}
              className="w-20 h-auto object-contain"
            />
            <p className="mt-2 text-sm font-medium">{brand.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;
