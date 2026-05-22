import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

import Navbar from "../components/Navbar";

function Success() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto grid max-w-3xl place-items-center px-4 py-16">
        <section className="w-full rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <FaCheckCircle className="mx-auto text-6xl text-green-700" />
          <h1 className="mt-5 text-4xl font-black">Order placed successfully</h1>
          <p className="mt-3 text-slate-600">
            Thank you for shopping with PerfumeLux. Your order has been saved in order history.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link to="/orders" className="rounded-md bg-amber-300 px-5 py-4 font-black text-slate-950 hover:bg-amber-400">
              View Orders
            </Link>
            <Link to="/" className="rounded-md border border-slate-300 px-5 py-4 font-black hover:bg-slate-50">
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Success;
