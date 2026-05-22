import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaShoppingBag, FaTruck, FaUserShield } from "react-icons/fa";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await login(email, password);
      toast.success("Login successful");
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

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1fr_430px] lg:px-6">
        <section className="rounded-lg bg-slate-950 p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-300">
            PerfumeLux account
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight md:text-5xl">
            Sign in to track orders, save wishlist picks, and checkout faster.
          </h1>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Saved Cart", FaShoppingBag],
              ["Order Tracking", FaTruck],
              ["Secure Access", FaUserShield],
            ].map(([label, Icon]) => (
              <div key={label} className="rounded-lg bg-white/10 p-4">
                <Icon className="text-2xl text-amber-300" />
                <p className="mt-3 font-black">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <FaLock className="text-2xl text-rose-700" />
            <h2 className="mt-3 text-3xl font-black">Login</h2>
            <p className="mt-1 text-slate-600">Use the account you created on this browser.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-amber-400"
              />
            </div>

            <button
              disabled={submitting}
              className="w-full rounded-md bg-amber-300 px-5 py-4 font-black text-slate-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            New to PerfumeLux?{" "}
            <Link to="/signup" className="font-black text-rose-700 hover:text-rose-800">
              Create an account
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;
