import { createContext, useContext, useEffect, useState } from "react";

import { apiRequest, getToken } from "../api";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("guestWishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const isLoggedIn = Boolean(user && getToken());

  const saveGuestWishlist = (items) => {
    localStorage.setItem("guestWishlistItems", JSON.stringify(items));
  };

  const loadWishlist = async () => {
    if (!isLoggedIn) {
      const savedWishlist = localStorage.getItem("guestWishlistItems");
      setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
      return;
    }

    const guestWishlist = JSON.parse(localStorage.getItem("guestWishlistItems") || "[]");

    if (guestWishlist.length > 0) {
      for (const item of guestWishlist) {
        await apiRequest("/wishlist", {
          method: "POST",
          body: JSON.stringify({ perfumeId: item.id }),
        });
      }
      localStorage.removeItem("guestWishlistItems");
    }

    const data = await apiRequest("/wishlist");
    setWishlistItems(data);
  };

  useEffect(() => {
    loadWishlist().catch(() => setWishlistItems([]));
  }, [user]);

  const addToWishlist = async (perfume) => {
    if (isLoggedIn) {
      const data = await apiRequest("/wishlist", {
        method: "POST",
        body: JSON.stringify({ perfumeId: perfume.id }),
      });
      setWishlistItems(data);
      return;
    }

    setWishlistItems((items) => {
      const exists = items.some((item) => String(item.id) === String(perfume.id));
      const updatedItems = exists ? items : [...items, perfume];
      saveGuestWishlist(updatedItems);
      return updatedItems;
    });
  };

  const removeFromWishlist = async (id) => {
    if (isLoggedIn) {
      const data = await apiRequest(`/wishlist/${id}`, { method: "DELETE" });
      setWishlistItems(data);
      return;
    }

    setWishlistItems((items) => {
      const updatedItems = items.filter((item) => String(item.id) !== String(id));
      saveGuestWishlist(updatedItems);
      return updatedItems;
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
