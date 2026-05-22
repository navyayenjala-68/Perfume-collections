import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { PerfumeContext } from "../context/PerfumeContext";
import { WishlistContext } from "../context/WishlistContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));

function PerfumeDetails() {
  const { id } = useParams();
  const { perfumes } = useContext(PerfumeContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const perfume = perfumes.find((item) => String(item.id) === String(id));

  if (!perfume) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-950">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h1 className="text-3xl font-black">Perfume not found</h1>
          <Link to="/" className="mt-4 inline-block font-bold text-rose-700">
            Back to collection
          </Link>
        </main>
      </div>
    );
  }

  const discount = Math.round(((perfume.mrp - perfume.price) / perfume.mrp) * 100);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-5 text-sm text-slate-600">
          <Link to="/" className="font-bold text-rose-700">Home</Link> / {perfume.name}
        </div>

        <section className="grid gap-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="overflow-hidden rounded-lg bg-slate-100">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="h-full max-h-[620px] min-h-96 w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
              {perfume.brand}
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight md:text-5xl">
              {perfume.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded bg-green-700 px-2 py-1 text-sm font-bold text-white">
                {perfume.rating} <FaStar className="text-xs" />
              </span>
              <span className="text-sm text-slate-600">{perfume.reviews} verified reviews</span>
              <span className="rounded bg-rose-50 px-2 py-1 text-sm font-bold text-rose-700">
                {perfume.tag}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-4xl font-black">{formatPrice(perfume.price)}</span>
              <span className="text-lg text-slate-400 line-through">
                {formatPrice(perfume.mrp)}
              </span>
              <span className="text-lg font-bold text-green-700">{discount}% off</span>
            </div>

            <p className="mt-2 text-sm font-bold text-green-700">
              Inclusive of all taxes. Free delivery available.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700">
              {perfume.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-slate-100 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Size</p>
                <p className="mt-1 font-black">{perfume.size}</p>
              </div>
              <div className="rounded-md bg-slate-100 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Type</p>
                <p className="mt-1 font-black">{perfume.concentration}</p>
              </div>
              <div className="rounded-md bg-slate-100 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">For</p>
                <p className="mt-1 font-black">{perfume.category}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-black">Fragrance Notes</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {perfume.notes?.map((note) => (
                  <span key={note} className="rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-slate-800">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  addToCart(perfume);
                  toast.success("Added to cart");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-300 px-6 py-4 font-black text-slate-950 hover:bg-amber-400"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToWishlist(perfume);
                  toast.success("Added to wishlist");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-rose-600 px-6 py-4 font-black text-rose-700 hover:bg-rose-50"
              >
                <FaHeart />
                Add to Wishlist
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PerfumeDetails;
