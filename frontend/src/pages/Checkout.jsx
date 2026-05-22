import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCreditCard, FaMapMarkerAlt, FaMoneyBillWave, FaMobileAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    paymentMethod: "Cash on Delivery",
  });
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const handleChange = (event) => {
    setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
  };

  const handleOrder = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setSubmitting(true);

    try {
      await addOrder({
        customer: formData,
        deliveryDate,
      });
      await clearCart();
      toast.success("Order placed successfully");
      navigate("/success");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-black">Checkout</h1>
          <p className="mt-1 text-slate-600">Add delivery details and confirm your fragrance order.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-black">No items to checkout</h2>
            <Link to="/" className="mt-4 inline-block font-bold text-rose-700">
              Shop perfumes
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <form onSubmit={handleOrder} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <FaMapMarkerAlt className="text-rose-700" />
                <h2 className="text-xl font-black">Delivery Address</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input name="fullname" placeholder="Full name" value={formData.fullname} onChange={handleChange} required className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
                <input name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} required pattern="[0-9]{10}" className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
                <input name="address" placeholder="House no., building, street" value={formData.address} onChange={handleChange} required className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400 md:col-span-2" />
                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
                <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required pattern="[0-9]{6}" className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400" />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-black">Payment Method</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    ["Cash on Delivery", FaMoneyBillWave],
                    ["UPI", FaMobileAlt],
                    ["Credit / Debit Card", FaCreditCard],
                  ].map(([method, Icon]) => (
                    <label
                      key={method}
                      className={`cursor-pointer rounded-md border p-4 ${
                        formData.paymentMethod === method
                          ? "border-amber-400 bg-amber-50"
                          : "border-slate-300 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <Icon className="mb-3 text-xl text-rose-700" />
                      <span className="text-sm font-black">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                disabled={submitting}
                className="mt-8 w-full rounded-md bg-amber-300 px-5 py-4 font-black text-slate-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Placing order..." : "Place Order"}
              </button>
            </form>

            <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">Order Summary</h2>
              <p className="mt-1 text-sm text-green-700">Expected delivery by {deliveryDate}</p>

              <div className="mt-5 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b border-slate-200 pb-4">
                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover" />
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-black">{item.name}</h3>
                      <p className="text-sm text-slate-600">Qty {item.quantity}</p>
                      <p className="mt-1 font-bold">{formatPrice(Number(item.price) * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

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
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
