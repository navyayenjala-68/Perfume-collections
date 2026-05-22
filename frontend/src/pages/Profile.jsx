import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaMapMarkerAlt, FaShoppingBag, FaUserCircle } from "react-icons/fa";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { WishlistContext } from "../context/WishlistContext";

function Profile() {
  const { cartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const { wishlistItems } = useContext(WishlistContext);

  const stats = [
    ["Cart Items", cartCount, FaShoppingBag],
    ["Wishlist", wishlistItems.length, FaHeart],
    ["Orders", orders.length, FaMapMarkerAlt],
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-6xl text-slate-400" />
              <div>
                <h1 className="text-3xl font-black">{user?.username || "PerfumeLux Customer"}</h1>
                <p className="mt-1 text-slate-600">{user?.email}</p>
                <p className="mt-1 text-sm font-bold text-green-700">Prime fragrance member</p>
              </div>
            </div>
            <Link to="/orders" className="rounded-md bg-amber-300 px-5 py-3 text-center font-black text-slate-950 hover:bg-amber-400">
              View Orders
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map(([label, value, Icon]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="text-2xl text-rose-700" />
              <p className="mt-4 text-3xl font-black">{value}</p>
              <p className="text-sm font-bold text-slate-600">{label}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">Saved Address</h2>
            <p className="mt-3 text-slate-600">
              Add an address during checkout and it will be attached to your order history.
            </p>
            <div className="mt-4 rounded-md bg-slate-50 p-4 text-sm">
              C-24, Fragrance Avenue, Bengaluru, Karnataka 560001
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">Account Benefits</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p>Authenticity checked perfume collection</p>
              <p>Wishlist and cart saved on this browser</p>
              <p>Fast checkout with order history</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
