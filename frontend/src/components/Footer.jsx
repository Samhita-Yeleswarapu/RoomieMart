import React from "react";

function Footer() {
  return (
    <footer className="mt-20 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">

      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Left Section */}
          <div className="md:w-1/2">

            <h2 className="text-2xl font-bold text-[#06153A] mb-4">
              RoomieMart
            </h2>

            <p className="text-gray-600 leading-8">
              RoomieMart is a trusted student marketplace
              designed for campus communities. Buy, sell,
              rent, exchange and discover products safely
              within your college network.
            </p>

          </div>

          {/* Right Section */}
          <div className="md:w-1/3 md:text-right">

            <h3 className="text-xl font-semibold text-[#06153A] mb-4">
              Contact & Support
            </h3>

            <div className="space-y-3 text-gray-600">

              <p>support@roomiemart.com</p>

              <p>Campus Marketplace Platform</p>

            </div>


          </div>

        </div>

        {/* Bottom Strip */}

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-500">
            © 2026 RoomieMart. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500 mt-3 md:mt-0">

            <span className="hover:text-blue-700 cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-blue-700 cursor-pointer transition">
              Terms of Service
            </span>

            <span className="hover:text-blue-700 cursor-pointer transition">
              Help Center
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;