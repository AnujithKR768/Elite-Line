import React from "react";
import { Link } from "@inertiajs/react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0b2545] text-white pt-10 pb-6">

      {/* Main Footer */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Brand */}
        <div>
          <h3 className="font-bold text-lg mb-3">ELITE LINE</h3>
          <p className="text-sm opacity-80 max-w-sm mx-auto md:mx-0">
            Smart access, premium performance. Defining industrial excellence
            in Dubai and across the UAE.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Details</h3>
          <div className="text-sm opacity-90 space-y-2">
            <p>Business Bay, Dubai, UAE</p>
            <p>+971 55 968 8007</p>
            <a
            href="mailto:Info@eliteautomaticdoors.com"
            className="text-white hover:underline"
            >
            Info@eliteautomaticdoors.com
            </a>
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Our Solutions</h3>
          <div className="text-sm opacity-90 space-y-1">
            <p>Residential Doors</p>
            <p>Industrial Doors</p>
            <p>Automatic Gates</p>
            <p>Loading Bay Systems</p>
          </div>
        </div>

      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mt-8">
        <a href="https://www.facebook.com/share/1BUAcs9Qwq/"
        className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition">
          <FaFacebookF size={14} />
        </a>



        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-500 transition">
          <FaLinkedinIn size={14} />
        </a>



        <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition">
          <FaYoutube size={14} />
        </a>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-xs opacity-70 px-6">
        © {new Date().getFullYear()} Elite Line Automatic Doors Trading LLC.
      </div>

    </footer>
  );
}
