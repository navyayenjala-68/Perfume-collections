import { Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaHome,
} from "react-icons/fa";

function AdminSidebar() {

  return (
    <div className="w-72 bg-zinc-950 border-r border-zinc-800 min-h-screen p-8">

      {/* Logo */}
      <div className="mb-16">

        <h1 className="text-4xl font-bold text-yellow-400">

          LuxeScents

        </h1>

        <p className="text-zinc-500 mt-2">
          Admin Panel
        </p>

      </div>

      {/* Navigation */}
      <div className="space-y-5">

        <Link
          to="/admin"
          className="flex items-center gap-4 bg-yellow-400 text-black px-5 py-4 rounded-2xl font-bold"
        >

          <FaTachometerAlt />

          Dashboard

        </Link>

        <Link
          to="/home"
          className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 transition duration-300 px-5 py-4 rounded-2xl"
        >

          <FaHome />

          Home

        </Link>

        <Link
          to="/cart"
          className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 transition duration-300 px-5 py-4 rounded-2xl"
        >

          <FaBoxOpen />

          Orders

        </Link>

      </div>

    </div>
  );
}

export default AdminSidebar;