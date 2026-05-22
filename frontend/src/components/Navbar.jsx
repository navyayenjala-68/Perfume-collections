import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";

function Navbar({ searchTerm = "", onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive ? "text-amber-300" : "text-white hover:text-amber-300"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navClass} onClick={() => setMenuOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/recommendation" className={navClass} onClick={() => setMenuOpen(false)}>
        AI Picks
      </NavLink>
      <NavLink to="/orders" className={navClass} onClick={() => setMenuOpen(false)}>
        Orders
      </NavLink>
      <NavLink to="/admin" className={navClass} onClick={() => setMenuOpen(false)}>
        Admin
      </NavLink>
      <NavLink to="/wishlist" className={navClass} onClick={() => setMenuOpen(false)}>
        <span className="inline-flex items-center gap-2">
          <FaHeart />
          Wishlist ({wishlistItems.length})
        </span>
      </NavLink>
      <NavLink to="/cart" className={navClass} onClick={() => setMenuOpen(false)}>
        <span className="inline-flex items-center gap-2">
          <FaShoppingCart />
          Cart ({cartCount})
        </span>
      </NavLink>
      <NavLink to="/profile" className={navClass} onClick={() => setMenuOpen(false)}>
        <span className="inline-flex items-center gap-2">
          <FaUserCircle />
          {user ? "Profile" : "Guest"}
        </span>
      </NavLink>
      {user ? (
        <button
          onClick={() => {
            logout();
            setMenuOpen(false);
          }}
          className="text-left text-sm font-semibold text-white transition hover:text-amber-300"
        >
          Logout
        </button>
      ) : (
        <NavLink to="/login" className={navClass} onClick={() => setMenuOpen(false)}>
          Login
        </NavLink>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-slate-950 text-white shadow-lg shadow-black/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-amber-300 font-black text-slate-950">
              PL
            </div>
            <div>
              <p className="text-xl font-black leading-5">PerfumeLux</p>
              <p className="text-xs text-slate-300">premium fragrance store</p>
            </div>
          </Link>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-md bg-white/10 lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="flex min-w-0 flex-1 items-center rounded-md bg-white text-slate-950 ring-2 ring-transparent focus-within:ring-amber-300">
          <input
            value={searchTerm}
            onChange={(event) => onSearch?.(event.target.value)}
            placeholder="Search perfumes, brands, notes..."
            className="min-w-0 flex-1 rounded-l-md px-4 py-3 text-sm outline-none"
          />
          <button className="grid h-12 w-14 place-items-center rounded-r-md bg-amber-300 text-slate-950">
            <FaSearch />
          </button>
        </div>

        <nav className="hidden flex-wrap items-center gap-5 lg:flex">{links}</nav>

        {menuOpen && (
          <nav className="grid gap-4 border-t border-white/10 pt-4 lg:hidden">
            {links}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
