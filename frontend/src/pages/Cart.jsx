import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black">Shopping Cart</h1>
            <p className="mt-1 text-slate-600">Review your selected perfumes before checkout.</p>
          </div>
          <Link to="/" className="font-bold text-rose-700 hover:text-rose-800">
            Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-black">Your cart is empty</h2>
            <p className="mt-2 text-slate-600">Add a perfume from the collection to begin.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[130px_1fr_auto]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full rounded-md object-cover md:h-32"
                  />

                  <div>
                    <p className="text-sm font-bold uppercase text-slate-500">{item.brand}</p>
                    <h2 className="mt-1 text-xl font-black">{item.name}</h2>
                    <p className="mt-2 text-sm text-slate-600">
                      {item.size} | {item.concentration}
                    </p>
                    <p className="mt-3 text-xl font-black">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-end md:justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="grid h-10 w-10 place-items-center rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100"
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>

                    <div className="flex items-center rounded-md border border-slate-300">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="grid h-10 w-10 place-items-center hover:bg-slate-100"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="grid h-10 w-12 place-items-center border-x border-slate-300 font-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="grid h-10 w-10 place-items-center hover:bg-slate-100"
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">Price Details</h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Delivery</span>
                  <span className="font-bold">Free</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-black">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <button className="mt-6 w-full rounded-md bg-amber-300 px-5 py-4 font-black text-slate-950 hover:bg-amber-400">
                  Proceed to Checkout
                </button>
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
