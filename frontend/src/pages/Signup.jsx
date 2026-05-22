import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGift, FaHeart, FaUserPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await signup(formData);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <Navbar />

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[430px_1fr] lg:px-6">
        <section className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <FaUserPlus className="text-2xl text-rose-700" />
            <h2 className="mt-3 text-3xl font-black">Create Account</h2>
            <p className="mt-1 text-slate-600">Start saving perfumes and placing orders.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700">Name</label>
              <input
                type="text"
                name="username"
                placeholder="Your name"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <button
              disabled={submitting}
              className="w-full rounded-md bg-amber-300 px-5 py-4 font-black text-slate-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-black text-rose-700 hover:text-rose-800">
              Login
            </Link>
          </p>
        </section>

        <section className="rounded-lg bg-slate-950 p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-300">
            Member benefits
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight md:text-5xl">
            Build your personal fragrance shelf with a faster shopping experience.
          </h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white/10 p-5">
              <FaHeart className="text-2xl text-amber-300" />
              <p className="mt-3 font-black">Wishlist Favorites</p>
              <p className="mt-2 text-sm text-slate-300">Save the scents you want to revisit.</p>
            </div>
            <div className="rounded-lg bg-white/10 p-5">
              <FaGift className="text-2xl text-amber-300" />
              <p className="mt-3 font-black">Premium Offers</p>
              <p className="mt-2 text-sm text-slate-300">Keep your cart and order history ready.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Signup;
