import { createContext, useContext, useEffect, useState } from "react";

import { apiRequest, getToken } from "../api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("guestCartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const isLoggedIn = Boolean(user && getToken());

  const saveGuestCart = (items) => {
    localStorage.setItem("guestCartItems", JSON.stringify(items));
  };

  const loadCart = async () => {
    if (!isLoggedIn) {
      const savedCart = localStorage.getItem("guestCartItems");
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
      return;
    }

    const guestCart = JSON.parse(localStorage.getItem("guestCartItems") || "[]");

    if (guestCart.length > 0) {
      for (const item of guestCart) {
        await apiRequest("/cart", {
          method: "POST",
          body: JSON.stringify({ perfumeId: item.id, quantity: item.quantity || 1 }),
        });
      }
      localStorage.removeItem("guestCartItems");
    }

    const data = await apiRequest("/cart");
    setCartItems(data);
  };

  useEffect(() => {
    loadCart().catch(() => setCartItems([]));
  }, [user]);

  const addToCart = async (perfume) => {
    if (isLoggedIn) {
      const data = await apiRequest("/cart", {
        method: "POST",
        body: JSON.stringify({ perfumeId: perfume.id, quantity: 1 }),
      });
      setCartItems(data);
      return;
    }

    setCartItems((items) => {
      const existingItem = items.find((item) => String(item.id) === String(perfume.id));
      const updatedItems = existingItem
        ? items.map((item) =>
            String(item.id) === String(perfume.id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...items, { ...perfume, quantity: 1 }];

      saveGuestCart(updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = async (id, quantity) => {
    if (isLoggedIn) {
      const data = await apiRequest(`/cart/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      });
      setCartItems(data);
      return;
    }

    setCartItems((items) => {
      const updatedItems = items
        .map((item) => (String(item.id) === String(id) ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
      saveGuestCart(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = async (id) => {
    if (isLoggedIn) {
      const data = await apiRequest(`/cart/${id}`, { method: "DELETE" });
      setCartItems(data);
      return;
    }

    setCartItems((items) => {
      const updatedItems = items.filter((item) => String(item.id) !== String(id));
      saveGuestCart(updatedItems);
      return updatedItems;
    });
  };

  const increaseQuantity = (id) => {
    const item = cartItems.find((cartItem) => String(cartItem.id) === String(id));
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((cartItem) => String(cartItem.id) === String(id));
    if (item) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const clearCart = async () => {
    if (isLoggedIn) {
      await apiRequest("/cart", { method: "DELETE" });
    } else {
      localStorage.removeItem("guestCartItems");
    }

    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
