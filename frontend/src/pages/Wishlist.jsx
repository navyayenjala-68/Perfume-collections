import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import Navbar from "../components/Navbar";
import PerfumeCard from "../components/PerfumeCard";
import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black">Your Wishlist</h1>
            <p className="mt-1 text-slate-600">
              Save fragrances you love and move them to cart anytime.
            </p>
          </div>
          <Link to="/" className="font-bold text-rose-700 hover:text-rose-800">
            Continue shopping
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-black">No saved perfumes yet</h2>
            <p className="mt-2 text-slate-600">Tap the heart icon on any product to save it here.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((perfume) => (
              <div key={perfume.id} className="relative">
                <PerfumeCard perfume={perfume} />
                <button
                  onClick={() => removeFromWishlist(perfume.id)}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md bg-white text-rose-600 shadow hover:bg-rose-50"
                  aria-label="Remove from wishlist"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Wishlist;
