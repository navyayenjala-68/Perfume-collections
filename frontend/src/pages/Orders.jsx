import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaCheckCircle, FaTruck } from "react-icons/fa";

import Navbar from "../components/Navbar";
import { OrderContext } from "../context/OrderContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));

function Orders() {
  const { orders } = useContext(OrderContext);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-black">Your Orders</h1>
            <p className="mt-1 text-slate-600">Track recent purchases and reorder your favorites.</p>
          </div>
          <Link to="/" className="font-bold text-rose-700 hover:text-rose-800">
            Continue shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
            <FaBoxOpen className="mx-auto text-4xl text-slate-400" />
            <h2 className="mt-4 text-2xl font-black">No orders yet</h2>
            <p className="mt-2 text-slate-600">Your confirmed perfume orders will appear here.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {[...orders].reverse().map((order) => (
              <article key={order.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 md:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-black">Order #{order.id}</h2>
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-700">
                        <FaCheckCircle />
                        {order.status || "Confirmed"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{order.date}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Paid by {order.customer?.paymentMethod}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-slate-600">Order total</p>
                    <p className="text-2xl font-black">{formatPrice(order.total)}</p>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-green-700">
                      <FaTruck />
                      Delivery by {order.deliveryDate || "soon"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {order.items.map((item) => (
                    <div key={item.perfume || item.name} className="flex gap-4 rounded-md bg-slate-50 p-3">
                      <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover" />
                      <div>
                        <h3 className="font-black">{item.name}</h3>
                        <p className="text-sm text-slate-600">{item.brand}</p>
                        <p className="mt-2 text-sm font-bold">
                          {formatPrice(item.price)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Orders;
