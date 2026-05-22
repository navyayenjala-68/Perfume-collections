import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));

function PerfumeCard({ perfume }) {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems } = useContext(WishlistContext);

  const discount = Math.round(((perfume.mrp - perfume.price) / perfume.mrp) * 100);
  const isWishlisted = wishlistItems.some((item) => item.id === perfume.id);

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/perfume/${perfume.id}`} className="relative block bg-slate-100">
        <img
          src={perfume.image}
          alt={perfume.name}
          className="h-60 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded bg-rose-600 px-2 py-1 text-xs font-bold text-white">
          {perfume.tag}
        </span>
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {perfume.brand}
          </p>
          <Link
            to={`/perfume/${perfume.id}`}
            className="mt-1 line-clamp-2 min-h-12 text-base font-bold text-slate-950 hover:text-rose-700"
          >
            {perfume.name}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-green-700 px-2 py-1 text-xs font-bold text-white">
            {perfume.rating} <FaStar className="text-[10px]" />
          </span>
          <span className="text-xs text-slate-500">({perfume.reviews} reviews)</span>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <span className="text-2xl font-black text-slate-950">
            {formatPrice(perfume.price)}
          </span>
          <span className="text-sm text-slate-400 line-through">
            {formatPrice(perfume.mrp)}
          </span>
          <span className="text-sm font-bold text-green-700">{discount}% off</span>
        </div>

        <p className="text-sm text-slate-600">
          {perfume.size} | {perfume.concentration} | {perfume.category}
        </p>

        <div className="grid grid-cols-[1fr_44px] gap-2 pt-1">
          <button
            onClick={() => {
              addToCart(perfume);
              toast.success("Added to cart");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-300 px-4 py-3 text-sm font-black text-slate-950 hover:bg-amber-400"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
          <button
            onClick={() => {
              addToWishlist(perfume);
              toast.success(isWishlisted ? "Already in wishlist" : "Added to wishlist");
            }}
            className={`grid place-items-center rounded-md border text-sm ${
              isWishlisted
                ? "border-rose-600 bg-rose-50 text-rose-600"
                : "border-slate-300 text-slate-700 hover:border-rose-500 hover:text-rose-600"
            }`}
            aria-label="Add to wishlist"
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </article>
  );
}

export default PerfumeCard;
